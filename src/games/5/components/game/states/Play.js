"use strict";
import Phaser, {State, Easing, Signal} from "phaser";
import PhaserManager from "system/phaser/utils/PhaserManager";
import StartInfoModal from "../modals/StartInfoModal";
import EndInfoModal from "../modals/EndInfoModal";
import Part2InfoModal from "../modals/Part2InfoModal";
import {DefaultManager, StackManager} from "system/phaser/Modal";
import QuestManager, {DomQuestList} from "system/phaser/utils/Quest";
import Config from "../config/data";
import QcmFactory from "../objects/Qcm/QcmFactory";
import QcmMultipleFactory from "../objects/QcmMultiple/QcmMultipleFactory";
import TerminerPart1Quest from "../quests/TerminerPart1Quest";
import TerminerPart2Quest from "../quests/TerminerPart2Quest";

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
        this.tileSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, "atlas");
        this.tileSprite.tileScale.set(this.game.SCALE * 0.8);
        this.initUI();
        this.addQcms();
        PhaserManager.ready('game', 'play');

        this.start();
    }

    addQcms() {
        this.game.qcmGroup1 = new QcmFactory(this.game, Config.questions_part_1);
        this.game.qcmGroup2 = new QcmMultipleFactory(this.game, Config.questions_part_2);
    }

    /** Called by create to add UI Layers */
    initUI() {
        this.game.stage.backgroundColor = "#dedede";
        this.game.layer = {
            zDepth0: this.add.group(),
            zDepth1: this.add.group(),
            zDepth2: this.add.group(),
            zDepth3: this.add.group(),
            zDepthOverAll: this.add.group()
        };
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

class PartOne {

    finish = new Phaser.Signal();

    constructor(gameProcess) {
        this.process = gameProcess;
    }

    onReady() {
        //On lance le QCM
        this.process.game.qcmGroup1.start();

        this.process.quests.add(new TerminerPart1Quest(this.process.game));
        this.process.quests.get('qcm_1_finished').onDone.addOnce(this._onQuestsCleaned, this);
        this.process.game.qcmGroup1.forEach((qcm) => {
            qcm.onFinished.addOnce((answer) => {
                if (Config.questions_part_1[qcm.properties.id].prop["good-answer"] !== answer) {
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.health - 1,
                    });
                }
            });
        });
    }

    _onQuestsCleaned() {
        this.finish.dispatch();
    }
}

class PartTwo {

    finish = new Phaser.Signal();

    constructor(gameProcess) {
        this.process = gameProcess;
    }

    startMenu() {
        //On affiche la modale d'information de la 2e partie
        this.part2tInfoModal = new Part2InfoModal({}, DefaultManager, this.process.game);
        this.process.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this._onReady, this);
        this.process.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(this._onReady, this);
        this.part2tInfoModal.items.close.items.iconA.events.onInputDown.add(this._onReady, this);
        this.part2tInfoModal.items.close.items.textA.events.onInputDown.add(this._onReady, this);
        this.part2tInfoModal.onDeleted.addOnce(() => {
            delete this.part2tInfoModal
        }, this);
        this.part2tInfoModal.toggle(true);
    }

    _onReady() {
        this.process.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onReady, this);
        this.process.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onReady, this);
        this.part2tInfoModal.toggle(false, {});

        //On lance le QCM
        this.process.game.qcmGroup2.start();

        this.process.quests.add(new TerminerPart2Quest(this.process.game));
        this.process.quests.get('qcm_2_finished').onDone.addOnce(this._onQuestsCleaned, this);
        this.process.game.qcmGroup2.forEach((qcm) => {
            qcm.onFinished.addOnce((answer) => {
                if (Config.questions_part_2[qcm.properties.id].prop["good-answer"] !== answer) {
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.health - 1,
                    });
                }
            });
        });
    }

    _onQuestsCleaned() {
        this.finish.dispatch();
    }
}

class GameProcess {

    questsCleaned = new Phaser.Signal();

    constructor(playState) {
        this.play = playState;
        this.game = playState.game;

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        this.quests.onNbQuestsDoneChange.add(this._onQuestChange, this);
        new DomQuestList(this.quests);

        this.partOne = new PartOne(this);
        this.partTwo = new PartTwo(this);

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new DomQuestList(this.quests);
    }

    _initParts() {
        //When ready, lets init parts.
        this.partOne.finish.addOnce(this.partTwo.startMenu, this.partTwo);
        this.partTwo.finish.addOnce(this._onFinish, this);
        this.partOne.onReady();
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
        if (PhaserManager.get('gabator').state.current === "play")
            PhaserManager.get('gabator').state.getCurrentState().start();

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onStartInfoClose, this);

        this._initParts();

        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.game.controlsEnabled = true;

        this._timeStart = this.game.time.now;
    }

    _onQuestChange() {
        if (this.quests.nbQuestsDone === 0) {
            this.questsCleaned.dispatch();
        }
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