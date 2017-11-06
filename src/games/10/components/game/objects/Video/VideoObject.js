"use strict";
// import Video from "system/phaser/Video";
import Phaser from "phaser";

export default class VideoObject {

    constructor(game, key, url) {
        this.video = new Phaser.Video(game, key, url);
    }
}