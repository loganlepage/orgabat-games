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
        super(game, game.modalScale(x), game.modalScale(y), key);
        this.scale.setTo(Type.isNumber(props.scale) ? game.modalScale(props.scale) : game.modalScale(1));
        this.visible = Type.isBoolean(props.visible) ? props.visible : true;
        this.inputEnabled = Type.isBoolean(props.inputEnabled) ? props.inputEnabled : false;
    }
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
        if(style.fontSize) style.fontSize = game.modalScale(style.fontSize);
        super(game, game.modalScale(x), game.modalScale(y), text, style);
        this.visible = Type.isBoolean(props.visible) ? props.visible : true;
        this.inputEnabled = Type.isBoolean(props.inputEnabled) ? props.inputEnabled : false;
    }
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
    static show(modal, callback = () => {}) {
        try { Type.isExist(modal, true);
        } catch (e) { console.error(e.name + ": " + e.message); }
        const m = modal; // Prevent change during an animation
        this.game.world.bringToTop(m);
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
            Manager.show(modal);
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
            Manager.show(this.current);
        } else if(this.current && this.current === modal) {
            Manager.hide(this.current);
            this.current = null;
        }
    }

    /** Toggle Show / Hide modal */
    toggle(visible, modal, params) {
       // console.error({visible:visible, modal:modal, controls:params.controls, fixeMe:modal.params.fixeMe, fixed:modal.params.fixed});
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

class Stack extends Phaser.Group {
    constructor(x, y, align, game) {
        super(game);
        this.fixedToCamera = true;
        this.cameraOffset.setTo(x, y);
        this.align = align;
    }
    add(modal) {
        if(this.align.h === 'left') modal.x = 0;
        else if(this.align.h === 'right') modal.x = -modal.width;
        super.add(modal);
        this._reorganize();
    }
    remove(modal) {
        super.remove(modal);
        this._reorganize();
    }
    _reorganize() {
        let margin = 0;
        for(let i = this.children.length - 1; i >= 0; i--) {
            margin -= this.children[i].height + this.game.modalScale(10);
            Manager.moveTo(this.children[i], {y:margin});
        }
    }
}

/** Modal Stack Manager Strategy */
export class StackManager extends Manager {
    constructor(game, debug) {
        super(game);
        this.debug = debug;
        this.stacks = {
            BOTTOM_LEFT: new Stack(
                this.game.modalScale(10),
                this.game.canvas.height - this.game.modalScale(10),
                {v: 'bottom', h: 'left'}, this.game),
            BOTTOM_RIGHT: new Stack(
                this.game.canvas.width - this.game.modalScale(10),
                this.game.canvas.height - this.game.modalScale(10),
                {v: 'bottom', h: 'right'}, this.game)
        };
    }

    /** Controls */
    _add(modal, stack) {
        this.stacks[stack].add(modal);
        Manager.show(modal);
    }
    _del(modal, stack) {
        Manager.hide(modal, () => this.stacks[stack].remove(modal));
    }

    /** Toggle Show / Hide modal */
    toggle(visible, modal, params) {
        visible ? this._add(modal, params.stack) : this._del(modal, params.stack);
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
                    if(Type.isNumber(data.items[key].x)) nestedGroup.x = this.game.modalScale(data.items[key].x);
                    if(Type.isNumber(data.items[key].y)) nestedGroup.y = this.game.modalScale(data.items[key].y);
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