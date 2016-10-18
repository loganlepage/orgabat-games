var Game = Game || {};
Game.State = Game.State || {};


/**
 * State when we start the game
 */
Game.State.playState = {
    layers: [],

    /**
     * Phaser constructor, init all the game (scale, physics, gameobjects...)
     */
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
        this.gameRules.init();
    },

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

    addVehicles: function() {
        Game.vehicleGroup = new Game.Group.VehicleGroup(game, this.layers[1], Game.Config.data.entities.vehicles);
        Game.vehicleGroup.forEach(function(item) {
            item.obj.vehicleMountedEvent.add(this, "follow");
            item.obj.vehicleUnmountedEvent.add(this, "follow");
        }.bind(this));
        this.game.world.add(Game.vehicleGroup);
    },
    addPlayer: function() {
        this.player = new Game.Object.CharacterObj(this.game, this.layers[1], Game.Config.data.entities.player.x, Game.Config.data.entities.player.y);
        this.game.camera.follow(this.player.sprite);
    },
    addTools: function() {
        Game.toolGroup = new Game.Group.ToolGroup(game, this.layers[1], Game.Config.data.entities.tools);
        Game.vehicleGroup.forEach(function(vehicle) {
            Game.toolGroup.forEach(function(tool) {
                vehicle.obj.vehicleStartedEvent.add(tool.obj, "onVehicleStart");
                vehicle.obj.vehicleStopedEvent.add(tool.obj, "onVehicleStop");
            });
        });
    },
    addMaterials: function() {
        Game.materialGroup = new Game.Group.MaterialGroup(game, this.layers[1], Game.Config.data.entities.materials);
        Game.vehicleGroup.forEach(function(vehicle) {
            Game.materialGroup.forEach(function(material) {
                vehicle.obj.vehicleStartedEvent.add(material.obj, "onVehicleStart");
                vehicle.obj.vehicleStopedEvent.add(material.obj, "onVehicleStop");
            });
        });
    },

    follow: function(object) {
        this.game.camera.follow(object.sprite);
    },

    update: function() {
        this.game.forceSingleUpdate = true;
    },
    render: function() {
        if(Game.Config.data.developer.debug) {
            this.game.time.advancedTiming = true; //SEE FPS
            this.game.debug.text(game.time.fps, 2, 14, "#00ff00");
        }
    },


    /*
     * Game Rules
     */
    gameRules: {
        depotIsFullEventCalled: false,
        init: function() {
            //Le but du jeu est de remplir le dépot avec les 9 charges du mortier
            //Si le dépot est plein, alors le jeu est gagné.
            Game.toolGroup.forEach(function(tool) {
                if(tool.key === 'depot') {
                    tool.obj.toolIsFullEvent.add(this, "depotIsFullEvent")
                }

            }.bind(this));
        },
        depotIsFullEvent: function() {
            if(this.depotIsFullEventCalled) return;
            game.state.start('win');
        }
    }
};