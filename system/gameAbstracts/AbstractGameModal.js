"use strict";
var Game = Game || {};
Game.Abstract = Game.Abstract || {};

/**
 * abstract modal (parent for all gameModals)
 */
Game.Abstract.AbstractGameModal = class AbstractGameModal {
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

    hideInfobox(name) {
        if(this.modals.infobox[name] === undefined) throw new Error(`infobox '${name}' inexistante`);
        Game.modals.hide(`${this.modals.infobox[name].modal}`);
    }
    hideFixed(name) {
        if(this.modals.fixed[name] === undefined) throw new Error(`fixed '${name}' inexistante`);
        Game.modals.hide(`${this.modals.fixed[name].modal}`);
    }

    getSize(item) {
        return item._frame.right * Game.SCALE;
    }
    getAlignCenterX(reference, item) {
        return reference._frame.centerX * Game.SCALE - item.width / 2;
    }
    getAlignRightX(reference, item) {
        return reference._frame.right * Game.SCALE - item.width;
    }
    getAlignCenterY(reference, item) {
        return reference._frame.centerY * Game.SCALE - item.height / 2;
    }
    getAlignBottomY(reference, item) {
        return reference._frame.bottom * Game.SCALE - item.height;
    }
    getOuterRightToSprite(sprite) {
        return sprite.position.x + sprite.width * (1 - sprite.anchor.x);
    }
    getOuterLeftToSprite(sprite, item) {
        return sprite.position.x - sprite.width * (1 - sprite.anchor.x) - item._frame.right * Game.SCALE;
    }
    getInnerTopToSprite(sprite) {
        return sprite.position.y - sprite.height * (1 - sprite.anchor.x)
    }
    outerRightToSpriteIsPossible(sprite, offsetX, item) {
        return this.getOuterRightToSprite(sprite) + offsetX + this.getSize(item) < this.game.width;
    }
};