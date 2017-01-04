"use strict";
import {State, Physics, Easing} from 'phaser';
import Config from '../config/data';
import MyMath from 'system/utils/Math';
import TilemapLayer from 'system/phaser/TilemapLayer';
import Character from '../objects/Character/Character';
import MaterialFactory from '../objects/Material/MaterialFactory';
import ToolFactory from '../objects/Tool/ToolFactory';
import VehicleFactory from '../objects/Vehicle/VehicleFactory';
import CanvasCollection from 'system/phaser/utils/CanvasCollection';
import Position from 'system/phaser/utils/Position';

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
        this.game.baseWidth = (Config.tilesmap.tiles.width * Config.tilesmap.tiles.size);
        this.game.baseHeight = (Config.tilesmap.tiles.height * Config.tilesmap.tiles.size);
        let sWidth = this.game.width / this.game.baseWidth;
        let sHeight = this.game.height / this.game.baseHeight;

        this.game.SCALE = ( this.game.baseHeight * sWidth > this.game.height ) ? sWidth : sHeight;
        this.game.modalScale = (n) => MyMath.scale(this.game.SCALE * 0.9, n);
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

    /** Called by create to add vehicles */
    addVehicles() {
        this.game.vehicleGroup = new VehicleFactory(this.game, this.layers[1], Config.entities.vehicles);
        this.game.vehicleGroup.forEach((item) => {
            item.obj.vehicleMountedEvent.add(this, "follow");
            item.obj.vehicleUnmountedEvent.add(this, "follow");
        });
        this.game.world.add(this.game.vehicleGroup);
    }

    /** Called by create to add player */
    addPlayer() {
        this.player = new Character(this.game, this.layers[1], Config.entities.player.x, Config.entities.player.y);
    }

    /** Called by create to add tools */
    addTools() {
        this.game.toolGroup = new ToolFactory(this.game, this.layers[1], Config.entities.tools);
        this.game.vehicleGroup.forEach((vehicle) => {
            this.game.toolGroup.forEach((tool) => {
                vehicle.obj.vehicleStartedEvent.add(tool.obj, "onVehicleStart");
                vehicle.obj.vehicleStopedEvent.add(tool.obj, "onVehicleStop");
            });
        });
    }

    /** Called by create to add materials */
    addMaterials() {
        this.game.materialGroup = new MaterialFactory(this.game, this.layers[1], Config.entities.materials);
        this.game.vehicleGroup.forEach((vehicle) => {
            this.game.materialGroup.forEach((material) => {
                vehicle.obj.vehicleStartedEvent.add(material.obj, "onVehicleStart");
                vehicle.obj.vehicleStopedEvent.add(material.obj, "onVehicleStop");
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
        this.game.camera.y = this.game.camera.height;
        let t1 = this.game.add.tween(this.game.camera).to( { y: this.player.sprite.y - this.game.canvas.height / 2 }, 1500, Easing.Quadratic.InOut, false, 800);
        t1.start().onComplete.add(() => {
            this.follow(this.player);
            if(CanvasCollection.getCanvas('gabator').state.current == "play")
                CanvasCollection.getCanvas('gabator').state.getCurrentState().awakeGabator();
        });

        //Si le dépot est plein, alors le jeu est gagné.
        this.game.toolGroup.forEach((tool) => { if(tool.key === 'depot')
             tool.obj.toolIsFullEvent.add(this, "depotIsFullEvent")
        });
        this.depotIsFullEvent = () => { this.game.state.start('win') }
    }
};