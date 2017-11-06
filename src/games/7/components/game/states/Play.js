/** State when we start the game */
"use strict";
import Phaser, {State, Easing} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager, Stack} from 'system/phaser/Modal';

import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';
import Config from "../config/data";

import MemoryQuest from "../quests/MemoryQuest";
import CardFactory from "../objects/Card/CardFactory";
import BigCard from "../objects/Card/BigCard";
import Button from "../objects/Button/Button";

export default class Play extends State {

    /** Constructor for a new play state */
    constructor() {
        super();
    }

    /**
     * Called when the state must be created
     * init all the game (scale, physics, gameobjects...)
     */

     create() {
        this.game.controlsEnabled = false;
        this.game.stage.backgroundColor = '#a3bada';

        this.tileSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, "atlas");
        this.tileSprite.tileScale.set(0.5);
        this.initUI();
        PhaserManager.ready('game', 'play');

        this.start();
    }

    /** Called by create to add UI Layers */
    initUI() {
        this.game.layer = {
            zDepth0: this.add.group(),
            zDepth1: this.add.group(),
            zDepth2: this.add.group(),
            zDepth3: this.add.group(),
            zDepthOverAll: this.add.group()
        };
    }

    /** Called by Phaser to render */
    render() {
        /*if(Config.developer.debug) {
            this.game.time.advancedTiming = true; //SEE FPS
            this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        }*/
    }

    /**
     * Called after create, to start the state
     * this.game Rules
     */
     start() {
        this.game.gameProcess = new GameProcess(this);
        this.game.gameProcess.init();
    }

};

class MemoryPart {

    finish = new Phaser.Signal();

    validatedCards = 0;

    constructor(gameProcess) {
        this.game = gameProcess.game;
        this.gameProcess = gameProcess;
    }

    start() {
        this.gameProcess.quests.add(new MemoryQuest(this.gameProcess.game));
        this.gameProcess.questsCleaned.addOnce(this.onQuestCleaned, this);
        this.addCards();
        this.totalValidatedCards = 0;
        // this.addButton(); // Shortcut
    }

    addCards() {
        this.game.graphics = this.game.add.graphics(0, 0);
        this.cardsGroup = new CardFactory(this.game, Config.cards);
        this.hideCards();
        this.cardZoomed = false;
        this.cardsGroup.forEach((card) => {
            card.zoomSignal.add(function(){
                this.disableAllControls();
                this.cardZoomed = true;
            }, this);
            card.dezoomSignal.add(function(){
                this.enableAllControls();
                this.cardZoomed = false;
            }, this);
        }, this);
    }

    disableControls() {
        this.cardsGroup.forEach((card) => {
            if (!card.clicked) {
                card.sprite.inputEnabled = false;
                card.sprite.input.useHandCursor = false;
            }
        });
    }

    disableAllControls() {
        this.cardsGroup.forEach((card) => {
            card.sprite.inputEnabled = false;
            card.sprite.input.useHandCursor = false;
        });
    }

    enableAllControls() {
        let count = 0;
        this.cardsGroup.forEach((card) => {
            card.sprite.inputEnabled = true;
            card.sprite.input.useHandCursor = true;
            if (!card.validated) {
                card.sprite.events.onInputDown.add(function(){
                    card.click();
                    card.clicked = true;
                    this.matching.push(card);
                    count++;
                    if (count>=2) {
                        count=0;
                        this.matchCards();
                    }
                }, this);
            }
        });
    }

    hideCards() {
        let count = 0;
        this.matching = [];
        this.cardsGroup.forEach((card) => {
            card.turnBack();
            // card.dezoom();
            if (!this.cardZoomed) {
                if (!card.validated) {
                    card.sprite.inputEnabled = true;
                    card.sprite.input.useHandCursor = true;
                    card.sprite.events.onInputDown.add(function(){
                        card.click();
                        card.clicked = true;
                        this.matching.push(card);
                        count++;
                        if (count>=2) {
                            count=0;
                            this.matchCards();
                        }
                    }, this);
                }
            }
        });
    }

    matchCards() {
        this.disableControls();
        if (this.matching[0].key == this.matching[1].key){
            // Keep cards displayed
            this.displayCard(this.matching);
            let card = this.matching[0];
            card.zoom();
            this.cardZoomed = true;
            // Initialize game
            this.hideCards();
            // Force zoom
        } else {
            // Wait 2s before hide cards
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                this.matching.forEach((card) => {
                    card.clicked = false;
                });
                PhaserManager.get('gabator').stats.changeValues({
                    health: PhaserManager.get('gabator').stats.state.health - 1,
                });
                this.hideCards();
            }, this); // wait
        }
    }

    displayCard() {
        this.totalValidatedCards++;
        if (this.totalValidatedCards >= 10) {
            // Finish
            this.addButton();
        }
        // Add validated cards to global counter
        this.matching.forEach((card) => {
            card.validate();
        });
    }

    addButton() {
        // Finish event
        this.disableAllControls();
        this.button = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.button.sprite.events.onInputDown.add(this.onQuestCleaned, this);
        this.gameProcess.quests._quests.memory_quest.done();
    }

    onQuestCleaned() {
        // Finish game
        this.finish.dispatch();
    }

}

class GameProcess {

    questsCleaned = new Phaser.Signal();

    constructor(playState) {
        this.play = playState;
        this.game = playState.game;
        this.game.camera.y = this.game.camera.height;

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new DomQuestList(this.quests);

        this.memoryPart = new MemoryPart(this);
    }

    init() {
        //On affiche la modale d'information du début
        this.startInfoModal = new StartInfoModal({}, DefaultManager, this.game);
        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(this._onStartInfoClose, this);
        this.startInfoModal.items.close.items.iconA.events.onInputDown.add(this._onStartInfoClose, this);
        this.startInfoModal.items.close.items.textA.events.onInputDown.add(this._onStartInfoClose, this);
        this.startInfoModal.onDeleted.addOnce(() => {
            delete this.startInfoModal
        }, this);
        this.startInfoModal.toggle(true);
    }

    _onStartInfoClose() {
        //On active Gabator
        if (PhaserManager.get('gabator').state.current == "play") {
            PhaserManager.get('gabator').state.getCurrentState().start();
            Canvas.get('gabator').modal.showHelp(
                "Cliquer 1 fois sur la carte pour la retourner, une 2ème fois pour zoomer, et cliquer sur le zoom pour le faire disparaitre"
                );
        }

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onStartInfoClose, this);

        this._initParts();

        //Evenements de progression du jeu ici (voir jeu 1 ou jeu 2)

        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.game.controlsEnabled = true;

        this._timeStart = this.game.time.now;
    }

    _initParts() {
        //When ready, lets init parts.
        this.memoryPart.finish.addOnce(this._onFinish, this);
        this.memoryPart.start();
    }

    _onFinish() {
        this.game.controlsEnabled = false;
        this._timeEnd = this.game.time.now;

        //On affiche la modale de fin
        const endInfoModal = new EndInfoModal({}, DefaultManager, this.game, {
            healthMax: PhaserManager.get('gabator').stats.healthMax,
            organizationMax: PhaserManager.get('gabator').stats.organizationMax,
            enterpriseMax: PhaserManager.get('gabator').stats.enterpriseMax
        });
        endInfoModal.onExit.addOnce(() => window.parent.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);
        let healthLevel = PhaserManager.get('gabator').stats.state.health;
        let healthLevelMax = PhaserManager.get('gabator').stats.healthMax;
        endInfoModal.toggle(true, {}, {
            star1: healthLevel >= healthLevelMax / 2 ? true : false,
            star2: healthLevel >= (2 * healthLevelMax) / 3 ? true : false,
            star3: healthLevel == healthLevelMax ? true : false
        }, {
            health: PhaserManager.get('gabator').stats.state.health,
            organization: PhaserManager.get('gabator').stats.state.organization,
            enterprise: PhaserManager.get('gabator').stats.state.enterprise,
        });

        //Et on envoie le score à l'API
        window.api.sendScore({
            exerciseId: game_id,
            time: Math.round((this._timeEnd - this._timeStart) / 1000),
            health: PhaserManager.get('gabator').stats.state.health,
            organization: PhaserManager.get('gabator').stats.state.organization,
            business: PhaserManager.get('gabator').stats.state.enterprise
        }, () => {
        });
    }
}