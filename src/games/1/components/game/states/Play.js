"use strict";
import Phaser, {State, Physics, Easing} from 'phaser';
import Config from '../config/data';
import TilemapLayer from 'system/phaser/TilemapLayer';
import Player from '../objects/Player/Player';
import MaterialFactory from '../objects/Material/MaterialFactory';
import ToolFactory from '../objects/Tool/ToolFactory';
import VehicleFactory from '../objects/Vehicle/VehicleFactory';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Position from 'system/phaser/utils/Position';
import Type from 'system/utils/Type';

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager} from 'system/phaser/Modal';

import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';
import VehicleMountQuest from '../quests/VehicleMountQuest';
import VehicleLoadQuest from '../quests/VehicleLoadQuest';
import DepotFillQuest from '../quests/DepotFillQuest';

import Elevator from '../objects/Vehicle/elevator/Elevator';

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
        this.game.TileSize = Config.tilemap.tiles.size * this.game.SCALE;
        Position.setTileSize(this.game.TileSize);

        this.game.physics.startSystem(Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);

        this.game.CollisionGroup = {
            layer:      this.game.physics.p2.createCollisionGroup(),
            vehicle:    this.game.physics.p2.createCollisionGroup(),
            tool:       this.game.physics.p2.createCollisionGroup(),
            material:   this.game.physics.p2.createCollisionGroup(),
            player:     this.game.physics.p2.createCollisionGroup(),
            disabled:   this.game.physics.p2.createCollisionGroup()
        };

        this.initMap();
        this.initUI();
        this.addVehicles();
        this.addTools();
        this.addMaterials();
        this.addPlayer();
        PhaserManager.ready('game', 'play');

        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.game.physics.p2.updateBoundsCollisionGroup();
        this.start();
    }

    /** Called by create to init the map */
    initMap() {
        this.map = this.game.add.tilemap(Config.tilemap.name);
        for(let i in Config.tilemap.assets)
            this.map.addTilesetImage(Config.tilemap.assets[i].name);

        for(let i in Config.tilemap.calques) {
            let layer = new TilemapLayer(this.game, this.map, Config.tilemap.calques[i]);
            layer.smoothed = false;
            this.layers.push(layer);
        }

        this.map.setCollision(28, true, this.layers[0]); //wall
        this.layers[0].debug = Config.developer.debug;
        const layerColliders = this.game.physics.p2.convertTilemap(this.map, this.layers[0]);
        for(let collider in layerColliders)
        {
            layerColliders[collider].setCollisionGroup(this.game.CollisionGroup.layer);
            layerColliders[collider].collides(this.game.CollisionGroup.player);
            layerColliders[collider].collides(this.game.CollisionGroup.vehicle);
        }
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

    /** Called by create to add vehicles */
    addVehicles() {
        this.game.vehicleGroup = new VehicleFactory(this.game, this.layers[1], Config.entities.vehicles);
        this.game.vehicleGroup.forEach((item) => {
            item.obj.onMounted.add(this.follow, this);
            item.obj.onUnmounted.add(this.follow, this);
        });
    }

    /** Called by create to add player */
    addPlayer() {
        this.player = new Player(this.game, this.layers[1], Config.entities.player.x, Config.entities.player.y);
    }

    /** Called by create to add tools */
    addTools() {
        this.game.toolGroup = new ToolFactory(this.game, this.layers[1], Config.entities.tools);
        this.game.vehicleGroup.forEach((vehicle) => {
            this.game.toolGroup.forEach((tool) => {
                vehicle.obj.onStarted.add(tool.obj.onVehicleStart, tool.obj);
                vehicle.obj.onStopped.add(tool.obj.onVehicleStop, tool.obj);
            });
        });
    }

    /** Called by create to add materials */
    addMaterials() {
        this.game.materialGroup = new MaterialFactory(this.game, this.layers[1], Config.entities.materials);
        this.game.vehicleGroup.forEach((vehicle) => {
            this.game.materialGroup.forEach((material) => {
                vehicle.obj.onStarted.add(material.obj.onVehicleStart, material.obj);
                vehicle.obj.onStopped.add(material.obj.onVehicleStop, material.obj);
            });
        });
    }

    /** Called by a delegated event to follow an object */
    follow(object) {
        this.game.camera.follow(object.sprite);
    }

    /** Called by Phaser to update */
    update() {}

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
        this.game.camera.y = this.game.camera.height;

        //Animation de la caméra
        //On ajuste sa durée par rapport au mouvement à effectuer (peut être égal à 0)
        this.bootTweenTime = (this.game.world.height - this.game.camera.height) * 4.5;
        this.bootTween = this.game.add.tween(this.game.camera).to({
            y: this.play.player.sprite.y - this.game.canvas.height * 0.5
        }, this.bootTweenTime , Easing.Quadratic.InOut, false, 600);

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new DomQuestList(this.quests);
        this.quests.add(new VehicleMountQuest(this.game));
        this.quests.add(new VehicleLoadQuest(this.game));
        this.quests.add(new DepotFillQuest(this.game));
    }
    init() {
        if(this.bootTweenTime > 0) this.bootTween.start().onComplete.add(() => this._onAnimationEnd());
        else this._onAnimationEnd();
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

        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.play.follow(this.play.player);
        this.game.controlsEnabled = true;

        //Si on rentre en collision
        this.collided = { wall: false, vehicle: false };
        this.game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onCollision.add(this._onCollide, this);
        });

        //Si on monte un élévator
        this.elevatorMounted = false;
        this.game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onMounted.add(this._onMount, this);
        });

        //Si on termine la partie
        this.quests.get('depot_fill').onDone.addOnce(this._onFinish, this);

        this._timeStart = this.game.time.now;
    }
    _onCollide(name){
        if(!Type.isExist(this.collided[name]) || this.collided[name]) return;
        this.collided[name] = true;
        PhaserManager.get('gabator').stats.changeValues({
            enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1,
            health: PhaserManager.get('gabator').stats.state.health - 1,
        });
    }
    _onMount(vehicle) {
        if(!Type.isInstanceOf(vehicle, Elevator) || this.elevatorMounted) return;
        this.elevatorMounted = true;
        PhaserManager.get('gabator').stats.changeValues({
            organization: PhaserManager.get('gabator').stats.state.organization - 1,
        });
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
        endInfoModal.toggle(true, {}, {
            star1: this.quests.get('vehicle_mount').isDone,
            star2: this.quests.get('vehicle_load').isDone,
            star3: this.quests.get('depot_fill').isDone
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