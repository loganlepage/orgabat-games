/** State when we start the game */
"use strict";
import Phaser, {State, Easing} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import BasicGameSprite from "system/phaser/BasicGameSprite";

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager, Stack} from 'system/phaser/Modal';

import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';
import Config from "../config/data";

import SecurityQuest from "../quests/SecurityQuest";

import Background from "../objects/Background/Background";
import Image from "../objects/Image/Image";
import Question from "../objects/Question/Question";

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
        // this.game.stage.backgroundColor = '#DADAD5';
        this.game.stage.backgroundColor = '#ffffff';

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

    game;

    constructor(gameProcess) {

        this.gameProcess = gameProcess;

        // Quest
        this.gameProcess.quests.add(new SecurityQuest(this.gameProcess.game));

        // Background
        this.background = new Background(this.gameProcess.game, Config.background);
        this.background.finish.addOnce(this.addQuestion, this);
    }

    addQuestion() {
        // Remove controls on background and shapes
        this.background.destroy();

        // Question and answers
        this.question = new Question(this.gameProcess.game, Config.question);
        
        // Actions
        this.question.answer.forEach((answer) => {
            answer.events.onInputDown.add(function(){
                if (answer.correctAnswer) {
                    answer.addColor("#008000", 0);
                    this.gameProcess.quests._quests.security_quest.done();
                    this.finish.dispatch();
                    answer.events.onInputDown.removeAll();
                    answer.inputEnabled = false;
                    this.question.destroy();
                } else {
                    answer.addColor("#FF0000", 0);
                    answer.events.onInputDown.removeAll();
                    answer.inputEnabled = false;
                    Canvas.get('gabator').modal.showHelp(
                        "Mauvaise réponse"
                    );
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.state.health - 1,
                    });
                }
            },this);
        });

        // Image
        this.image = new Image(this.gameProcess.game, 30 * this.gameProcess.game.SCALE + this.question.title.height , Config.question);

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
        // this.engine.start();
        this.engine.finish.addOnce(this._onFinish, this);
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
            star1: healthLevel >= true,
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