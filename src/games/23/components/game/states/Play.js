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

import Step from "../objects/Step/Step";

import AnalyzeQuest from "../quests/AnalyzeQuest";
import MeasureQuest from "../quests/MeasureQuest";
import PreventionQuest from "../quests/PreventionQuest";
import RescueQuest from "../quests/RescueQuest";
import SafetyQuest from "../quests/SafetyQuest";

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
        this.game.stage.backgroundColor = '#FFFFFF';

        this.tileSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, "atlas");
        this.tileSprite.alpha = 0.5;
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

    constructor(gameProcess) {
        this.gameProcess = gameProcess;
        this.game = gameProcess.game;
        this.gameProcess.quests.add(new AnalyzeQuest(this.gameProcess.game));
        this.gameProcess.quests.add(new MeasureQuest(this.gameProcess.game));
        this.gameProcess.quests.add(new PreventionQuest(this.gameProcess.game));
        this.gameProcess.quests.add(new SafetyQuest(this.gameProcess.game));
        this.gameProcess.quests.add(new RescueQuest(this.gameProcess.game));

        this.stepNumber = 0;
    }

    start(){
        // Init
        let questList = this.gameProcess.quests._quests,
            step = null;
        // Create steps
        if (this.stepNumber < Config.steps.length) {
            step = new Step(this.gameProcess.game, Config.steps[this.stepNumber]);
            step.finish.addOnce(function(){
                // Validate quests
                for(let quest in questList){
                    if (questList[quest].key == step.stepData.quest) {
                        questList[quest].done();
                    }
                }
                this.start();
            }, this);
            this.stepNumber++;
            // step.start();
        } else {
            this.finish.dispatch();
        }
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

        // Parties à utiliser
        this.engine = new Engine(this);
    }

    init() {
        //On affiche la modale d'information du début
        // this.startInfoModal = new StartInfoModal({}, DefaultManager, this.game);
        // this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this._onStartInfoClose, this);
        // this.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(this._onStartInfoClose, this);
        // this.startInfoModal.items.close.items.iconA.events.onInputDown.add(this._onStartInfoClose, this);
        // this.startInfoModal.items.close.items.textA.events.onInputDown.add(this._onStartInfoClose, this);
        // this.startInfoModal.onDeleted.addOnce(() => {
        //     delete this.startInfoModal
        // }, this);
        // this.startInfoModal.toggle(true);
        this._onStartInfoClose()
    }

    _onStartInfoClose() {
        //On active Gabator
        if (PhaserManager.get('gabator').state.current == "play") {
            PhaserManager.get('gabator').state.getCurrentState().start();
        }

        // this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onStartInfoClose, this);
        // this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onStartInfoClose, this);

        this._initParts();

        //Evenements de progression du jeu ici (voir jeu 1 ou jeu 2)

        //Ferme la modale et active les controls
        // this.startInfoModal.toggle(false, {});
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

        //Display end modal
        const endInfoModal = new EndInfoModal({}, DefaultManager, this.game, {
            healthMax: PhaserManager.get('gabator').stats.healthMax,
            organizationMax: PhaserManager.get('gabator').stats.organizationMax,
            enterpriseMax: PhaserManager.get('gabator').stats.enterpriseMax
        });
        endInfoModal.onExit.addOnce(() => window.parent.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);

        // Stars:
        let healthLevel = PhaserManager.get('gabator').stats.state.health;
        let healthLevelMax = PhaserManager.get('gabator').stats.healthMax;

        endInfoModal.toggle(true, {}, {
            star1: true,
            star2: healthLevel >= healthLevelMax / 2 ? true : false,
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