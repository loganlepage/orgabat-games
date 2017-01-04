"use strict";

/** Abstract modal (parent for all gameModals) */
export default class Modal {
    constructor(properties, materialObj, game) {
        this.properties = properties;
        this.obj = materialObj;
        this.game = game;
        this.modals = [];
        this.modals.fixed = [];
        this.modals.infobox = [];
        this.managers = {};
    }

    createWithPattern(pattern, type, name) {
        if(this.modals[type] === undefined) throw new Error(`type '${type}' inexistant`);
        if(this.modals[type][name] !== undefined) throw new Error(`nom '${name}' existant`);
      //  Game.modals.createWithPattern(pattern, `${type}_${name}_${this.obj.sprite.key}`);
        this.modals[type][name] = {
            pattern: pattern,
            modal: `${pattern}_${type}_${name}_${this.obj.sprite.key}`,
            type: type};
    }

    isShowing(name, type) {
        if(this.modals[type] === undefined) throw new Error(`type '${type}' inexistant`);
        if(this.modals[type][name] === undefined) throw new Error(`nom '${name}' inexistant`);
      //  return Game.modals.isShowing(this.modals[type][name].modal);
    }
    hideInfobox(name) {
        if(this.modals.infobox[name] === undefined) throw new Error(`infobox '${name}' inexistante`);
     //   Game.modals.hide(this.modals.infobox[name].modal);
    }
    hideFixed(name) {
        if(this.modals.fixed[name] === undefined) throw new Error(`fixed '${name}' inexistante`);
      //  Game.modals.hide(this.modals.fixed[name].modal);
    }

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
    getOuterRightToSprite(sprite, offset) {
        offset = offset ? offset : 0;
        return sprite.position.x + sprite.width * (1 - sprite.anchor.x) + this.game.modalScale(offset);
    }
    getOuterLeftToSprite(sprite, item, offset) {
        offset = offset ? offset : 0;
        return sprite.position.x - sprite.width * (1 - sprite.anchor.x) - this.game.modalScale(item._frame.right + offset);
    }
    getInnerTopToSprite(sprite) {
        return sprite.position.y - sprite.height * (1 - sprite.anchor.y)
    }
    getInnerDownToSprite(sprite) {
        return sprite.position.y + sprite.height * (1 - sprite.anchor.y)
    }
    outerRightToSpriteIsPossible(sprite, offsetX, item) {
        return this.getOuterRightToSprite(sprite) + offsetX + this.getSize(item) < this.game.width;
    }
};