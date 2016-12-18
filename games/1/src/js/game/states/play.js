"use strict";
var Game = Game || {};
Game.State = Game.State || {};

/**
 * State when we start the game
 * @type {{layers: Array, create: Game.State.playState.create, initMap: Game.State.playState.initMap, addVehicles: Game.State.playState.addVehicles, addPlayer: Game.State.playState.addPlayer, addTools: Game.State.playState.addTools, addMaterials: Game.State.playState.addMaterials, follow: Game.State.playState.follow, update: Game.State.playState.update, render: Game.State.playState.render, start: Game.State.playState.start}}
 */
Game.State.playState = {
    layers: [],

    /** Phaser constructor, init all the game (scale, physics, gameobjects...) */
    create: function() {
        this.game.baseWidth = (Game.Config.data.tilesmap.tiles.width * Game.Config.data.tilesmap.tiles.size);
        this.game.baseHeight = (Game.Config.data.tilesmap.tiles.height * Game.Config.data.tilesmap.tiles.size);
        let sWidth = this.game.width / this.game.baseWidth;
        let sHeight = this.game.height / this.game.baseHeight;

        Game.SCALE = ( this.game.baseHeight * sWidth > this.game.height ) ? sWidth : sHeight;
        Game.TileSize = Game.Config.data.tilesmap.tiles.size * Game.SCALE;
        Game.modals = new Game.Manager.ModalManager(this.game);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);

        Game.CollisionGroup = {
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
    },

    /** Called by create to init the map */
    initMap: function() {
        this.map = this.game.add.tilemap(Game.Config.data.tilesmap.name);
        for(let i in Game.Config.data.tilesmap.assets)
            this.map.addTilesetImage(Game.Config.data.tilesmap.assets[i].name);

        for(let i in Game.Config.data.tilesmap.calques) {
            let layer = new Game.System.TilemapLayer(this.game, this.map, Game.Config.data.tilesmap.calques[i]);
            this.layers.push(layer);
        }

        this.map.setCollisionBetween(0, 1000, true, this.layers[1]); //red collider
        this.layers[1].debug = Game.Config.data.developer.debug;
        let layerColliders = this.game.physics.p2.convertTilemap(this.map, this.layers[1]);
        for(let collider in layerColliders)
        {
            layerColliders[collider].setCollisionGroup(Game.CollisionGroup.layer);
            layerColliders[collider].collides(Game.CollisionGroup.player);
            layerColliders[collider].collides(Game.CollisionGroup.vehicle);
        }
    },

    /** Called by create to add vehicles */
    addVehicles: function() {
        Game.vehicleGroup = new Game.Group.VehicleGroup(this.game, this.layers[1], Game.Config.data.entities.vehicles);
        Game.vehicleGroup.forEach(function(item) {
            item.obj.vehicleMountedEvent.add(this, "follow");
            item.obj.vehicleUnmountedEvent.add(this, "follow");
        }.bind(this));
        this.game.world.add(Game.vehicleGroup);
    },

    /** Called by create to add player */
    addPlayer: function() {
        this.player = new Game.Object.CharacterObj(this.game, this.layers[1], Game.Config.data.entities.player.x, Game.Config.data.entities.player.y);
    },

    /** Called by create to add tools */
    addTools: function() {
        Game.toolGroup = new Game.Group.ToolGroup(this.game, this.layers[1], Game.Config.data.entities.tools);
        Game.vehicleGroup.forEach(function(vehicle) {
            Game.toolGroup.forEach(function(tool) {
                vehicle.obj.vehicleStartedEvent.add(tool.obj, "onVehicleStart");
                vehicle.obj.vehicleStopedEvent.add(tool.obj, "onVehicleStop");
            });
        });
    },

    /** Called by create to add materials */
    addMaterials: function() {
        Game.materialGroup = new Game.Group.MaterialGroup(this.game, this.layers[1], Game.Config.data.entities.materials);
        Game.vehicleGroup.forEach(function(vehicle) {
            Game.materialGroup.forEach(function(material) {
                vehicle.obj.vehicleStartedEvent.add(material.obj, "onVehicleStart");
                vehicle.obj.vehicleStopedEvent.add(material.obj, "onVehicleStop");
            });
        });
    },

    /** Called by a delegated event to follow an object */
    follow: function(object) {
        this.game.camera.follow(object.sprite);
    },

    /** Called by Phaser to update */
    update: function() {},

    /** Called by Phaser to render */
    render: function() {
        if(Game.Config.data.developer.debug) {
            this.game.time.advancedTiming = true; //SEE FPS
            this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        }
    },

    /**
     * Called after create, to start the state
     * Game Rules
     */
    start: function() {
        /*var fade = this.game.add.graphics(0, 0);
        fade.lineStyle(0).beginFill(0xFFFFFF, 1).drawRect(0, 0, this.game.camera.width, this.game.camera.height).endFill();
        fade.alpha = 0; fade.fixedToCamera = true;
        let t1 = this.game.add.tween(this.game.camera).to( { y: 500 }, 1500, Phaser.Easing.Quadratic.InOut, false, 500);
        let t2 = this.game.add.tween(fade).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, false, 500);
        let t3 = this.game.add.tween(fade).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 100);
        t1.chain(t2).start();
        t2.onComplete.add(() => {
            this.camera.y = 0;
            t3.start().onComplete.add(() => {
                this.follow(this.player);
            })
        });*/
        this.game.camera.y = this.game.camera.height;
        let t1 = this.game.add.tween(this.game.camera).to( { y: this.player.sprite.y - this.game.canvas.height / 2 }, 1500, Phaser.Easing.Quadratic.InOut, false, 800);
        t1.start().onComplete.add(() => {
            this.follow(this.player);
            if(Gabator.game.state.current == "play")
                Gabator.game.state.getCurrentState().awakeGabator();
        });

        //Si le dépot est plein, alors le jeu est gagné.
        Game.toolGroup.forEach((tool) => { if(tool.key === 'depot')
             tool.obj.toolIsFullEvent.add(this, "depotIsFullEvent")
        });
        this.depotIsFullEvent = () => { this.game.state.start('win') }
    }
};