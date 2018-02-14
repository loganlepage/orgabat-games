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

import SituationFactory from "../objects/Situation/SituationFactory";
import Button from "../objects/Button/Button";
import PrincipesModal from "../objects/Modal/PrincipesModal";

import ProtectionQuest from "../quests/ProtectionQuest";

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

class Engine {

    finish = new Phaser.Signal();
    situations;

    constructor(gameProcess) {
        this.game = gameProcess.game;

        // Quest
        gameProcess.quests.add(new ProtectionQuest(this.game));

        // Title
        this.title = this.game.add.text(
            this.game.world.centerX, 
            75 * this.game.SCALE,
            Config.title, 
            {
                font: 'Arial', 
                fontSize: 25 * this.game.SCALE, 
                fill: '#000000', 
                align: "center",
                wordWrap: true,
                wordWrapWidth: this.game.world.width - 50 * this.game.SCALE
            }
        );
        this.title.anchor.setTo(0.5);
        this.game.layer.zDepth0.addChild(this.title);

        // Situation group
        this.situations = new SituationFactory(this.game, Config.situations);

        // Button
        this.button = new Button(this.game, this.game.world.centerX, this.game.world.height - 100*this.game.SCALE, "principes");
        this.game.layer.zDepth0.addChild(this.button.sprite);

        // Principes modal
        this.principesModal = new PrincipesModal(this.game, Config.principes.title, Config.principes);
        this.button.sprite.events.onInputDown.add(function(){
            this.button.disableControls();
            this.situations.forEach((item) => {
                item.obj.disableControls();
            });
            this.principesModal.show();
            this.principesModal.onClosed.add(function(){
                this.button.enableControls();
                this.situations.forEach((item) => {
                    item.obj.enableControls();
                });
            }, this);
        }, this);
    }

    start() {
        let totalcount = this.situations.children.length;
        this.situations.forEach((item) => {
            item.events.onInputDown.add(function(){
                this.situations.forEach((item2) => {
                    item2.obj.disableControls();
                });
                item.obj.displayQuestion();
                item.obj.questionModal.onClosed.add(function(){
                    let validatedCount = 0;
                    this.situations.forEach((item3) => {
                        if (item3.obj.validated) {
                            validatedCount++;
                            if (validatedCount >= totalcount) {
                                this.finish.dispatch();
                            }
                        }
                        item3.obj.enableControls();
                    });
                }, this);
            }, this);
        });
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

        // Classes à utiliser
        this.engine = new Engine(this);
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
            // Canvas.get('gabator').modal.showHelp(
            //     "..."
            // );
        }

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onStartInfoClose, this);

        this._initParts();

        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.game.controlsEnabled = true;

        this._timeStart = this.game.time.now;
    }

    _initParts() {
        //When ready, lets init parts.
        this.engine.finish.addOnce(this._onFinish, this);
        this.engine.start();
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

        // Étoiles:
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