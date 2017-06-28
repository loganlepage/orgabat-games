"use strict";
import Phaser from "phaser";
import Type from "../utils/Type";
import GameModal from "./GameModal";

/** Make a sprite item for modal */
class Button extends Phaser.Button {

    /**
     * Constructor for a new Image item
     * @param game
     * @param x
     * @param y
     * @param overFrame
     * @param outFrame
     * @param downFrame
     * @param upFrame
     * @param props
     */
    constructor(game, x = 0, y = 0, overFrame, outFrame, downFrame, upFrame, props = {}) {
        try {
            Type.isExist(game, true);
            Type.isNumber(x, true);
            Type.isNumber(y, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(game, game.uiScale(x), game.uiScale(y), 'atlas', null, null, overFrame, outFrame, downFrame, upFrame);
        this.scale.setTo(game.uiScale(Type.isNumber(props.scale) ? props.scale : 1));
        this.visible = Type.isBoolean(props.visible) ? props.visible : true;
        this.anchor.set(
            Type.isNumber(props.anchorX) ? props.anchorX : 0,
            Type.isNumber(props.anchorY) ? props.anchorY : 0
        );
    }

    setX(x) {
        this.x = this.game.uiScale(x)
    }

    setY(y) {
        this.y = this.game.uiScale(y)
    }
}

/** Make a sprite item for modal */
export class Sprite extends Phaser.Sprite {
    /**
     * Constructor for a new Image item
     * @param game
     * @param x
     * @param y
     * @param key
     * @param style
     * @param props
     */
    constructor(game, x = 0, y = 0, key, style = {}, props = {}) {
        try {
            Type.isExist(game, true);
            Type.isNumber(x, true);
            Type.isNumber(y, true);
            Type.isString(key, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(game, game.uiScale(x), game.uiScale(y), 'atlas', key);
        style = Type.isExist(style) ? style : {};
        if (style.tint) this.tint = style.tint;
        this.scale.setTo(game.uiScale(Type.isNumber(props.scale) ? props.scale : 1));
        this.visible = Type.isBoolean(props.visible) ? props.visible : true;
        this.inputEnabled = Type.isBoolean(props.inputEnabled) ? props.inputEnabled : false;
        this.anchor.set(
            Type.isNumber(props.anchorX) ? props.anchorX : 0,
            Type.isNumber(props.anchorY) ? props.anchorY : 0
        );
    }

    setX(x) {
        this.x = this.game.uiScale(x)
    }

    setY(y) {
        this.y = this.game.uiScale(y)
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
    constructor(game, x = 0, y = 0, text, style = {}, props = {}) {
        try {
            Type.isExist(game, true);
            Type.isNumber(x, true);
            Type.isNumber(y, true);
            Type.isString(text, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        style = Type.isExist(style) ? style : {};
        if (style.fontSize) style.fontSize = game.uiScale(style.fontSize);
        if (style.strokeThickness) style.strokeThickness = game.uiScale(style.strokeThickness);
        if (style.wordWrapWidth) style.wordWrapWidth = game.uiScale(style.wordWrapWidth);

        super(game, game.uiScale(x), game.uiScale(y), text, style);
        this.visible = Type.isBoolean(props.visible) ? props.visible : true;
        this.inputEnabled = Type.isBoolean(props.inputEnabled) ? props.inputEnabled : false;
        this.anchor.set(
            Type.isNumber(props.anchorX) ? props.anchorX : 0,
            Type.isNumber(props.anchorY) ? props.anchorY : 0
        );
    }

    setX(x) {
        this.x = this.game.uiScale(x)
    }

    setY(y) {
        this.y = this.game.uiScale(y)
    }

    update() {
    }
}

/** Modal Manager Strategy */
class Manager extends GameModal {

    constructor(game) {
        super(game);
    }

    static getInstance(game, debug) {
        if (!Type.isExist(this.instance))
            this.instance = new this(game, debug);
        return this.instance;
    }

    /** Show modal view */
    show(modal, group, quick = false, callback = () => {}) {
        try {
            Type.isExist(modal, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        if (Type.isExist(group)) {
            group.add(modal);
        }
        const m = modal; // Prevent change during an animation
        m.visible = true;
        const todo = () => {
            if (Type.isInstanceOf(modal.onShow, Phaser.Signal))
                modal.onShow.dispatch();
            callback()
        };
        if (quick) {
            m.alpha = 1;
            todo();
        }
        else {
            m.alpha = 0;
            this.game.add.tween(m).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                .onComplete.add(todo, this);
        }
    }

    /** Hide modal view */
    hide(modal, quick = false, callback = () => {}) {
        try {
            Type.isExist(modal, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        const m = modal; // Prevent change during an animation
        const todo = () => {
            if (Type.isInstanceOf(modal.onHide, Phaser.Signal))
                modal.onHide.dispatch();
            m.visible = false;
            callback()
        };
        if (quick) {
            m.alpha = 0;
            todo();
        }
        else {
            m.alpha = 1;
            this.game.add.tween(m).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true)
                .onComplete.add(todo, this);
        }
    }

    /** Move modal */
    static moveTo(modal, to = {}, game, callback = () => {}) {
        game.add.tween(modal).to(to, 100, Phaser.Easing.Linear.None, true)
            .onComplete.add(() => callback(), this);
    }
}

/** Modal Tooltip Manager Strategy */
export class TooltipManager extends Manager {
    constructor(game, debug) {
        super(game);
        this.controls = null;
        this.debug = debug;
    }

    /** Controls */
    _showFixed(modal, quick = false) {
        super.show(modal, this.game.layer.zDepth1, quick);
        modal.params.fixeMe = null;
        modal.params.fixed = true;
        if (modal === this.current)
            this.current = null;
    }

    _hideFixed(modal, quick = false) {
        super.hide(modal, quick);
        modal.params.fixeMe = null;
        modal.params.fixed = false;
    }

    _setCurrent(modal, visible, quick) {
        if (visible) {
            if (this.current && this.current !== modal)
                this._setCurrent(this.current, false, quick);
            this.current = modal;
            super.show(this.current, this.game.layer.zDepth1, quick);
        }
        else if (this.current && this.current === modal) {
            super.hide(this.current, quick);
            this.current = null;
        }
    }

    /**
     * Toggle Show / Hide modal
     * params.controls: boolean
     **/
    toggle(visible, modal, params, callback = () => {
    }) {
        if (params.controls === false || this.controls === modal)
            this.controls = modal;
        if (params.controls === true && this.controls === modal)
            this.controls = null;

        //visible:true, fixed:true
        if (visible && modal.params.fixeMe === true) {
            if (Type.isExist(params.context) && Type.isExist(this.current) && params.context === this.current.params.context) {
                this._setCurrent(this.current, false, true); //hide other to my place context
                this._showFixed(modal, true);
            } else
                this._showFixed(modal);
        }
        //visible:false, fixed:true
        else if (!visible && modal.params.fixed === true && modal.params.fixeMe === true) {
            this._hideFixed(modal);
        }
        else if (modal.params.fixed === false && visible && this.controls !== null && this.controls !== modal) {
            return callback({code: 403, msg: "Vous n'avez pas les controls pour vous afficher"});
        }
        //visible:true, _controls:true
        else if (modal.params.fixed === false) {
            this._setCurrent(modal, visible);
        }
        //console.log('-------------------------------------');
        //console.log('visible', visible);
        //console.log('fixeMe', modal.params.fixeMe);
        //console.log('fixed', modal.params.fixed);
        //console.log('this.controls=null', this.controls === null);
        //console.log('this.controls=modal', this.controls === modal);
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
        this.maxGridSize = Type.isNumber(params.maxGridSize) ? params.maxGridSize : -1;
        this.toAdd = [];
    }

    add(modal) {
        this.toAdd.push(modal);
    }

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
        for (let i = 0; i < this.toAdd.length; ++i)
            this._add(this.toAdd[i]);
        this.toAdd = [];
    }

    _reorganize() {
        const start = this.sort == Stack.DESC ? this.children.length - 1 : 0;
        const condition = (i) => this.sort == Stack.DESC ? i >= 0 : i < this.children.length;
        const increment = this.sort;
        let x = 0, y = 0, counter = 0, caseI = 0, caseJ = 0;
        const reorganize = (cbCondition) => {
            for (let i = start; condition(i); i += increment) {
                if (this.maxGridSize > 0) {
                    caseI = counter % this.maxGridSize;
                    caseJ = parseInt(counter / this.maxGridSize, 10);
                }
                if (cbCondition(this.children[i])) {
                    switch (this.axe) {
                        case Stack.HORIZONTAL:
                            if (counter === 0 || (this.maxGridSize > 0 && caseI === 0)) {
                                x = this.children[i].width * -this.anchor.x;
                            } else if (this.direction === Stack.LEFT) {
                                x -= this.children[i].width + this.offset.x;
                            }
                            y = (this.children[i].height + this.offset.y) * (this.anchor.y == 1 ? -1 : caseJ);
                            Manager.moveTo(this.children[i], {x: x, y: y}, this.game);
                            if (this.direction === Stack.RIGHT) {
                                x += this.children[i].width + this.offset.x;
                            }
                            break;

                        //TODO : gérer plusieurs colonnes en vertical, comme pour l'horizontal (caseJ)
                        case Stack.VERTICAL:
                            if (counter === 0) {
                                y = this.children[i].height * -this.anchor.y;
                            } else if (this.direction == Stack.TOP) {
                                y -= this.children[i].height + this.offset.y;
                            }

                            x = (this.children[i].width + this.offset.x) * (1 - this.anchor.x * 2);
                            Manager.moveTo(this.children[i], {x: x, y: y}, this.game);
                            if (this.direction === Stack.BOTTOM) {
                                y += this.children[i].height + this.offset.y;
                            }
                            break;
                        default:
                            break;
                    }
                    counter++;
                }
            }
        };
        //permet de créer des groupes de pile dans une pile
        reorganize((modal) => modal.params.fixeMe === true);
        reorganize((modal) => !Type.isBoolean(modal.params.fixeMe) || !modal.params.fixeMe);
    }

    static get VERTICAL() {
        return true
    }

    static get HORIZONTAL() {
        return false
    }

    static get BOTTOM() {
        return 'BOTTOM'
    }

    static get LEFT() {
        return 'LEFT'
    }

    static get TOP() {
        return 'TOP'
    }

    static get RIGHT() {
        return 'RIGHT'
    }

    static get ASC() {
        return 1
    }

    static get DESC() {
        return -1
    }
}

/** Modal Stack Manager Strategy */
export class StackManager extends Manager {
    constructor(game, debug) {
        super(game);
        this.debug = debug;
        this.stacks = {
            BOTTOM_LEFT: new Stack(
                20,
                this.game.canvas.height,
                this.game,
                {axe: Stack.HORIZONTAL, direction: Stack.RIGHT, offsetX: 32, offsetY: 5, anchorY: 1}),
            BOTTOM_RIGHT: new Stack(
                this.game.canvas.width - 10,
                this.game.canvas.height - 10,
                this.game,
                {axe: Stack.VERTICAL, direction: Stack.TOP, anchorX: 1, anchorY: 1})
        };
    }

    /** Controls */
    _add(modal, stack) {
        if (Type.isString(stack))
            this.stacks[stack].add(modal);
        else if (Type.isInstanceOf(stack, Stack))
            stack.add(modal);
        super.show(modal);
    }

    _del(modal, stack) {
        super.hide(modal, false, () => {
            if (Type.isString(stack))
                this.stacks[stack].remove(modal);
            else if (Type.isInstanceOf(stack, Stack))
                stack.remove(modal);
        });
    }

    /** Toggle Show / Hide modal */
    toggle(visible, modal, params) {
        visible ? this._add(modal, params.stack) : this._del(modal, params.stack);
    }
}

/** Default Modal Manager Strategy */
export class DefaultManager extends Manager {

    blackBackground;

    constructor(game, debug) {
        super(game);
        this.debug = debug;

        const rect = game.add.graphics(0, 0);
        rect.beginFill(0x000000, 0.75);
        rect.drawRect(0, 0, game.canvas.width, game.canvas.height);
        rect.endFill();
        this.blackBackground = new Phaser.Group(game);
        this.blackBackground.fixedToCamera = true;
        this.blackBackground.add(rect);
        this.game.layer.zDepthOverAll.add(this.blackBackground);
    }

    /** Controls */
    _add(modal, params) {
        modal.fixedToCameraDefault = modal.fixedToCamera;
        modal.fixedToCamera = true;
        modal.cameraOffset.setTo(
            this.game.canvas.width * 0.5 - modal.width * 0.5,
            this.game.canvas.height * 0.5 - modal.height * 0.5
        );
        if (params.controls) {
            //hide on click next of the modal
            this.blackBackground.forEach((elt) => {
                elt.inputEnabled = true;
                elt.events.onInputDown.addOnce((rect, pointer) => {
                    if (pointer.x < modal.x || pointer.x > modal.x + modal.width ||
                        pointer.y < modal.y || pointer.y > modal.y + modal.height) {
                        this._del(modal);
                    }
                }, modal);
            });
        }
        if(params.light === undefined || params.light === false) {
            super.show(this.blackBackground)
        }
        super.show(modal, this.game.world);
    }

    _del(modal) {
        modal.fixedToCamera = modal.fixedToCameraDefault;
        this.blackBackground.forEach((elt) => {
            elt.events.onInputDown.removeAll(modal);
        });
        super.hide(this.blackBackground);
        super.hide(modal);
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
        if (Type.isBoolean(visible) ? !visible : true) {
            this.alpha = 1;
            this.visible = false;
        }
        this.items = {};
        this.generateItems(data);
    }

    setX(x) {
        this.x = this.game.uiScale(x)
    }

    setY(y) {
        this.y = this.game.uiScale(y)
    }

    /**
     * Generate items or group
     * @param data
     */
    generateItems(data) {
        if (data.type === 'group' && data.items) {
            for (let key in data.items) {
                if (data.items[key].type === 'group') {
                    const visible = Type.isBoolean(data.items[key].visible) ? data.items[key].visible : true;
                    const nestedGroup = new Factory(data.items[key], this.game, visible);
                    if (Type.isNumber(data.items[key].x))
                        nestedGroup.setX(data.items[key].x);
                    if (Type.isNumber(data.items[key].y))
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
        switch (data.type) {
            case 'text':
                item = new Text(this.game, data.x, data.y, data.text, data.style, data.props);
                break;
            case 'sprite':
                item = new Sprite(this.game, data.x, data.y, data.key, data.style, data.props);
                break;
            case 'button':
                item = new Button(this.game, data.x, data.y, data.overFrame || null,
                    data.outFrame || null, data.downFrame || null, data.upFrame || null, data.props);
                break;
        }
        if (item) {
            this.add(item);
            this.items[key] = item;
        }
    }
}


/** Abstract Modal (parent for all gameModals) */
export default class Modal extends Factory {

    onShow = new Phaser.Signal();
    onHide = new Phaser.Signal();
    onDeleted = new Phaser.Signal();
    beforeDelete = new Phaser.Signal();

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
        this.params = {fixed: false, fixeMe: null, context: null};
        this.onHide.addOnce(this.delete, this);
    }

    delete() {
        this.beforeDelete.dispatch();
        this.items = {}; //on supprime les références
        this.destroy(true); //on supprime les objets réels
        this.onDeleted.dispatch();
    }

    /**
     * Manager Strategy
     * @param visible
     * @param params (fixed|controls)
     * @param cb
     */
    toggle(visible, params = {}, cb) {
        this.params.context = Type.isExist(params.context) ? params.context : null;
        this.params.fixeMe = Type.isBoolean(params.fixed) ? params.fixed : null;
        this.manager.toggle(visible, this, params, cb);
    }
};