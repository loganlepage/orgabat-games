'use strict';
import Phaser, {Signal} from 'phaser';

/** Abstract gameSprite (parent for all gameSprites) */
export default class GameSprite extends Phaser.Sprite {
    constructor(game, x, y, name, gameObject) {
        super(game, x, y, 'atlas', `sprite/${name}`);
        this.onCollisionHandled = new Signal();
        this.onMouseOverHandled = new Signal();
        this.onMouseOutHandled = new Signal();
        this.scale.set(game.SCALE);
        this.obj = gameObject;
        this.inputEnabled = true;
        this.events.onInputOver.add(this.onMouseOver, this);
        this.events.onInputOut.add(this.onMouseOut, this);
    }

    /** Events */
    onCollision(obj1, obj2) {
        obj1.class = obj1.class === undefined ? 'gameObject' : obj1.class;
        obj2.class = obj2.class === undefined ? 'gameObject' : obj2.class;
        this.onCollisionHandled.dispatch({me: obj1, object: obj2});
    }
    wallCollision(obj1, obj2) {
        obj2.class = 'layer';
        this.onCollision(obj1, obj2);
    }
    onMouseOver(sprite) {
        if(!this.game.controlsEnabled) return;
        this.onMouseOverHandled.dispatch(sprite);
    }
    onMouseOut(sprite) {
        if(!this.game.controlsEnabled) return;
        this.onMouseOutHandled.dispatch(sprite);
    }
    update() {
        if(!this.game.controlsEnabled) return;
        if(this.obj.update !== undefined)
            this.obj.update();
    }
};