'use strict';
import AbstractObject from './AbstractObject';

/** Abstract gameObject (parent for all gameObjects) */
export default class BasicGameObject extends AbstractObject {

    constructor(game) {
        super(game);
    }

    /** Initialize a sprite & modal */
    addSprite(sprite) {
        this.sprite = sprite;
        this.game.layer.zDepth1.add(this.sprite);
        this.sprite.onMouseOverHandled.add(this.onMouseOver, this);
        this.sprite.onMouseOutHandled.add(this.onMouseOut, this);
        this.sprite.onMouseDownHandled.add(this.onMouseDown, this);
    }

    onMouseOver(){}
    onMouseOut(){}
    onMouseDown(){}
}