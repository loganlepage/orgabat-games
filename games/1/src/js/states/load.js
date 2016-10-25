var Game = Game || {};
Game.State = Game.State || {};


/**
 * State to load the game (image, tilemap, spritesheet...)
 */
Game.State.loadState = {
    // Called before
    preload: function() {
        //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.game.stage.backgroundColor = '#FFFFFF';
        this.showLoadingText();
        this.loadAssets();
    },

    loadAssets: function(){
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
    },

    showLoadingText: function(){
        let loadingText = "Chargement...";
        let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, loadingText);
        //  Centers the text
        text.anchor.set(0.5);
        text.align = 'center';

        //  Our font + size
        text.font = 'Arial';
        text.fontSize = 70;
        text.fill = '#272727';
    },

    create: function() {
        // Calling the menu state
        this.game.state.start('menu');
    }
};