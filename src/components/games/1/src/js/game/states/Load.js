"use strict";
var Game = Game || {};
Game.State = Game.State || {};

/**
 * State to load the game (image, tilemap, spritesheet...)
 * @type {Load}
 */
Game.State.Load = class Load extends Phaser.State {

    /** Called before create */
    preload() {
        //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.game.stage.backgroundColor = '#FFFFFF';
        this.showLoadingText();
        this.loadAssets();
    }

    /** Called by preload to show loading text */
    showLoadingText(){
        let loadingText = "Chargement...";
        let text = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2, loadingText);
        text.anchor.set(0.5);
        text.align = 'center';

        //  Our font + size
        text.font = 'Arial';
        text.fontSize = 70;
        text.fill = '#272727';
    }

    /** Called by preload to load assets */
    loadAssets(){
        this.game.load.tilemap('map', game_path + '/assets/tilemaps/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
        for(let i in Game.Config.data.entities.assets)
            this.game.load.image(Game.Config.data.entities.assets[i].name, game_path +
                '/assets/sprites/' + Game.Config.data.entities.assets[i].file);
        for(let i in Game.Config.data.tilesmap.assets)
            this.game.load.image(Game.Config.data.tilesmap.assets[i].name, game_path +
                '/assets/tilemaps/tiles/' + Game.Config.data.tilesmap.assets[i].file);
        for(let i in Game.Config.data.modals.assets)
            this.game.load.image(Game.Config.data.modals.assets[i].name, game_path +
                '/assets/modals/' + Game.Config.data.modals.assets[i].file);

        this.game.load.spritesheet('player', game_path + '/assets/sprites/george.png', 32, 32, 16);
    }

    /** Called when the state must be created */
    create() {
        // Calling the menu state
        this.game.state.start('menu');
    }
};