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

    getSize(item) {
        return this.game.modalScale(item._frame.right);
    }
    getAlignCenterX(reference, item) {
        return this.game.modalScale(reference._frame.centerX) - item.width / 2;
    }
    getAlignRightX(reference, item) {
        return this.game.modalScale(reference._frame.right) - item.width;
    }
    getAlignCenterY(reference, item) {
        return this.game.modalScale(reference._frame.centerY) - item.height / 2;
    }
    getAlignBottomY(reference, item) {
        return this.game.modalScale(reference._frame.bottom) - item.height;
    }
    getOuterLeftToSprite(sprite, item, offset) {
        offset = offset ? offset : 0;
        return sprite.position.x - sprite.width * (1 - sprite.anchor.x) - this.game.modalScale(item._frame.right + offset);
    }
    getOuterCenterXToSprite(sprite, item) {
        return sprite.position.x - this.game.modalScale(item._frame.centerX);
    }
    getOuterRightToSprite(sprite, offset) {
        offset = offset ? offset : 0;
        return sprite.position.x + sprite.width * (1 - sprite.anchor.x) + this.game.modalScale(offset);
    }
    getOuterTopToSprite(sprite, item, offset) {
        offset = offset ? offset : 0;
        return sprite.position.y - sprite.height * (1 - sprite.anchor.y) - this.game.modalScale(item._frame.height + offset);
    }
    getOuterBottomToSprite(sprite, offset) {
        offset = offset ? offset : 0;
        return sprite.position.y + sprite.height * (1 - sprite.anchor.y) - this.game.modalScale(offset);
    }
    getInnerTopToSprite(sprite) {
        return sprite.position.y - sprite.height * (1 - sprite.anchor.y)
    }
    getInnerDownToSprite(sprite) {
        return sprite.position.y + sprite.height * (1 - sprite.anchor.y)
    }
    isPossibleToOuterRightToSprite(sprite, offsetX, item) {
        return this.getOuterRightToSprite(sprite) + offsetX + this.getSize(item) < this.game.width;
    }

    static fillWord(item, str, color) {
        const start = item.text.replace(/\n/g,'').indexOf(str);
        if(start < 0) return;
        const oldColor = item.style.fill;
        item.addColor(color, start);
        item.addColor(oldColor, start + str.length)
    }
};