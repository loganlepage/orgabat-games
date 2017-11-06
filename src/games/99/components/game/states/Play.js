"use strict";
import Phaser, {State, Signal} from "phaser";
import PhaserManager from "system/phaser/utils/PhaserManager";
import StartInfoModal from "../modals/StartInfoModal";
import EndInfoModal from "../modals/EndInfoModal";
import {DefaultManager, StackManager} from "system/phaser/Modal";
import QuestManager, {DomQuestList} from "system/phaser/utils/Quest";
import Config from "../config/data";
import GhostFactory from "../objects/Ghost/GhostFactory";

/** State when we start the game */
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

        this.initUI();
        this.addGhosts();
        PhaserManager.ready('game', 'play');

        this.start();
    }

    addGhosts() {
        this.game.ghostGroup = new GhostFactory(this.game, Config.ghosts);
    }

    /** Called by create to add UI Layers */
    initUI() {
        this.game.stage.backgroundColor = "#bdc3c7";
        this.game.layer = {
            zDepth0: this.add.group(),
            zDepth1: this.add.group(),
            zDepth2: this.add.group(),
            zDepth3: this.add.group(),
            zDepthOverAll: this.add.group()
        };
    }

    /** Called by Phaser to update */
    update() {
    }

    /** Called by Phaser to render */
    render() {
        //if(Config.developer.debug) {
        this.game.time.advancedTiming = true; //SEE FPS
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        // }
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

class GameProcess {
    constructor(playState) {
        this.play = playState;
        this.game = playState.game;
        this.game.custom_events = {};
        this.game.custom_events.dropAWaste = new Signal();
        this.game.camera.y = this.game.camera.height;

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new DomQuestList(this.quests);
    }

    init() {
        if (this.bootTweenTime > 0) this.bootTween.start().onComplete.add(() => this._onAnimationEnd());
        else this._onAnimationEnd();
    }

    _onAnimationEnd() {
        //On affiche la modale d'information du début
        const startInfoModal = new StartInfoModal({}, DefaultManager, this.game);
        const startTheGame = () => {
            startInfoModal.toggle(false);
            this._onStart();
        };

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(startTheGame, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(startTheGame, this);
        startInfoModal.items.close.items.iconA.events.onInputDown.add(startTheGame, this);
        startInfoModal.items.close.items.textA.events.onInputDown.add(startTheGame, this);
        startInfoModal.onDeleted.addOnce(() => {
            this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.removeAll(this);
            this.game.keys.addKey(Phaser.Keyboard.A).onDown.removeAll(this);
        }, this);
        startInfoModal.toggle(true);
    }

    _onStart() {
        //On active Gabator
        if (PhaserManager.get('gabator').state.current == "play")
            PhaserManager.get('gabator').state.getCurrentState().start();

        this.game.controlsEnabled = true;
        this._timeStart = this.game.time.now;
    }

    _onFinish() {
        this.game.controlsEnabled = false;
        this._timeEnd = this.game.time.now;

        //On affiche la modale de fin
        const current = PhaserManager.get('gabator').stats.health +
            PhaserManager.get('gabator').stats.organization +
            PhaserManager.get('gabator').stats.enterprise;

        //On affiche la modale de fin
        const endInfoModal = new EndInfoModal({}, DefaultManager, this.game, {
            healthMax: PhaserManager.get('gabator').stats.healthMax,
            organizationMax: PhaserManager.get('gabator').stats.organizationMax,
            enterpriseMax: PhaserManager.get('gabator').stats.enterpriseMax
        });
        endInfoModal.onExit.addOnce(() => window.parent.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);
        endInfoModal.toggle(true, {}, {
            star1: current >= 1,
            star2: current >= 2,
            star3: current === 3
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