//"use strict";
//
///** Modal Manager */
//export default class Modal {
//
//    /**
//     * Constructor for a new modal manager
//     * @param game
//     */
//    constructor(game) {
//        this.game.Manager.ModalScale = this.game.SCALE * 0.9;
//        game.modalScale = (n) => Utils.Math.scale(this.game.Manager.ModalScale, n);
//        this.game = game;
//        this.modal = new this.game.Vendor.Modal(game);
//        this.modals = {};
//        this.createModals();
//    }
//
//    /** Management methods */
//    show(name, fixed) {
//        if(fixed === undefined) fixed = false;
//        if(this.modals[name] !== undefined && this.modals[name].state) return;
//        for(let name in this.modals)
//            if(this.modals[name].state && !this.modals[name].fixed) {
//                this.modal.hideModal(name);
//                this.modals[name].state = false;
//            }
//        this.modal.showModal(name);
//        this.modals[name] = {state: true, fixed: fixed};
//    }
//    infoboxAreHided() {
//        let hided = true;
//        for(let name in this.modals)
//            if(this.modals[name].state && !this.modals[name].fixed)
//                hided = false;
//        return hided;
//    }
//    isShowing(name) {
//        if(this.modals[name] === undefined) return false;
//        return this.modals[name].state;
//    }
//    hide(name) {
//        if((this.modals[name] !== undefined && !this.modals[name].state) || this.modals[name] === undefined) return;
//        this.modal.hideModal(name);
//        this.modals[name].state = false;
//    }
//    update(value, type, index) {
//        this.modal.updateModalValue(value, type, index);
//    }
//    count(duration, callback) {
//        let timer = this.game.time.create(false);
//        timer.start();
//        timer.onComplete.add(callback);
//        timer.repeat(Phaser.Timer.SECOND, duration, function(){}, this);
//    }
//    createWithPattern(type, name) {
//        let pattern = Modal.patterns()[type];
//        pattern.type = pattern.type + "_" + name;
//        this.modal.createModal(pattern);
//    }
//    static patterns() {
//        return {
//            "big_infobulle": {
//                type: "big_infobulle",
//                includeBackground: false,
//                fixedToCamera: false,
//                vCenter: false,
//                hCenter: false,
//                itemsArr: [
//                    {
//                        type: "image",
//                        content: "big_infobulle_right",
//                        contentScale: this.game.Manager.ModalScale,
//                    },
//                    {
//                        type: "text",
//                        content: "{title}",
//                        fontFamily: "Arial",
//                        fontSize: 28 * this.game.Manager.ModalScale,
//                        color: "0x5F4D21",
//                        offsetY: 25 * this.game.Manager.ModalScale,
//                        offsetX: 40 * this.game.Manager.ModalScale,
//                    },
//                    {
//                        type: "text",
//                        content: "{content}",
//                        fontFamily: "Arial",
//                        fontSize: 14 * this.game.Manager.ModalScale,
//                        color: "0x5F4D21",
//                        offsetY: 85 * this.game.Manager.ModalScale,
//                        offsetX: 40 * this.game.Manager.ModalScale,
//                        align: "left"
//                    },
//                    {
//                        type: "image",
//                        content: "bouton_a",
//                        contentScale: this.game.Manager.ModalScale * 0.6,
//                        offsetY: 129 * this.game.Manager.ModalScale,
//                        offsetX: 263 * this.game.Manager.ModalScale
//                    },
//                    {
//                        type: "text",
//                        content: "utiliser",
//                        fontFamily: "Arial",
//                        fontSize: 12 * this.game.Manager.ModalScale,
//                        color: "0x5F4D21",
//                        offsetY: 132 * this.game.Manager.ModalScale,
//                        offsetX: 289 * this.game.Manager.ModalScale
//                    }
//                ]
//            },
//            "small_infobulle": {
//                type: "small_infobulle",
//                includeBackground: false,
//                fixedToCamera: false,
//                vCenter: false,
//                hCenter: false,
//                itemsArr: [
//                    {
//                        type: "image",
//                        content: "small_infobulle_top",
//                        contentScale: this.game.Manager.ModalScale
//                    },
//                    {
//                        type: "text",
//                        content: "{name}",
//                        fontFamily: "Arial",
//                        fontSize: 14 * this.game.Manager.ModalScale,
//                        color: "0x5F4D21",
//                        offsetY: 25 * this.game.Manager.ModalScale
//                    },
//                    {
//                        type: "text",
//                        content: "",
//                        fontFamily: "Arial",
//                        fontSize: 14 * this.game.Manager.ModalScale,
//                        color: "0x5F4D21",
//                        offsetY: 25 * this.game.Manager.ModalScale
//                    },
//                    {
//                        type: "image",
//                        content: "bouton_a",
//                        contentScale: this.game.Manager.ModalScale * (2/3)
//                    },
//                    {
//                        type: "image",
//                        content: "bouton_e",
//                        contentScale: this.game.Manager.ModalScale * (2/3)
//                    }
//                ]
//            },
//            "left_robot_infobulle": {
//                type:"left_robot_infobulle",
//                includeBackground: false,
//                fixedToCamera: true,
//                vCenter: false,
//                hCenter: false,
//                itemsArr: [
//                    {
//                        type: "image",
//                        content: "small_info_infobulle",
//                        contentScale: this.game.Manager.ModalScale
//                    },
//                    {
//                        type: "text",
//                        content: "{content}",
//                        fontFamily: "Arial",
//                        fontSize: 12 * this.game.Manager.ModalScale,
//                        color: "0x5F4D21",
//                        offsetY: 20 * this.game.Manager.ModalScale,
//                        offsetX: 55 * this.game.Manager.ModalScale
//                    },
//                    {
//                        type : "text",
//                        content: "X",
//                        fontSize: 12 * this.game.Manager.ModalScale,
//                        color: "0x5F4D21",
//                        offsetY: 10 * this.game.Manager.ModalScale,
//                        offsetX: 182 * this.game.Manager.ModalScale,
//                        callback: function() {
//                            this.game.modals.modal.hideModal(this.type);
//                        }
//                    },
//                    {
//                        type: "image",
//                        content: "bouton_z",
//                        contentScale: this.game.Manager.ModalScale,
//                        offsetY: 10 * this.game.Manager.ModalScale,
//                        offsetX: 10 * this.game.Manager.ModalScale
//                    },
//                ]
//            }
//        }
//    };
//
//    /**
//     * Modal patterns
//     */
//    createModals() {
//        this.modal.createModal({
//            type:"robot_infobulle",
//            includeBackground: false,
//            fixedToCamera: true,
//            vCenter: false,
//            hCenter: false,
//            itemsArr: [
//                {
//                    type: "image",
//                    content: "info_infobulle",
//                    contentScale: this.game.Manager.ModalScale
//                },
//                {
//                    type: "text",
//                    content: "{content}",
//                    fontFamily: "Arial",
//                    fontSize: 12 * this.game.Manager.ModalScale,
//                    color: "0x5F4D21",
//                    offsetY: 35 * this.game.Manager.ModalScale,
//                    offsetX: 85 * this.game.Manager.ModalScale
//                },
//                {
//                    type : "text",
//                    content: "X",
//                    fontSize: 12 * this.game.Manager.ModalScale,
//                    color: "0x5F4D21",
//                    offsetY: 10 * this.game.Manager.ModalScale,
//                    offsetX: 272 * this.game.Manager.ModalScale,
//                    callback: () => {
//                        this.modal.hideModal("robot_infobulle");
//                    }
//                }
//            ]
//        });
//        this.modal.createModal({
//            type:"modal5",
//            includeBackground: false,
//            modalCloseOnInput: true,
//            fixedToCamera: true,
//            itemsArr: [
//                {
//                    type: "image",
//                    content: "modalBG",
//                    offsetY: 0,
//                    contentScale: this.game.Manager.ModalScale
//                },
//                {
//                    type : "text",
//                    content: "X",
//                    fontSize: 46 * this.game.Manager.ModalScale,
//                    color: "0x000000",
//                    offsetY: -110 * this.game.Manager.ModalScale,
//                    offsetX: 230 * this.game.Manager.ModalScale,
//                    callback() {
//                        this.game.modals.modal.hideModal("modal5");
//                    }
//                },
//                {
//                    type: "text",
//                    content: "{title}",
//                    fontFamily: "Arial",
//                    fontSize: 42 * this.game.Manager.ModalScale,
//                    color: "0x5F4D21",
//                    offsetY: -70 * this.game.Manager.ModalScale
//                },
//                {
//                    type: "text",
//                    content: "{content}",
//                    fontFamily: "Arial",
//                    fontSize: 26 * this.game.Manager.ModalScale,
//                    color: "0x5F4D21",
//                    offsetY: 30 * this.game.Manager.ModalScale,
//                    textAlign: "right"
//                }
//            ]
//        });
//    }
//};