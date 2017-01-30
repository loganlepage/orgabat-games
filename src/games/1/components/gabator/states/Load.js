"use strict";
import {State} from 'phaser';
import Config from '../config/data';

/** State to load gabator (image, tilemap, spritesheet...) */
export default class Load extends State {

    /** Called before create */
    preload() {
        this.game.stage.backgroundColor = "#FFFFFF";
        for(let i in Config.entities.assets)
            this.game.load.image(
                Config.entities.assets[i].name,
                `${assets_path}sprite/${Config.entities.assets[i].file}`
            );
        for(let i in Config.buttons.assets)
            this.game.load.spritesheet(
                Config.buttons.assets[i].name,
                `${assets_path}button/${Config.buttons.assets[i].file}`, 96, 96
            );
    }

    /** Called when the state must be created */
    create() {
        this.game.state.start('play');
    }
};