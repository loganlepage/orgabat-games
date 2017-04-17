'use strict';
import Phaser, {Signal} from 'phaser';

/** Abstract gameSprite (parent for all gameSprites) */
export default class BasicGameSprite extends Phaser.Sprite {

    onMouseOverHandled = new Signal();
    onMouseOutHandled = new Signal();
    onMouseDownHandled = new Signal();

    constructor(game, x, y, key, gameObject) {
        super(game, x, y, 'atlas', key);
        this.scale.set(game.SCALE);
        this.obj = gameObject;
        this.inputEnabled = true;
        this.events.onInputOver.add(this.onMouseOver, this);
        this.events.onInputOut.add(this.onMouseOut, this);
        this.events.onInputDown.add(this.onMouseDown, this);
    }

    /** Events */
    onMouseOver(sprite) {
        if(!this.game.controlsEnabled) return;
        this.onMouseOverHandled.dispatch(sprite);
    }
    onMouseOut(sprite) {
        if(!this.game.controlsEnabled) return;
        this.onMouseOutHandled.dispatch(sprite);
    }
    onMouseDown(sprite) {
        if(!this.game.controlsEnabled) return;
        this.onMouseDownHandled.dispatch(sprite);
    }
    update() {
        if(!this.game.controlsEnabled) return;
        if(this.obj.update !== undefined)
            this.obj.update();
    }
};