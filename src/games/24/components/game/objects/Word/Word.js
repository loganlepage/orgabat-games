"use strict";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import BasicGameObject from "system/phaser/BasicGameObject";
import Phaser from 'phaser';
import {Signal} from "phaser";

import WordSprite from './WordSprite';

export default class Word extends BasicGameObject {

    constructor(game) {
        super(game);
        this.game = game;
    }

}