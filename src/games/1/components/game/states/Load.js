"use strict";
import {Tilemap, State} from 'phaser';
import Config from '../config/data';
import Joystick from 'system/phaser/utils/Joystick';

/** State to load the game (image, tilemap, spritesheet...) */
export default class Load extends State {
    constructor() {
        super();
    }

    /** Called before create */
    preload() {
        //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.game.stage.backgroundColor = '#FFFFFF';
        this.showLoadingText();
        this.loadAssets();
    }

    /** Called by preload to show loading text */
    showLoadingText(){
        const text = this.game.add.text(this.game.canvas.width*0.5, this.game.canvas.height*0.5, 'Chargement...');
        text.anchor.set(0.5);
        text.align = 'center';
        text.font = 'Arial';
        text.fontSize = this.game.uiScale(48);
        text.fill = '#272727';
    }

    /** Called by preload to load assets */
    loadAssets(){
        this.game.load.tilemap('map', `${assets_path}tilemap/maps/${Config.tilemap.file}`, null, Tilemap.TILED_JSON);
        for(let i in Config.tilemap.assets)
            this.game.load.image(Config.tilemap.assets[i].name, `${assets_path}tilemap/tiles/${Config.tilemap.assets[i].file}`);
        this.game.load.atlasJSONHash('atlas', `${assets_path}${Config.atlas}.png`, `${assets_path}${Config.atlas}.json`);
    }

    /** Called when the state must be created */
    create() {
        // Calling the menu state
        this.game.state.start('rules');
    }
};