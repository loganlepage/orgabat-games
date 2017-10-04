"use strict";
import Video from "system/phaser/Video";
import Phaser from 'phaser';

export default class VideoObject extends Video {

    constructor(game, x, y) {
        super(game);
        this.addSprite(new VideoSprite({
            game: this.game,
            x: x,
            y: y,
            buttonObj: this
        }));
        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;
    }
}