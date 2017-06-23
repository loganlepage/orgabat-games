'use strict';

import {Easing, Math} from "phaser";

/** Do some animations */
export default class Animation {

    static _calculSpritePosition(from, to) {
        return {
            x: to.world.x + (from.width) * from.anchor.x - (from.width - to.width) * from.anchor.x,
            y: to.world.y + (from.height) * from.anchor.y - (from.height - to.height) * from.anchor.y,
        }
    }

    static _calculSpeed(from, to, speedRatio) {
        const distance =  Math.distance(
            from.world.x, to.world.x,
            from.world.y, to.world.y
        );
        return distance / speedRatio;
    }

    static moveToSprite({from, to, speedRatio = 1}, game) {
        return game.add.tween(from).to(
            Animation._calculSpritePosition(from, to),
            Animation._calculSpeed(from, to, speedRatio),
            Easing.Quadratic.InOut, false, 0
        ).start();
    }


};
