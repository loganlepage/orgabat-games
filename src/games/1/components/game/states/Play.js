"use strict";
import {State, Physics, Easing} from 'phaser';
import Config from '../config/data';
import TilemapLayer from 'system/phaser/TilemapLayer';
import Player from '../objects/Player/Player';
import MaterialFactory from '../objects/Material/MaterialFactory';
import ToolFactory from '../objects/Tool/ToolFactory';
import VehicleFactory from '../objects/Vehicle/VehicleFactory';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Position from 'system/phaser/utils/Position';
import Keyboard from 'system/phaser/utils/Keyboard';

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager, StackManager, Stack} from 'system/phaser/Modal';
import Objective, {ObjectiveTitle} from "system/phaser/modals/Objective";
import {DoOnce} from "system/utils/Utils";

/** State when we start the game */
export default class Play extends State {

    /** Constructor for a new play state */
    constructor() {
        super();
        this.layers = [];
    }

    /**
     * Called when the state must be created
     * init all the game (scale, physics, gameobjects...)
     */
    create() {
        this.game.controlsEnabled = false;
        this.game.TileSize = Config.tilesmap.tiles.size * this.game.SCALE;
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
        this.initUILayers();
        this.addVehicles();
        this.addPlayer();
        this.addTools();
        this.addMaterials();

        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.game.physics.p2.updateBoundsCollisionGroup();
        this.start();
    }

    /** Called by create to init the map */
    initMap() {
        this.map = this.game.add.tilemap(Config.tilesmap.name);
        for(let i in Config.tilesmap.assets)
            this.map.addTilesetImage(Config.tilesmap.assets[i].name);

        for(let i in Config.tilesmap.calques) {
            let layer = new TilemapLayer(this.game, this.map, Config.tilesmap.calques[i]);
            this.layers.push(layer);
        }

        this.map.setCollisionBetween(0, 1000, true, this.layers[1]); //red collider
        this.layers[1].debug = Config.developer.debug;
        let layerColliders = this.game.physics.p2.convertTilemap(this.map, this.layers[1]);
        for(let collider in layerColliders)
        {
            layerColliders[collider].setCollisionGroup(this.game.CollisionGroup.layer);
            layerColliders[collider].collides(this.game.CollisionGroup.player);
            layerColliders[collider].collides(this.game.CollisionGroup.vehicle);
        }
    }

    /** Called by create to add UI Layers */
    initUILayers() {
        this.game.layer = {
            zDepth0: this.add.group(),
            zDepth1: this.add.group(),
            zDepth2: this.add.group(),
            zDepth3: this.add.group()
        };
    }

    /** Called by create to add vehicles */
    addVehicles() {
        this.game.vehicleGroup = new VehicleFactory(this.game, this.layers[1], Config.entities.vehicles);
        this.game.vehicleGroup.forEach((item) => {
            item.obj.mountedEvent.add(this, "follow");
            item.obj.unmountedEvent.add(this, "follow");
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
                vehicle.obj.startedEvent.add(tool.obj, "onVehicleStart");
                vehicle.obj.stoppedEvent.add(tool.obj, "onVehicleStop");
            });
        });
    }

    /** Called by create to add materials */
    addMaterials() {
        this.game.materialGroup = new MaterialFactory(this.game, this.layers[1], Config.entities.materials);
        this.game.vehicleGroup.forEach((vehicle) => {
            this.game.materialGroup.forEach((material) => {
                vehicle.obj.startedEvent.add(material.obj, "onVehicleStart");
                vehicle.obj.stoppedEvent.add(material.obj, "onVehicleStop");
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
        if(Config.developer.debug) {
            this.game.time.advancedTiming = true; //SEE FPS
            this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        }
    }

    /**
     * Called after create, to start the state
     * this.game Rules
     */
    start() {
        const gameProcess = new GameProcess(this);
        gameProcess.init();
    }
};

class GameProcess {
    constructor(playState) {
        this.p = playState;
        this.p.game.camera.y = this.p.game.camera.height;

        //Animation de la caméra
        //On ajuste sa durée par rapport au mouvement à effectuer (peut être égal à 0)
        this.bootTweenTime = (this.p.game.world.height - this.p.game.camera.height)*4.5;
        this.bootTween = this.p.game.add.tween(this.p.game.camera).to({
            y: this.p.player.sprite.y - this.p.game.canvas.height / 2
        }, this.bootTweenTime , Easing.Quadratic.InOut, false, 600);

        //On prépare la modale d'info
        this.startInfoModal = new StartInfoModal({}, DefaultManager, this.p.game);
        this.endInfoModal = new EndInfoModal({}, DefaultManager, this.p.game, {
            healthMax: PhaserManager.get('gabator').reactDom.healthMax,
            organizationMax: PhaserManager.get('gabator').reactDom.organizationMax,
            enterpriseMax: PhaserManager.get('gabator').reactDom.enterpriseMax
        });

        //On prépare les modales d'objectif
        this.goalStack = new Stack(
            this.p.game.canvas.width - 10, 30, this.p.game,
            {axe: Stack.VERTICAL, direction: Stack.BOTTOM, offsetX: 10, offsetY: 15, anchorX: 1, sort: Stack.ASC}
        );
        this.objectiveTitle = new ObjectiveTitle({}, StackManager, this.p.game);
        this.vehicleMounted = new Objective({items: {
            text: { text: "Monter un véhicule"}}
        }, StackManager, this.p.game);
        this.vehicleLoaded = new Objective({items: {
            text: { text: "Prendre du mortier"}}
        }, StackManager, this.p.game);
        this.depotFilled = new Objective({items: {
            text: { text: "Déposer 9 charges de mortier dans le dépot"}}
        }, StackManager, this.p.game);
    }
    init() {
        if(this.bootTweenTime > 0) this.bootTween.start().onComplete.add(() => this.onAnimationEnd());
        else this.onAnimationEnd();
    }
    onAnimationEnd() {
        //On active Gabator
        if(PhaserManager.get('gabator').state.current == "play")
            PhaserManager.get('gabator').state.getCurrentState().start();

        //On affiche la modale d'information du début
        this.startInfoModal.toggle(true, {
            width: this.startInfoModal.items.bg._frame.width,
            height: this.startInfoModal.items.bg._frame.height
        });
        this.p.game.input.keyboard.addKey(Keyboard.ENTER).onDown.addOnce(this.onStartInfoClose, this);
        this.startInfoModal.items.closeButton.events.onInputDown.add(this.onStartInfoClose, this);
    }
    onStartInfoClose() {
        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.p.follow(this.p.player);
        this.p.game.controlsEnabled = true;
        this.p.game.input.keyboard.removeKey(Keyboard.ENTER);
        this.onControlsEnabled();
    }
    onControlsEnabled() {
        //Le jeu est pleinement lancé, on ajoute des évènements sur les actions ici

        //On affiche les objectifs
        this.objectiveTitle.toggle(true, {stack: this.goalStack});
        this.vehicleMounted.toggle(true, {stack: this.goalStack});
        this.vehicleLoaded.toggle(true, {stack: this.goalStack});
        this.depotFilled.toggle(true, {stack: this.goalStack});

        //Si on monte un véhicule ou qu'on le charge
        this.isVehicleMounted = new DoOnce((name) => this.vehicleMounted.setFinish());
        this.isVehicleLoaded = new DoOnce((name) => name == 'mortier' ? this.vehicleLoaded.setFinish() : null);
        const changeValue = () => PhaserManager.get('gabator').reactDom.changeValues({
            enterprise: PhaserManager.get('gabator').reactDom.state.enterprise - 1,
            health: PhaserManager.get('gabator').reactDom.state.health - 1,
        });
        this.isVehicleCollideVehicle = new DoOnce(() => changeValue(), (name) => name == 'vehicle');
        this.isVehicleCollideWall = new DoOnce(() => changeValue(), (name) => name == 'wall');
        this.p.game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.startedEvent.add(this.isVehicleMounted, "call");
            vehicle.obj.loadedEvent.add(this.isVehicleLoaded, "call");
            vehicle.obj.collisionEvent.add(this.isVehicleCollideVehicle, "call");
            vehicle.obj.collisionEvent.add(this.isVehicleCollideWall, "call");
        });

        //Si on termine la partie
        this.isDepotFulled = new DoOnce((args) => this.onFinish());
        this.p.game.toolGroup.forEach((tool) => { if(tool.key === 'depot')
            tool.obj.isFullEvent.add(this.isDepotFulled, "call")
        });
    }
    onFinish() {
        this.p.game.controlsEnabled = false;
        this.depotFilled.setFinish();

        //On affiche la modale de fin
        this.endInfoModal.toggle(true, {
            width: this.endInfoModal.items.bg._frame.width,
            height: this.endInfoModal.items.bg._frame.height
        }, {
            star1: this.isVehicleMounted.done,
            star2: this.isVehicleLoaded.done,
            star3: this.isDepotFulled.done
        }, {
            health: PhaserManager.get('gabator').reactDom.state.health,
            organization: PhaserManager.get('gabator').reactDom.state.organization,
            enterprise: PhaserManager.get('gabator').reactDom.state.enterprise,
        });

        //Et on envoie le score à l'API
        api.sendScore({id: game_id, time: 10, health: 3, organization: 4, business: 2});
    }
}