'use strict';
import {Group} from 'phaser';

/** Abstract gameFactory (parent for all gameGroup) */
export default class GameFactory extends Group {
    constructor(game) {
        super(game);
        this.game.layer.zDepth0.add(this);
    }
};