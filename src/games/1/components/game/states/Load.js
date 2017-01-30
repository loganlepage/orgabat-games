"use strict";
import {Tilemap, State} from 'phaser';
import Config from '../config/data';
import Player from '../objects/Player/Player';
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
        this.loadModulesAssets();
    }

    /** Called by preload to show loading text */
    showLoadingText(){
        const text = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2, 'Chargement...');
        text.anchor.set(0.5);
        text.align = 'center';
        text.font = 'Arial';
        text.fontSize = this.game.uiScale(48);
        text.fill = '#272727';
    }

    /** Called by preload to load assets */
    loadAssets(){
        this.game.load.tilemap('map', `${assets_path}tilemap/maps/${Config.tilemap.file}`, null, Tilemap.TILED_JSON);
        for(let i in Config.entities.assets)
            this.game.load.image(Config.entities.assets[i].name, `${assets_path}sprite/${Config.entities.assets[i].file}`);
        for(let i in Config.tilemap.assets)
            this.game.load.image(Config.tilemap.assets[i].name, `${assets_path}tilemap/tiles/${Config.tilemap.assets[i].file}`);
        for(let i in Config.modals.assets)
            this.game.load.image(Config.modals.assets[i].name, `${assets_path}modal/${Config.modals.assets[i].file}`);
        for(let i in Config.buttons.assets)
            this.game.load.spritesheet(
                Config.buttons.assets[i].name,
                `${assets_path}button/${Config.buttons.assets[i].file}`,
                Config.buttons.assets[i].width,
                Config.buttons.assets[i].height
            );


        this.game.load.spritesheet('player', `${assets_path}sprite/player.32.png`, 33, 48, 16);
    }

    loadModulesAssets(){
        Joystick.preload(this.game);
    }

    /** Called when the state must be created */
    create() {
        // Calling the menu state
        this.game.state.start('rules');
    }
};