"use strict";
import Phaser, {State, Sprite} from "phaser";
import Config from "../config/data";
import FloorFactory from "../objects/Floor/FloorFactory";
import FloorCameraUtils from "../objects/Floor/FloorCameraUtils";
import MaterialFactory from "../objects/Material/MaterialFactory";
import PhaserManager from "system/phaser/utils/PhaserManager";
import StartInfoModal from "../modals/StartInfoModal";
import Part2tInfoModal from "../modals/Part2InfoModal";
import EndInfoModal from "../modals/EndInfoModal";
import {DefaultManager, Stack} from "system/phaser/Modal";
import QuestManager, {DomQuestList} from "system/phaser/utils/Quest";
import DangerProtectQuest from "../quests/DangerProtectQuest";
import TremisProtectQuest from "../quests/TremisProtectQuest";
import PeintureProtectQuest from "../quests/PeintureProtectQuest";
import BaieOuverteProtectQuest from "../quests/BaieOuverteProtectQuest";
import SoubassementProtectQuest from "../quests/SoubassementProtectQuest";
import TrouProtectQuest from "../quests/TrouProtectQuest";

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
        this.game.stage.backgroundColor = '#81BAA5'; //green background

        this.initUI();
        this.addFloors();
        this.addMaterials();
        this.game.world.setBounds(0, 0, this.game.floorGroup.width, this.game.floorGroup.height);

        const ground = new Sprite(this.game, 0, 0, 'atlas', 'jeu2/background/sol');
        this.game.layer.zDepth0.add(ground);
        ground.scale.set(this.game.SCALE);
        ground.y = this.game.floorGroup.height - ground.height;


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

    /** Called by create to add floors */
    addFloors() {
        this.game.floorGroup = new FloorFactory(this.game, Config.entities.floors);
        this.game.layer.zDepth1.add(this.game.floorGroup);
    }

    addMaterials() {
        const width = this.game.world.width;
        const height = this.game.uiScale(77);
        const bmd = this.game.add.bitmapData(width, height);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = '#ffffff';
        bmd.ctx.fill();
        const drawnObject = this.game.add.sprite(0, 0, bmd);
        drawnObject.fixedToCamera = true;
        drawnObject.cameraOffset.setTo(
            0, this.game.canvas.height - height
        );
        drawnObject.alpha = 0.5;
        this.game.layer.zDepth1.add(drawnObject);

        this.game.materialStack = new Stack(
            this.game.uiScale(90), this.game.world.height, this.game,
            {axe: Stack.HORIZONTAL, direction: Stack.RIGHT, offsetX: 30, offsetY: 10, anchorY: 1}
        );
        this.game.materialGroup = new MaterialFactory(this.game, Config.entities.materials);
    }

    /** Called by Phaser to render */
    render() {
        //if(Config.developer.debug) {
        this.game.time.advancedTiming = true; //SEE FPS
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        // }
        // this.game.debug.spriteInfo(window.a_sprite, 32, 32);
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
        this.process.quests.add(new DangerProtectQuest(this.process.game));
        this.process.questsCleaned.addOnce(this.onQuestsCleaned, this);
        this.process.game.materialGroup.forEach((material) => {

            //enable panneau_danger.
            if (Config.developer.debug) {
                material.active = true;
            } else if (material.type === "panneau_danger") {
                material.active = true;
            }
        });
    }

    onQuestsCleaned() {
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
        this.part2tInfoModal = new Part2tInfoModal({}, DefaultManager, this.process.game);
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

        this.process.quests.add(new TrouProtectQuest(this.process.game));
        this.process.quests.add(new SoubassementProtectQuest(this.process.game));
        this.process.quests.add(new BaieOuverteProtectQuest(this.process.game));
        this.process.quests.add(new TremisProtectQuest(this.process.game));
        this.process.quests.add(new PeintureProtectQuest(this.process.game));
        this.process.questsCleaned.addOnce(this.onQuestsCleaned, this);
        this.process.game.materialGroup.forEach((material) => {

            //disable panneau_danger and enable others.
            material.active = !(material.type === "panneau_danger");

            //Change stats on drop.
            material.onDropped.add((container) => {
                if (!container.tested) {
                    container.tested = true;
                    if (container.name == "peinture" && material.type != "panneau_peinture_fraiche") {
                        PhaserManager.get('gabator').stats.changeValues({
                            organization: PhaserManager.get('gabator').stats.state.organization - 1,
                            enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1
                        });
                    }
                    if (container.name == "tremie" && material.type != "garde_corps_tremie") {
                        PhaserManager.get('gabator').stats.changeValues({
                            organization: PhaserManager.get('gabator').stats.state.organization - 1,
                            health: PhaserManager.get('gabator').stats.state.health - 1
                        });
                    }
                    if (container.name == "baie_ouverte" && material.type != "protection_baie_ouverte") {
                        PhaserManager.get('gabator').stats.changeValues({
                            organization: PhaserManager.get('gabator').stats.state.organization - 1,
                            enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1
                        });
                    }
                    if (container.name == "soubassement" && material.type != "passerelle_garde_corps") {
                        PhaserManager.get('gabator').stats.changeValues({
                            organization: PhaserManager.get('gabator').stats.state.organization - 1
                        });
                    }
                    if (container.name == "trou" && material.type != "barriere_de_protection") {
                        PhaserManager.get('gabator').stats.changeValues({
                            organization: PhaserManager.get('gabator').stats.state.organization - 1,
                            health: PhaserManager.get('gabator').stats.state.health - 1
                        });
                    }
                }
            }, this);
        });
    }

    onQuestsCleaned() {
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
    }

    _initParts() {
        //When ready, lets init parts.
        this.partOne.finish.addOnce(this.partTwo.startMenu, this.partTwo);
        this.partTwo.finish.addOnce(this._onFinish, this);
        this.partOne.onReady();
    }

    init() {
        const floorCameraUtils = new FloorCameraUtils(this.game, this.game.floorGroup);
        floorCameraUtils.moveToLast(this._onAnimationEnd).onComplete.addOnce(this._onAnimationEnd, this);
    }

    _onAnimationEnd() {
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

        const current = PhaserManager.get('gabator').stats.state.health +
            PhaserManager.get('gabator').stats.state.organization +
            PhaserManager.get('gabator').stats.state.enterprise;

        //On affiche la modale de fin
        const endInfoModal = new EndInfoModal({}, DefaultManager, this.game, {
            healthMax: PhaserManager.get('gabator').stats.healthMax,
            organizationMax: PhaserManager.get('gabator').stats.organizationMax,
            enterpriseMax: PhaserManager.get('gabator').stats.enterpriseMax
        });
        endInfoModal.onExit.addOnce(() => window.parent.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);
        endInfoModal.toggle(true, {}, {
            star1: current > 2,
            star2: current > 6,
            star3: current === 10
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