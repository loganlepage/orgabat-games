"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';

/** Small Description Tooltip Modal */
export default class SmallDescriptionTooltip extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param materialModal
     * @param game
     */
    constructor(data, manager, materialModal, game) {
        try {
            Type.isExist(data.items, true);
            Type.isExist(data.items.name, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(Type.deepMerge(SmallDescriptionTooltip.pattern, data), manager, game);
        this.m = materialModal;
        this.offsetY = 0;
        this.state = {
            button: false,
            amount: false
        }
    }

    setTop() { this.items.bg.loadTexture(`small_tooltip_top`); this.offsetY = -3; this._refresh() }
    setBottom() { this.items.bg.loadTexture(`small_tooltip_bottom`); this.offsetY = 9; this._refresh() }
    _refresh() {
        if(this.state.button) {
            this.items.useButton.y = this.m.getAlignCenterY(this.items.bg, this.items.useButton) + this.offsetY;
            this.items.name.x = this.items.amount.x = 14;
        }
        if(this.state.amount) {
            this.items.name.y =   this.m.getAlignCenterY(this.items.bg, this.items.name) + (this.offsetY-10);
            this.items.amount.y = this.m.getAlignCenterY(this.items.bg, this.items.name) + (this.offsetY+10);
            if(!this.state.button) this.items.name.x = this.items.amount.x = 20;
        }
    }

    setButtons(buttons = {a:true, e:true}) {
        this.items.useButton.items.a.visible = buttons.a;
        this.items.useButton.items.e.visible = buttons.e;
        let y = 0;
        for (let item in this.items.useButton.items) {
            this.items.useButton.items[item].y = y;
            if(this.items.useButton.items[item].visible) y += 25;
        }
        this.items.useButton.y = this.m.getAlignCenterY(this.items.bg, this.items.useButton) + this.offsetY;
        this.items.name.x = this.items.amount.x = 14;
        this.items.useButton.visible = true;
        this.state.button = true;
    }
    delButtons() {
        this.items.useButton.visible = false;
        if(!this.state.amount) this.items.name.x = this.m.getAlignCenterX(this.items.bg, this.items.name);
        else this.items.name.x = this.items.amount.x = 20;
        this.state.button = false;
    }
    setAmount(amount) {
        if(amount <= 0) { this.delAmount(); return;}
        this.items.name.y =   this.m.getAlignCenterY(this.items.bg, this.items.name) + (this.offsetY-10);
        this.items.amount.y = this.m.getAlignCenterY(this.items.bg, this.items.name) + (this.offsetY+10);
        if(!this.state.button) this.items.name.x = this.items.amount.x = 20;
        this.items.amount.text = `x${amount}`;
        this.items.amount.visible = true;
        this.state.amount = true;
    }
    delAmount() {
        this.items.amount.visible = false;
        this.items.name.y = this.m.getAlignCenterY(this.items.bg, this.items.name) + this.offsetY;
        if(!this.state.button) this.items.name.x = this.m.getAlignCenterX(this.items.bg, this.items.name);
        this.state.amount = false;
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "small_tooltip_top"
                },
                name: {
                    type: "text",
                    text: "{name}",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14
                    }
                },
                amount: {
                    type: "text",
                    y: 20,
                    text: "{amount}",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14
                    },
                    props: { visible: false }
                },
                useButton: {
                    type: "group",
                    x: 90,
                    visible: false,
                    items: {
                        a: {
                            type: "sprite",
                            x: 0,
                            y: 0,
                            key: "bouton_a",
                            props: { scale: 0.6 }
                        },
                        e: {
                            type: "sprite",
                            x: 0,
                            y: 25,
                            key: "bouton_e",
                            props: { scale: 0.6 }
                        }
                    }
                }
            }
        }
    }
};