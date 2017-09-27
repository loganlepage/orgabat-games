"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";

import ImageSprite from "./ImageSprite";

export default class Image extends BasicGameObject {

	game;

    constructor(game, x, y, key) {
        super(game);

        this.addSprite(new ImageSprite(this.game, x, y, key, this));
        this.sprite.scale.set(this.game.SCALE);
        // this.game.layer.zDepth0.addChild(this.sprite);

    }

    destroy(){
        this.sprite.destroy();
    }

}