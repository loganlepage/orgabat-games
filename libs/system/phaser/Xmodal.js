"use strict";
var MyPhaser = MyPhaser || {};

/** Make a image item for modal */
class ImageModal extends Phaser.Image {
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
            Utils.Type.isExist(game, true);
            Utils.Type.isNumber(x, true);
            Utils.Type.isNumber(y, true);
            Utils.Type.isString(key, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(game, game.modalScale(x), game.modalScale(y), key);
        props.scale = Utils.Type.isNumber(props.scale) ? game.modalScale(props.scale) : game.modalScale(1);
        this.scale.setTo(props.scale);
    }
}

/** Make a text item for modal */
class TextModal extends Phaser.Text {
    /**
     * Constructor for a new Text item
     * @param game
     * @param x
     * @param y
     * @param text
     * @param style
     */
    constructor(game, x, y, text, style) {
        try {
            Utils.Type.isExist(game, true);
            Utils.Type.isNumber(x, true);
            Utils.Type.isNumber(y, true);
            Utils.Type.isString(text, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        style = Utils.Type.isExist(style) ? style : {};
        if(style.fontSize) style.fontSize = game.modalScale(style.fontSize);

        super(game, game.modalScale(x), game.modalScale(y), text, style);
    }
}

/**
 * Modal Manager Strategy
 * @type {XmodalManager}
 */
MyPhaser.XmodalManager = class XmodalManager {

    /**
     * Constructor for a new manager
     * @param game
     * @param debug
     */
    constructor(game, debug) {
        this.game = game;
        this.fixed = false;
        this.debug = debug;
    }

    static getInstance(game, debug) {
        if (!Utils.Type.isExist(this.instance))
            this.instance = new this(game, debug);
        return this.instance;
    }

    /** Model */

    /**
     * Get current modale
     * @returns {*}
     */
    get current() { return this._current }

    /**
     * Set current modale
     * @param modal
     */
    set current(modal) {
        /** Hide old and Show new */
        if(Utils.Type.isExist(modal)) {
            try { Utils.Type.isInstanceOf(modal, MyPhaser.Xmodal, true);
            } catch (e) { console.error(e.name + ": " + e.message); }
            if(this.current !== modal) {
                if(Utils.Type.isExist(this.current)) this.current = null;
                this._current = modal;
                this._show();
            }
        /** Hide old */
        } else if(Utils.Type.isExist(this.current)) {
            this._hide();
            this._current = null;
        }
    }


    /** View */

    /**
     * Show modal view
     * @private
     */
    _show() {
        try { Utils.Type.isExist(this.current, true);
        } catch (e) { console.error(e.name + ": " + e.message); }
        const modal = this.current; // Prevent change during an animation
        this.game.world.bringToTop(modal);
        modal.visible = true;
        modal.alpha = 0;
        this.game.add.tween(modal).to({alpha:1}, 100, Phaser.Easing.Linear.None, true);
    }

    /**
     * Hide modal view
     * @private
     */
    _hide() {
        try { Utils.Type.isExist(this.current, true);
        } catch (e) { console.error(e.name + ": " + e.message); }
        const modal = this.current; // Prevent change during an animation
        modal.alpha = 1;
        this.game.add.tween(modal).to({alpha:0}, 100, Phaser.Easing.Linear.None, true)
            .onComplete.add(() => modal.visible = false, this);
    }


    /** Controller */

    /**
     * Show modal action
     * @param modal
     * @param params
     */
    show(modal, params) {
        try { Utils.Type.isInstanceOf(modal, MyPhaser.Xmodal, true); }
        catch (e) { console.error(e.name + ": " + e.message); }
        this._toggle('show', params, modal);
    }

    /**
     * Hide modal action
     * @param params
     */
    hide(params) {
        this._toggle('hide', params, null);
    }

    /**
     * Toggle Show / Hide modal
     * @param action (show|hide)
     * @param params
     * @param modal
     * @private
     */
    _toggle(action, params, modal) {
        try {
            !Utils.Type.isExist(params) || Utils.Type.isObject(params, true);
            !Utils.Type.isExist(params.fixed) || Utils.Type.isBoolean(params.fixed, true)
        } catch (e) { console.error(e.name + ": " + e.message); }
        params = Utils.Type.isExist(params) ? params : {};
        params.fixed = Utils.Type.isExist(params.fixed) ? params.fixed : false;

        if(this.debug) console.log(`${action}: { old: ${this.fixed}, new: ${params.fixed} }`);
        if(params.fixed) {
            this.fixed = action === 'show' ? params.fixed : false;
            this.current = modal;
        } else if(!this.fixed) {
            this.current = modal;
        }
    }
};

/**
 * Multiple Singleton
 * @type {XmodalManagerControls}
 */
MyPhaser.XmodalManagerControls = class XmodalManagerControls {
    static getInstance(scope) {
        let index = this.instances.map((xmc) => xmc.scope).indexOf(scope);
        if (index === -1)
            this.instances[this.instances.length] = new XmodalManagerControls(scope);
        return this.instances[index >= 0 ? index : this.instances.length];
    }
};
/** Static properties */
Object.assign(MyPhaser.XmodalManagerControls, {
    instances: []
});
MyPhaser.XmodalManagerControlsTest = class XmodalManagerControlsTest {
    constructor() {

    }
};

/**
 * Modal factory
 * @type {XmodalFactory}
 */
MyPhaser.XmodalFactory = class XmodalFactory extends Phaser.Group {
    /**
     * Constructor for a new modal group (nestable)
     * @param data
     * @param game
     * @param visible
     */
    constructor(data, game, visible) {
        super(game);
        if(Utils.Type.isBoolean(visible) ? !visible : true) {
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
                    const visible = Utils.Type.isBoolean(data.items[key].visible) ? data.items[key].visible : true;
                    const nestedGroup = new XmodalFactory(data.items[key], this.game, visible);
                    if(Utils.Type.isNumber(data.items[key].x)) nestedGroup.x = this.game.modalScale(data.items[key].x);
                    if(Utils.Type.isNumber(data.items[key].y)) nestedGroup.y = this.game.modalScale(data.items[key].y);
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
                item = new TextModal(this.game, data.x || 0, data.y || 0, data.text, data.style);
                break;
            case 'image':
                item = new ImageModal(this.game, data.x || 0, data.y || 0, data.key, data.props);
                break;
        }
        if(item) {
            this.add(item);
            this.items[key] = item;
        }
    }
};

/**
 * Abstract Xmodal (parent for all gameModals)
 * @type {Xmodal}
 */
MyPhaser.Xmodal = class Xmodal extends MyPhaser.XmodalFactory {
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
    }

    /**
     * Manager Strategy
     * @param visible
     * @param params (ex: fixed)
     */
    toggle(visible, params) {
        if(visible) this.manager.show(this, params);
        else this.manager.hide(params);
    }
};