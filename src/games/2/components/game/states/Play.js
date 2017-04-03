"use strict";
import Phaser, {State, Signal} from 'phaser';
import Config from '../config/data';
import FloorFactory from '../objects/Floor/FloorFactory';
import FloorCameraUtils from '../objects/Floor/FloorCameraUtils';
import MaterialFactory from '../objects/Material/MaterialFactory';
import PhaserManager from 'system/phaser/utils/PhaserManager';

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager} from 'system/phaser/Modal';

import QuestManager, {GuiQuestList} from 'system/phaser/utils/Quest';
import TremisProtectQuest from '../quests/TremisProtectQuest';
import PeintureProtectQuest from '../quests/PeintureProtectQuest';
import BaieOuverteProtectQuest from '../quests/BaieOuverteProtectQuest';

/** State when we start the game */
export default class Play extends State {

    layers = [];

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
        this.game.controlsSignal = new Signal();

        this.initUI();
        this.addFloors();
        this.addMaterials();
        this.game.world.setBounds(0, 0, this.game.floorGroup.width, this.game.floorGroup.height);
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
    }
    addMaterials() {
        this.game.materialGroup = new MaterialFactory(this.game, Config.entities.materials);
    }
    /** Called by a delegated event to follow an object */
    follow(object) {
        this.game.camera.follow(object.sprite);
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

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        this.quests.onNbQuestsDoneChange.add(this._onQuestChange, this);
        new GuiQuestList(this.game.canvas.width - 10, 30, this.quests, this.game);
        this.quests.add(new TremisProtectQuest(this.game));
        this.quests.add(new BaieOuverteProtectQuest(this.game));
        this.quests.add(new PeintureProtectQuest(this.game));
    }
    init() {
        let floorCameraUtils = new FloorCameraUtils(this.game, this.game.floorGroup);
        floorCameraUtils.moveToLast(this._onAnimationEnd).onComplete.addOnce(this._onAnimationEnd, this);
    }
    _onAnimationEnd() {
        //On affiche la modale d'information du début
        this.startInfoModal = new StartInfoModal({}, DefaultManager, this.game);
        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(this._onStartInfoClose, this);
        this.startInfoModal.items.close.items.iconA.events.onInputDown.add(this._onStartInfoClose, this);
        this.startInfoModal.items.close.items.textA.events.onInputDown.add(this._onStartInfoClose, this);
        this.startInfoModal.onDeleted.addOnce(()=>{delete this.startInfoModal}, this);
        this.startInfoModal.toggle(true);
    }
    _onStartInfoClose() {
        //On active Gabator
        if(PhaserManager.get('gabator').state.current == "play")
            PhaserManager.get('gabator').state.getCurrentState().start();

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onStartInfoClose, this);

        //Si on rentre en collision
       /* this.collided = { wall: false, vehicle: false };
        this.game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onCollision.add(this._onCollide, this);
        });

        //Si on monte un élévator
        this.elevatorMounted = false;
        this.game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onMounted.add(this._onMount, this);
        });*/

        this.game.materialGroup.forEach((material) => {
            material.onDropped.add((depot)=>{
                if(depot == "peinture" && material.type != "panneau_peinture_fraiche") {
                    PhaserManager.get('gabator').stats.changeValues({
                        organization: PhaserManager.get('gabator').stats.state.organization - 1,
                        enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1
                    });
                }
                if(depot == "tremie" && material.type != "garde_corps_tremie") {
                    PhaserManager.get('gabator').stats.changeValues({
                        organization: PhaserManager.get('gabator').stats.state.organization - 1,
                        health: PhaserManager.get('gabator').stats.state.health - 1
                    });
                }
                if(depot == "baie_ouverte" && material.type != "protection_baie_ouverte") {
                    PhaserManager.get('gabator').stats.changeValues({
                        organization: PhaserManager.get('gabator').stats.state.organization - 1,
                        enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1
                    });
                }
                if(depot == "soubassement" && material.type != "passerelle_garde_corps") {
                    PhaserManager.get('gabator').stats.changeValues({
                        organization: PhaserManager.get('gabator').stats.state.organization - 1
                    });
                }
                console.log(depot + ", " + material.type);
            }, this);
        });


        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.game.controlsEnabled = true;
        this.game.controlsSignal.dispatch();

        this._timeStart = this.game.time.now;
    }
    _onQuestChange() {
        if(this.quests.nbQuestsDone == 0) this._onFinish();
    }
    _onFinish() {
        this.game.controlsEnabled = false;
        this.game.controlsSignal.dispatch();
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
        endInfoModal.onExit.addOnce(() => window.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);
        endInfoModal.toggle(true, {}, {
            star1: current > 2,
            star2: current > 6,
            star3: current == 10
        }, {
            health: PhaserManager.get('gabator').stats.state.health,
            organization: PhaserManager.get('gabator').stats.state.organization,
            enterprise: PhaserManager.get('gabator').stats.state.enterprise,
        });

        //Et on envoie le score à l'API
        window.api.sendScore({
            exerciseId: game_id,
            time: Math.round((this._timeEnd - this._timeStart)/1000),
            health: PhaserManager.get('gabator').stats.state.health,
            organization: PhaserManager.get('gabator').stats.state.organization,
            business: PhaserManager.get('gabator').stats.state.enterprise
        }, ()=>{});
    }
}