"use strict";
var MyPhaser = MyPhaser || {};

/**
 * Abstract modal (parent for all gameModals)
 * @type {Modal}
 */
MyPhaser.Modal = class Modal {
    constructor(properties, materialObj, game) {
        this.properties = properties;
        this.obj = materialObj;
        this.game = game;
        this.modals = [];
        this.modals.fixed = [];
        this.modals.infobox = [];
    }

    createWithPattern(pattern, type, name) {
        if(this.modals[type] === undefined) throw new Error(`type '${type}' inexistant`);
        if(this.modals[type][name] !== undefined) throw new Error(`nom '${name}' existant`);
        Game.modals.createWithPattern(pattern, `${type}_${name}_${this.obj.sprite.key}`);
        this.modals[type][name] = {
            pattern: pattern,
            modal: `${pattern}_${type}_${name}_${this.obj.sprite.key}`,
            type: type};
    }

    isShowing(name, type) {
        if(this.modals[type] === undefined) throw new Error(`type '${type}' inexistant`);
        if(this.modals[type][name] === undefined) throw new Error(`nom '${name}' inexistant`);
        return Game.modals.isShowing(this.modals[type][name].modal);
    }
    hideInfobox(name) {
        if(this.modals.infobox[name] === undefined) throw new Error(`infobox '${name}' inexistante`);
        Game.modals.hide(this.modals.infobox[name].modal);
    }
    hideFixed(name) {
        if(this.modals.fixed[name] === undefined) throw new Error(`fixed '${name}' inexistante`);
        Game.modals.hide(this.modals.fixed[name].modal);
    }

    getSize(item) {
        return item._frame.right * Game.Manager.ModalScale;
    }
    getAlignCenterX(reference, item) {
        return reference._frame.centerX * Game.Manager.ModalScale - item.width / 2;
    }
    getAlignRightX(reference, item) {
        return reference._frame.right * Game.Manager.ModalScale - item.width;
    }
    getAlignCenterY(reference, item) {
        return reference._frame.centerY * Game.Manager.ModalScale - item.height / 2;
    }
    getAlignBottomY(reference, item) {
        return reference._frame.bottom * Game.Manager.ModalScale - item.height;
    }
    getOuterRightToSprite(sprite, offset) {
        offset = offset ? offset : 0;
        return sprite.position.x + sprite.width * (1 - sprite.anchor.x) + offset * Game.Manager.ModalScale;
    }
    getOuterLeftToSprite(sprite, item, offset) {
        offset = offset ? offset : 0;
        return sprite.position.x - sprite.width * (1 - sprite.anchor.x) - ( item._frame.right + offset ) * Game.Manager.ModalScale;
    }
    getInnerTopToSprite(sprite) {
        return sprite.position.y - sprite.height * (1 - sprite.anchor.x)
    }
    outerRightToSpriteIsPossible(sprite, offsetX, item) {
        return this.getOuterRightToSprite(sprite) + offsetX + this.getSize(item) < this.game.width;
    }
};