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
        this.game.stage.backgroundColor = '#DADAD5';

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
        // this.addButton(); // To go to the end
    }

    addCards() {
        this.game.graphics = this.game.add.graphics(0, 0);
        this.cardsGroup = new CardFactory(this.game, Config.cards);
        this.hideCards();
    }

    disableControls() {
        this.cardsGroup.forEach((card) => {
            if (!card.clicked) {
                card.sprite.inputEnabled = false;
                card.sprite.input.useHandCursor = false;
            }
        });
    }

    hideCards() {
        let count = 0;
        this.matching = [];
        this.cardsGroup.forEach((card) => {
            card.turnBack();
            card.dezoom();
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
                        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.matchCards, this);
                        this.game.time.events.add(Phaser.Timer.SECOND * 0, this.disableControls, this);
                    }
                }, this);
            }
        });
    }

    matchCards() {
        // this.disableControls();
        if (this.matching[0].key == this.matching[1].key){
            this.displayCard(this.matching);
            // this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
            //     this.displayCard(matching);
            // }, this); // display with a delay
        } else {
            this.matching.forEach((card) => {
                card.clicked = false;
            });
            this.hideCards();
            PhaserManager.get('gabator').stats.changeValues({
                health: PhaserManager.get('gabator').stats.state.health - 1,
            });
            // this.game.time.events.add(Phaser.Timer.SECOND * 2, this.hideCards, this); // hide cards with a delay
        }
        this.matching = [];
        this.hideCards();
    }

    displayCard() {
        this.totalValidatedCards++;
        if (this.totalValidatedCards >= 10) {
            this.addButton();
        }

        this.matching.forEach((card) => {
            card.validate();
        });

        /* let key = this.matching[0].key; // display big card and click to hide

        let width = this.game.width;
        let height = this.game.height;

        // let cardsWidth = 254;
        // let cardsHeight = 377; // scale(1)

        let cardsWidth = 386;
        let cardsHeight = 572; // scale(1.1)

        let bigWidthMargin = (width - cardsWidth) / 2;
        let bigHeightMargin = (height - cardsHeight) / 2;

        this.bigCard = new BigCard(this.game, bigWidthMargin, bigHeightMargin, key, this);
        this.bigCard.addImage();
        this.bigCard.sprite.inputEnabled = true;
        this.bigCard.sprite.input.useHandCursor = true;
        this.bigCard.sprite.events.onInputDown.add(this.destroyBigCard, this);*/
        // this.game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyBigCard, this); // hide with a delay
    }

    /*destroyBigCard() { // hide big card, called by displayCard
        this.bigCard.destroy();
        this.hideCards();
    }*/

    addButton() {
        this.button = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.button.sprite.events.onInputDown.add(this.onClickAction, this);
        this.gameProcess.quests._quests.memory_quest.done();
    }

    onClickAction() {
        this.onQuestCleaned();
    }

    onQuestCleaned() {
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
        endInfoModal.onExit.addOnce(() => window.closeGameModal(), this);
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