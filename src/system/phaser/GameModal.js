"use strict";


/** Abstract gameModal (parent for all gameModals) */
export default class GameModal {
    constructor(game) {
        this.game = game;
    }

    /** @returns {boolean} */
    static get VISIBLE() { return true; }
    /** @returns {boolean} */
    static get HIDDEN() { return false; }
    /** @returns {boolean} */
    static get FIXED() { return true; }
    /** @returns {boolean} */
    static get NOT_FIXED() { return false; }
    /** @returns {boolean} */
    static get CONTROLS_ENABLED() { return true; }
    /** @returns {boolean} */
    static get CONTROLS_DISABLED() { return false; }
    /** @returns {boolean} */
    static get FORCE() { return true; }

    getAlignCenterX(reference, item) {
        return reference.centerX - item.width * 0.5;
    }
    getAlignRightX(reference, item) {
        return reference.width - item.width;
    }
    getAlignCenterY(reference, item) {
        return reference.centerY - item.height * 0.5;
    }
    getAlignBottomY(reference, item) {
        return reference.bottom - item.height;
    }

    /** OUTER */
    getOuterLeftToSprite(fromSprite, fromPosition, toItem, scaleX, offset = 0) {
        return this.getInnerLeftToSprite(fromSprite, fromPosition) - toItem.width * scaleX - offset;
    }
    getOuterCenterXToSprite(fromSprite, fromPosition, toItem, scaleX) {
        return this.getInnerCenterXToSprite(fromSprite, fromPosition) - toItem.centerX * scaleX;
    }
    getOuterRightToSprite(fromSprite, fromPosition, offset = 0) {
        return this.getInnerRightToSprite(fromSprite, fromPosition) + offset;
    }
    getOuterTopToSprite(fromSprite, fromPosition, toItem, scaleY, offset = 0) {
        return this.getInnerTopToSprite(fromSprite, fromPosition) - toItem.height * scaleY - offset;
    }
    getOuterBottomToSprite(fromSprite, fromPosition, offset = 0) {
        return this.getInnerDownToSprite(fromSprite, fromPosition) + offset;
    }

    /** INNER */
    getInnerLeftToSprite(sprite, position) {
        return position.x - sprite.width * sprite.anchor.x
    }
    getInnerCenterXToSprite(sprite, position) {
        return this.getInnerLeftToSprite(sprite, position) + sprite.width * 0.5;
    }
    getInnerRightToSprite(sprite, position) {
        return position.x + sprite.width * sprite.anchor.x
    }
    getInnerTopToSprite(sprite, position) {
        return position.y - sprite.height * sprite.anchor.y
    }
    getInnerDownToSprite(sprite, position) {
        return position.y + sprite.height * sprite.anchor.y
    }

    /** BOOLEAN */
    isPossibleToOuterRightToSprite(fromSprite, fromPosition, offsetX, item) {
        return this.getOuterRightToSprite(fromSprite, fromPosition) + offsetX + item._frame.right < this.game.width;
    }

    /** OTHER */
    static fillWord(item, str, color) {
        const start = item.text.replace(/\n/g,'').indexOf(str);
        if(start < 0) return;
        const oldColor = item.style.fill;
        item.addColor(color, start);
        item.addColor(oldColor, start + str.length)
    }
};