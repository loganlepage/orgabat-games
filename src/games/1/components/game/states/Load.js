"use strict";
import {Tilemap, State} from 'phaser';
import Config from '../config/data';
import Player from '../objects/Player/Player';

/** State to load the game (image, tilemap, spritesheet...) */
export default class LoadMap extends State {

    /** Called before create */
    preload() {
        //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.game.stage.backgroundColor = '#FFFFFF';
        this.showLoadingText();
        this.loadAssets();
    }

    /** Called by preload to show loading text */
    showLoadingText(){
        const text = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2, 'Chargement...');
        text.anchor.set(0.5);
        text.align = 'center';
        text.font = 'Arial';
        text.fontSize = this.game.modalScale(48);
        text.fill = '#272727';
    }

    /** Called by preload to load assets */
    loadAssets(){
        this.game.load.tilemap('map', `${assets_path}tilemap/maps/map.json`, null, Tilemap.TILED_JSON);
        for(let i in Config.entities.assets)
            this.game.load.image(Config.entities.assets[i].name, `${assets_path}sprite/${Config.entities.assets[i].file}`);
        for(let i in Config.tilesmap.assets)
            this.game.load.image(Config.tilesmap.assets[i].name, `${assets_path}tilemap/tiles/${Config.tilesmap.assets[i].file}`);
        for(let i in Config.modals.assets)
            this.game.load.image(Config.modals.assets[i].name, `${assets_path}modal/${Config.modals.assets[i].file}`);

        this.game.load.spritesheet(Player.name, `${assets_path}sprite/george.png`, 32, 32, 16);
    }

    /** Called when the state must be created */
    create() {
        // Calling the menu state
        this.game.state.start('rules');
    }
};