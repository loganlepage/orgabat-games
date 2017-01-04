"use strict";
import {State, Tilemap} from 'phaser';
import Config from '../config/data';

/** State to load the game (image, tilemap, spritesheet...) */
export default class Load extends State {

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
        this.game.load.tilemap('map', `${assets_path}tilemaps/maps/map.json`, null, Tilemap.TILED_JSON);
        for(let i in Config.entities.assets)
            this.game.load.image(Config.entities.assets[i].name, `${assets_path}sprites/${Config.entities.assets[i].file}`);
        for(let i in Config.tilesmap.assets)
            this.game.load.image(Config.tilesmap.assets[i].name, `${assets_path}tilemaps/tiles/${Config.tilesmap.assets[i].file}`);
        for(let i in Config.modals.assets)
            this.game.load.image(Config.modals.assets[i].name, `${assets_path}modals/${Config.modals.assets[i].file}`);

        this.game.load.spritesheet('player', `${assets_path}sprites/george.png`, 32, 32, 16);
    }

    /** Called when the state must be created */
    create() {
        // Calling the menu state
        this.game.state.start('menu');
    }
};