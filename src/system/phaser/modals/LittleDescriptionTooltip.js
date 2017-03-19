"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';

/** Small Description Tooltip Modal */
export default class LittleDescriptionTooltip extends Modal {

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
        super(Type.deepMerge(LittleDescriptionTooltip.pattern, data), manager, game);
        this.m = materialModal;
        this.offsetY = 0;
        this.state = {
            button: false,
            amount: false
        };
    }
    setTop() { this.items.bg.loadTexture('atlas', 'modal/bg/small_tooltip_top'); this.offsetY = -3; this._refresh() }
    setBottom() { this.items.bg.loadTexture('atlas', 'modal/bg/small_tooltip_bottom'); this.offsetY = 9; this._refresh() }
    _refresh() {
        if(this.state.button) {
            this.items.useButton.y = this.m.getAlignCenterY(this.items.bg, this.items.useButton)
                + this.game.uiScale(this.offsetY);
            this.items.name.setX(14);
            this.items.amount.setX(14);
        } else {
            this.items.name.x = this.m.getAlignCenterX(this.items.bg, this.items.name);
        }
        if(this.state.amount) {
            this.items.name.y = this.m.getAlignCenterY(this.items.bg, this.items.name)
                + this.game.uiScale(this.offsetY-10);
            this.items.amount.y = this.m.getAlignCenterY(this.items.bg, this.items.name)
                + this.game.uiScale(this.offsetY+10);
            if(!this.state.button) {
                this.items.name.setX(20);
                this.items.amount.setX(20);
            }
        } else {
            this.items.name.y = this.m.getAlignCenterY(this.items.bg, this.items.name) + this.game.uiScale(this.offsetY);
        }
    }

    setButtons(buttons = {a:true, e:true}) {
        this.items.useButton.items.a.visible = buttons.a;
        this.items.useButton.items.e.visible = buttons.e;
        let y = 0;
        for (let item in this.items.useButton.items) {
            this.items.useButton.items[item].setY(y);
            if(this.items.useButton.items[item].visible) y += 25;
        }
        this.items.useButton.y = this.m.getAlignCenterY(this.items.bg, this.items.useButton)
            + this.game.uiScale(this.offsetY);
        this.items.name.setX(14);
        this.items.amount.setX(14);
        this.items.useButton.visible = true;
        this.state.button = true;
    }
    delButtons() {
        this.items.useButton.visible = false;
        if(!this.state.amount) this.items.name.setX(this.m.getAlignCenterX(this.items.bg, this.items.name));
        else {
            this.items.name.setX(20);
            this.items.amount.setX(20);
        }
        this.state.button = false;
    }
    setAmount(amount) {
        if(amount <= 0) { this.delAmount(); return;}
        this.items.name.y = this.m.getAlignCenterY(this.items.bg, this.items.name)
            + this.game.uiScale(this.offsetY-10);
        this.items.amount.y = this.m.getAlignCenterY(this.items.bg, this.items.name)
            + this.game.uiScale(this.offsetY+10);
        if(!this.state.button) {
            this.items.name.setX(20);
            this.items.amount.setX(20);
        }
        this.items.amount.text = `x${amount}`;
        this.items.amount.visible = true;
        this.state.amount = true;
    }
    delAmount() {
        this.items.amount.visible = false;
        this.items.name.y = this.m.getAlignCenterY(this.items.bg, this.items.name) + this.game.uiScale(this.offsetY);
        if(!this.state.button)
            this.items.name.x = this.m.getAlignCenterX(this.items.bg, this.items.name);
        this.state.amount = false;
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/small_tooltip_top"
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
                            key: "modal/item/button_a",
                            props: { scale: 0.4 }
                        },
                        e: {
                            type: "sprite",
                            y: 25,
                            key: "modal/item/button_e",
                            props: { scale: 0.4 }
                        }
                    }
                }
            }
        }
    }
};