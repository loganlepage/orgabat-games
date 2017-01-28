"use strict";
import Phaser from 'phaser';
import Type from '../utils/Type';
import GameModal from './GameModal';

/** Make a sprite item for modal */
class Sprite extends Phaser.Sprite {
    /**
     * Constructor for a new Image item
     * @param game
     * @param x
     * @param y
     * @param key
     * @param props
     */
    constructor(game, x, y, key, props) {
        props = props || {};
        try {
            Type.isExist(game, true);
            Type.isNumber(x, true);
            Type.isNumber(y, true);
            Type.isString(key, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(game, game.uiScale(x), game.uiScale(y), key);
        this.scale.setTo(game.uiScale(Type.isNumber(props.scale) ? props.scale : 1));
        this.visible = Type.isBoolean(props.visible) ? props.visible : true;
        this.inputEnabled = Type.isBoolean(props.inputEnabled) ? props.inputEnabled : false;
        this.anchor.set(
            Type.isNumber(props.anchorX) ? props.anchorX : 0,
            Type.isNumber(props.anchorY) ? props.anchorY : 0
        );
    }
    setX(x){ this.x = this.game.uiScale(x) }
    setY(y){ this.y = this.game.uiScale(y) }
    getWidth() { return this._frame.width}
}

/** Make a text item for modal */
class Text extends Phaser.Text {
    /**
     * Constructor for a new Text item
     * @param game
     * @param x
     * @param y
     * @param text
     * @param style
     * @param props
     */
    constructor(game, x, y, text, style, props) {
        props = props || {};
        try {
            Type.isExist(game, true);
            Type.isNumber(x, true);
            Type.isNumber(y, true);
            Type.isString(text, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        style = Type.isExist(style) ? style : {};
        if(style.fontSize) style.fontSize = game.uiScale(style.fontSize);
        if(style.strokeThickness) style.strokeThickness = game.uiScale(style.strokeThickness);
        if(style.wordWrapWidth) style.wordWrapWidth = game.uiScale(style.wordWrapWidth);

        super(game, game.uiScale(x), game.uiScale(y), text, style);
        this.visible = Type.isBoolean(props.visible) ? props.visible : true;
        this.inputEnabled = Type.isBoolean(props.inputEnabled) ? props.inputEnabled : false;
        this.anchor.set(
            Type.isNumber(props.anchorX) ? props.anchorX : 0,
            Type.isNumber(props.anchorY) ? props.anchorY : 0
        );
    }
    setX(x){ this.x = this.game.uiScale(x) }
    setY(y){ this.y = this.game.uiScale(y) }
}

/** Modal Manager Strategy */
class Manager extends GameModal {
    constructor(game) {
        super(game);
        Manager.game = game;
    }

    static getInstance(game, debug) {
        if (!Type.isExist(this.instance))
            this.instance = new this(game, debug);
        return this.instance;
    }

    /** Show modal view */
    static show(modal, group, callback = () => {}) {
        try { Type.isExist(modal, true);
        } catch (e) { console.error(e.name + ": " + e.message); }
        if(Type.isExist(group)) {
            group.add(modal);
            group.bringToTop(modal);
        }
        const m = modal; // Prevent change during an animation
        m.visible = true;
        m.alpha = 0;
        this.game.add.tween(m).to({alpha:1}, 100, Phaser.Easing.Linear.None, true)
            .onComplete.add(() => callback(), this);
    }

    /** Hide modal view */
    static hide(modal, callback = () => {}) {
        try { Type.isExist(modal, true);
        } catch (e) { console.error(e.name + ": " + e.message); }
        const m = modal; // Prevent change during an animation
        m.alpha = 1;
        this.game.add.tween(m).to({alpha:0}, 100, Phaser.Easing.Linear.None, true)
            .onComplete.add(() => {m.visible = false; callback()}, this);
    }

    /** Move modal */
    static moveTo(modal, to = {}, callback = () => {}) {
        this.game.add.tween(modal).to(to, 100, Phaser.Easing.Linear.None, true)
            .onComplete.add(() => callback(), this);
    }
}

/** Modal Tooltip Manager Strategy */
export class TooltipManager extends Manager {
    constructor(game, debug) {
        super(game);
        this.controls = true;
        this.debug = debug;
    }

    /** Controls */
    _setFixed(modal, visible = true) {
        if(visible)
            Manager.show(modal, this.game.layer.zDepth1);
        modal.params.fixeMe = null;
        modal.params.fixed = true;
    }
    _setNotFixed(modal, visible = false) {
        if(!visible)
            Manager.hide(modal);
        modal.params.fixeMe = null;
        modal.params.fixed = false;
    }
    _setCurrent(modal, visible) {
        if(visible) {
            if(this.current && this.current !== modal)
                this._setCurrent(this.current, false);
            this.current = modal;
            Manager.show(this.current, this.game.layer.zDepth1);
        }
        else if(this.current) {
            Manager.hide(this.current);
            this.current = null;
        }
    }

    /** Toggle Show / Hide modal */
    toggle(visible, modal, params) {
        if(params.controls === true) this.controls = true;

        // If we want to fixe
        if(modal.params.fixeMe === true && modal.params.fixed === false)
            this._setFixed(modal, visible);

        // If we want to unfixe
        else if(modal.params.fixeMe === false && modal.params.fixed === true)
            this._setNotFixed(modal, visible);

        // If we want to set current (controls must be enabled)
        else if(modal.params.fixed === false && (this.controls || params.force === true))
            this._setCurrent(modal, visible);

        this.controls = Type.isBoolean(params.controls) ? params.controls : this.controls;
    }
}

export class Stack extends Phaser.Group {
    constructor(x, y, game, params) {
        super(game, game.layer.zDepth2);
        this.fixedToCamera = true;
        this.cameraOffset.setTo(x, y);
        this.axe = Type.isBoolean(params.axe) ? params.axe : Stack.VERTICAL;
        this.direction = Type.isString(params.direction) ? params.direction : Stack.TOP;
        this.offset = {
            x: game.uiScale(Type.isNumber(params.offsetX) ? params.offsetX : 10),
            y: game.uiScale(Type.isNumber(params.offsetY) ? params.offsetY : 10),
        };
        this.anchor = {
            x: Type.isNumber(params.anchorX) ? params.anchorX : 0,
            y: Type.isNumber(params.anchorY) ? params.anchorY : 0,
        };
        this.sort = Type.isNumber(params.sort) ? params.sort : Stack.DESC;
        this.toAdd = [];
    }
    add(modal) { this.toAdd.push(modal); }
    _add(modal) {
        super.addChild(modal);
        this._reorganize();
    }
    remove(modal) {
        super.removeChild(modal);
        this._reorganize();
    }
    //permet de ne pas avoir l'erreur "this.children[i] is undefined" de la part de Phaser.Group
    //en étant sûr de faire l'ajout en dehors de la boucle d'update du parent.
    update() {
        for(let i = 0; i < this.toAdd.length; i++)
            this._add(this.toAdd[i]);
        this.toAdd = [];
    }
    _reorganize() {
        let x = 0, y = 0, counter = 0;
        const start =               this.sort == Stack.DESC ? this.children.length - 1 : 0;
        const condition = (i) =>    this.sort == Stack.DESC ? i >= 0 : i < this.children.length;
        const increment =           this.sort;
        for(let i = start; condition(i); i+=increment) {
            switch(this.axe) {
                case Stack.HORIZONTAL:
                    if(counter == 0) x = this.children[i].width * -this.anchor.x;
                    y = (this.children[i].height + this.offset.y) * (1-this.anchor.y*2);
                    Manager.moveTo(this.children[i], {x:x, y:y});
                    x += (this.direction == Stack.LEFT ? -1 : 1) * (this.children[i].width + this.offset.x);
                    break;
                case Stack.VERTICAL:
                    if(counter == 0) y = this.children[i].height * -this.anchor.y;
                    x = (this.children[i].width + this.offset.x) * (1-this.anchor.x*2);
                    Manager.moveTo(this.children[i], {x:x, y:y});
                    y += (this.direction == Stack.TOP ? -1 : 1) * (this.children[i].height + this.offset.y);
                    break;
                default:
                    break;
            }
            counter++;
        }
    }
    static get VERTICAL() { return true }
    static get HORIZONTAL() { return false }
    static get BOTTOM() { return 'BOTTOM' }
    static get LEFT() { return 'LEFT' }
    static get TOP() { return 'TOP' }
    static get RIGHT() { return 'RIGHT' }
    static get ASC() { return 1 }
    static get DESC() { return -1 }
}

/** Modal Stack Manager Strategy */
export class StackManager extends Manager {
    constructor(game, debug) {
        super(game);
        this.debug = debug;
        this.stacks = {
            BOTTOM_RIGHT: new Stack(
                this.game.canvas.width - 10,
                this.game.canvas.height - 10,
                this.game,
                {axe: Stack.VERTICAL, direction: Stack.TOP, anchorX: 1, anchorY: 1 })
        };
    }

    /** Controls */
    _add(modal, stack) {
        if(Type.isString(stack))
            this.stacks[stack].add(modal);
        else if(Type.isInstanceOf(stack, Stack))
            stack.add(modal);
        Manager.show(modal);
    }
    _del(modal, stack) {
        Manager.hide(modal, () => {
            if(Type.isString(stack))
                this.stacks[stack].remove(modal);
            else if(Type.isInstanceOf(stack, Stack))
                stack.remove(modal);
        });
    }

    /** Toggle Show / Hide modal */
    toggle(visible, modal, params) {
        visible ? this._add(modal, params.stack) : this._del(modal, params.stack);
    }
}

/** Modal Stack Manager Strategy */
export class DefaultManager extends Manager {
    constructor(game, debug) {
        super(game);
        this.debug = debug;
        const rect = game.add.graphics(0, 0);
        rect.beginFill(0x000000, 0.75);
        rect.drawRect(0, 0, game.canvas.width, game.canvas.height);
        rect.endFill();
        this.blackBackground = new Phaser.Group(game);
        this.blackBackground.alpha = 0;
        this.blackBackground.fixedToCamera = true;
        this.blackBackground.add(rect);
        this.game.layer.zDepth3.add(this.blackBackground);
    }

    /** Controls */
    _add(modal, params) {
        if(Type.isNumber(params.width) && Type.isNumber(params.height)) {
            modal.fixedToCameraDefault = modal.fixedToCamera;
            modal.fixedToCamera = true;
            modal.cameraOffset.setTo(
                this.game.canvas.width / 2 - this.game.uiScale(params.width) / 2,
                this.game.canvas.height / 2 - this.game.uiScale(params.height) / 2
            );
            Manager.show(this.blackBackground);
            Manager.show(modal, this.game.layer.zDepth3);
        }
    }
    _del(modal) {
        modal.fixedToCamera = modal.fixedToCameraDefault;
        Manager.hide(this.blackBackground);
        Manager.hide(modal);
    }

    /** Toggle Show / Hide modal */
    toggle(visible, modal, params) {
        visible ? this._add(modal, params) : this._del(modal);
    }
}

/** Modal factory */
class Factory extends Phaser.Group {
    /**
     * Constructor for a new modal group (nestable)
     * @param data
     * @param game
     * @param visible
     */
    constructor(data, game, visible) {
        super(game);
        if(Type.isBoolean(visible) ? !visible : true) {
            this.alpha = 1;
            this.visible = false;
        }
        this.items = {};
        this.generateItems(data);
    }
    setX(x){ this.x = this.game.uiScale(x) }
    setY(y){ this.y = this.game.uiScale(y) }

    /**
     * Generate items or group
     * @param data
     */
    generateItems(data) {
        if(data.type === 'group' && data.items) {
            for(let key in data.items) {
                if(data.items[key].type === 'group') {
                    const visible = Type.isBoolean(data.items[key].visible) ? data.items[key].visible : true;
                    const nestedGroup = new Factory(data.items[key], this.game, visible);
                    if(Type.isNumber(data.items[key].x))
                        nestedGroup.setX(data.items[key].x);
                    if(Type.isNumber(data.items[key].y))
                        nestedGroup.setY(data.items[key].y);
                    this.add(nestedGroup);
                    this.items[key] = nestedGroup;
                }
                else this.generateItem(data.items[key], key);
            }
        }
    }

    /**
     * Generate an item
     * @param data
     * @param key
     */
    generateItem(data, key) {
        let item;
        switch(data.type) {
            case 'text':
                item = new Text(this.game, data.x || 0, data.y || 0, data.text, data.style, data.props);
                break;
            case 'sprite':
                item = new Sprite(this.game, data.x || 0, data.y || 0, data.key, data.props);
                break;
        }
        if(item) {
            this.add(item);
            this.items[key] = item;
        }
    }
}



/** Abstract Modal (parent for all gameModals) */
export default class Modal extends Factory {
    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(data, game);
        this.data = data;
        this.manager = manager.getInstance(game);
        this.params = { fixed: false, fixeMe: null };
        //this.scale.setTo(game.uiScale(1));
    }

    /**
     * Manager Strategy
     * @param visible
     * @param params (fixed|controls)
     */
    toggle(visible, params) {
        this.params.fixeMe = Type.isBoolean(params.fixed) ? params.fixed : null;
        this.manager.toggle(visible, this, params);
    }
};