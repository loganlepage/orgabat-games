'use strict';
import {Signal} from 'phaser';
import BasicGameSprite from "./BasicGameSprite";

/** Abstract gameSprite (parent for all gameSprites) */
export default class GameSprite extends BasicGameSprite {

    onCollisionHandled = new Signal();

    constructor(game, x, y, key, gameObject) {
        super(game, x, y, key, gameObject);
    }

    /** Events */
    onCollision(from, to) {
        from.class = from.class === undefined ? 'gameObject' : from.class;
        to.class = to.class === undefined ? 'gameObject' : to.class;
        this.onCollisionHandled.dispatch({me: from, object: to});
    }
    wallCollision(from, to) {
        to.class = 'layer';
        this.onCollision(from, to);
    }
};