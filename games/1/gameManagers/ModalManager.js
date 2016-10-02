"use strict";
var Game = Game || {};
Game.Manager = Game.Manager || {};

/**
 * Constructor for a new modalManager (called by play state)
 */
Game.Manager.ModalManager = class ModalManager {
    constructor(game) {
        this.modal = new Game.Vendor.Modal(game);
        this.isShowing = {};
        this.createModals();
    }

    /**
     * Management methods
     */
    show(name, fixed) {
        if(fixed === undefined) fixed = false;
        if(this.isShowing[name] !== undefined && this.isShowing[name].state) return;
        for(let modal in this.isShowing)
            if(this.isShowing[modal].state && !this.isShowing[modal].fixed) {
                this.modal.hideModal(modal);
                this.isShowing[modal].state = false;
            }
        this.modal.showModal(name);
        this.isShowing[name] = {state: true, fixed: fixed};
    }
    hide(name) {
        if((this.isShowing[name] !== undefined && !this.isShowing[name].state) || this.isShowing[name] === undefined) return;
        this.modal.hideModal(name);
        this.isShowing[name].state = false;
    }
    update(value, type, index) {
        this.modal.updateModalValue(value, type, index);
    }
    count(duration, callback) {
        let _timer = game.time.create(false);
        _timer.start();
        _timer.onComplete.add(callback);
        _timer.repeat(Phaser.Timer.SECOND, duration, function(){}, this);
    }
    createWithPattern(type, name) {
        let pattern = ModalManager.patterns()[type];
        pattern.type = pattern.type + "_" + name;
        this.modal.createModal(pattern);
    }
    static patterns() {
        return {
            "big_infobulle": {
                type: "big_infobulle",
                includeBackground: false,
                fixedToCamera: false,
                vCenter: false,
                hCenter: false,
                itemsArr: [
                    {
                        type: "image",
                        content: "big_infobulle_right",
                        contentScale: Game.SCALE
                    },
                    {
                        type: "text",
                        content: "{title}",
                        fontFamily: "Arial",
                        fontSize: 28 * Game.SCALE,
                        color: "0x5F4D21",
                        offsetY: 25 * Game.SCALE,
                        offsetX: 40 * Game.SCALE,
                    },
                    {
                        type: "text",
                        content: "{content}",
                        fontFamily: "Arial",
                        fontSize: 14 * Game.SCALE,
                        color: "0x5F4D21",
                        offsetY: 85 * Game.SCALE,
                        offsetX: 40 * Game.SCALE,
                        align: "left"
                    },
                    {
                        type: "image",
                        content: "bouton_a",
                        contentScale: Game.SCALE / 2,
                        offsetY: 130 * Game.SCALE,
                        offsetX: 265 * Game.SCALE
                    },
                    {
                        type: "text",
                        content: "utiliser",
                        fontFamily: "Arial",
                        fontSize: 12 * Game.SCALE,
                        color: "0x5F4D21",
                        offsetY: 132 * Game.SCALE,
                        offsetX: 289 * Game.SCALE
                    }
                ]
            },
            "small_infobulle": {
                type: "small_infobulle",
                includeBackground: false,
                fixedToCamera: false,
                vCenter: false,
                hCenter: false,
                itemsArr: [
                    {
                        type: "image",
                        content: "small_infobulle_top",
                        contentScale: Game.SCALE
                    },
                    {
                        type: "text",
                        content: "{name}",
                        fontFamily: "Arial",
                        fontSize: 14 * Game.SCALE,
                        color: "0x5F4D21",
                        offsetY: 25 * Game.SCALE
                    },
                    {
                        type: "text",
                        content: "",
                        fontFamily: "Arial",
                        fontSize: 14 * Game.SCALE,
                        color: "0x5F4D21",
                        offsetY: 25 * Game.SCALE
                    },
                    {
                        type: "image",
                        content: "bouton_a",
                        contentScale: Game.SCALE * (2/3)
                    },
                    {
                        type: "image",
                        content: "bouton_e",
                        contentScale: Game.SCALE * (2/3)
                    }
                ]
            }
        }
    };

    /**
     * Modal patterns
     */
    createModals() {
        this.modal.createModal({
            type:"robot_infobulle",
            includeBackground: false,
            fixedToCamera: true,
            vCenter: false,
            hCenter: false,
            itemsArr: [
                {
                    type: "image",
                    content: "info_infobulle",
                    contentScale: Game.SCALE
                },
                {
                    type: "text",
                    content: "{content}",
                    fontFamily: "Arial",
                    fontSize: 12 * Game.SCALE,
                    color: "0x5F4D21",
                    offsetY: 35 * Game.SCALE,
                    offsetX: 85 * Game.SCALE
                },
                {
                    type : "text",
                    content: "X",
                    fontSize: 12 * Game.SCALE,
                    color: "0x5F4D21",
                    offsetY: 10 * Game.SCALE,
                    offsetX: 272 * Game.SCALE,
                    callback: function(){
                        this.modal.hideModal("robot_infobulle");
                    }
                }
            ]
        });
        this.modal.createModal({
            type:"modal5",
            includeBackground: false,
            modalCloseOnInput: true,
            fixedToCamera: true,
            itemsArr: [
                {
                    type: "image",
                    content: "modalBG",
                    offsetY: 0,
                    contentScale: Game.SCALE
                },
                {
                    type : "text",
                    content: "X",
                    fontSize: 46 * Game.SCALE,
                    color: "0x000000",
                    offsetY: -110 * Game.SCALE,
                    offsetX: 230 * Game.SCALE,
                    callback() {
                        Game.modals.modal.hideModal("modal5");
                    }
                },
                {
                    type: "text",
                    content: "{title}",
                    fontFamily: "Arial",
                    fontSize: 42 * Game.SCALE,
                    color: "0x5F4D21",
                    offsetY: -70 * Game.SCALE
                },
                {
                    type: "text",
                    content: "{content}",
                    fontFamily: "Arial",
                    fontSize: 26 * Game.SCALE,
                    color: "0x5F4D21",
                    offsetY: 30 * Game.SCALE,
                    textAlign: "right"
                }
            ]
        });
    }
};