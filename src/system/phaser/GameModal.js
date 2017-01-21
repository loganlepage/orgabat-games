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
        return reference._frame.centerX - item.width / 2;
    }
    getAlignRightX(reference, item) {
        return reference._frame.width - item.width;
    }
    getAlignCenterY(reference, item) {
        return reference._frame.centerY - item.height / 2;
    }
    getAlignBottomY(reference, item) {
        return reference._frame.bottom - item.height;
    }

    /** OUTER */
    getOuterLeftToSprite(sprite, item, scaleX, offset) {
        offset = offset ? offset : 0;
        return this.getInnerLeftToSprite(sprite) - item._frame.width * scaleX - offset;
    }
    getOuterCenterXToSprite(sprite, item, scaleX) {
        return this.getInnerCenterXToSprite(sprite) - item._frame.centerX * scaleX ;
    }
    getOuterRightToSprite(sprite, offset) {
        offset = offset ? offset : 0;
        return this.getInnerRightToSprite(sprite) + offset;
    }
    getOuterTopToSprite(sprite, item, scaleY, offset) {
        offset = offset ? offset : 0;
        return this.getInnerTopToSprite(sprite) - item._frame.height * scaleY - offset;
    }
    getOuterBottomToSprite(sprite, offset) {
        offset = offset ? offset : 0;
        return this.getInnerDownToSprite(sprite) + offset;
    }

    /** INNER */
    getInnerLeftToSprite(sprite) {
        return sprite.position.x - sprite.width * (1 - sprite.anchor.x)
    }
    getInnerCenterXToSprite(sprite) {
        return this.getInnerLeftToSprite(sprite) + sprite.width / 2;
    }
    getInnerRightToSprite(sprite) {
        return sprite.position.x + sprite.width * (1 - sprite.anchor.x)
    }
    getInnerTopToSprite(sprite) {
        return sprite.position.y - sprite.height * (1 - sprite.anchor.y)
    }
    getInnerDownToSprite(sprite) {
        return sprite.position.y + sprite.height * (1 - sprite.anchor.y)
    }

    /** BOOLEAN */
    isPossibleToOuterRightToSprite(sprite, offsetX, item) {
        return this.getOuterRightToSprite(sprite) + offsetX + item._frame.right < this.game.width;
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