"use strict";
import Type from "system/utils/Type";
import Modal, {Stack, StackManager} from "system/phaser/Modal";
import InventaryItemModal from "./InventaryItemModal";
import Config from "../config/data";
import {Keyboard, Signal} from "phaser";


/** Description Tooltip Modal */
export default class InventaryModal extends Modal {

    onInventaryClick = new Signal();
    onEquippedClick = new Signal();

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param equipped
     * @param game
     */
    constructor(data, manager, equipped, game) {
        super(Type.deepMerge(InventaryModal.pattern, data), manager, game);

        //Initialisation de notre inventaire équipé
        this.items.equipped = new Stack(
            this.game.uiScale(25), this.game.uiScale(115), this.game,
            {axe: Stack.HORIZONTAL, direction: Stack.RIGHT, offsetX: this.game.uiScale(10), offsetY: this.game.uiScale(5)}
        );
        this.add(this.items.equipped);

        //Initialisation de notre inventaire non équipé
        this.items.inventary = new Stack(
            this.game.uiScale(25), this.game.uiScale(210), this.game,
            {axe: Stack.HORIZONTAL, direction: Stack.RIGHT, offsetX: this.game.uiScale(10), offsetY: this.game.uiScale(6), maxGridSize: 5}
        );
        this.add(this.items.inventary);

        //Ajout du stuff équipé
        equipped.forEach((epi) => {
            const modal = new InventaryItemModal(epi.data, StackManager, this.game);
            modal.toggle(true, {stack: this.items.equipped});
            modal.onClick.add((action) => this.onEquippedClick.dispatch(action), this);
        });

        //Ajout du stuff non équipé
        Config.entities.epi.forEach((epi) => {
            const modal = new InventaryItemModal(epi, StackManager, this.game);
            modal.toggle(true, {stack: this.items.inventary});
            modal.onClick.add((action) => this.onInventaryClick.dispatch(action), this);
        });

        //Events
        this.items.close.events.onInputDown.addOnce(()=>{this.toggle(false);}, this);
        this.game.keys.addKey(Keyboard.ENTER).onDown.addOnce(()=>{this.toggle(false);}, this);
        this.game.keys.addKey(Keyboard.ESC).onDown.addOnce(()=>{this.toggle(false);}, this);

        this.beforeDelete.addOnce(()=> {
            this.items.close.events.onInputDown.removeAll(this);
            this.game.keys.addKey(Keyboard.ENTER).onDown.removeAll(this);
            this.game.keys.addKey(Keyboard.ESC).onDown.removeAll(this);
            this.game.canvas.style.cursor = "default";
            this.items.equipped.forEach((epi)=>epi.delete());
            this.items.inventary.forEach((epi)=>epi.delete());
        });
    }

    addStuff(stuff) {
        const modal = new InventaryItemModal(stuff.data, StackManager, this.game);
        modal.toggle(true, {stack: this.items.equipped});
        modal.onClick.add((action) => this.onEquippedClick.dispatch(action), this);
    }

    delStuff(item) {
        this.items.equipped.forEach((stuff) => {
            if(item.data.name === stuff.data.name) {
                this.items.equipped.remove(stuff);
                stuff.delete();
                this.game.canvas.style.cursor = "default";
            }
        });
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/big_modal"
                },
                title: {
                    type: "text",
                    y: 50,
                    x: 30,
                    text: "Équipement de Protection Individuelle",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 18
                    }
                },
                equippedLabel: {
                    type: "text",
                    y: 90,
                    x: 30,
                    text: "Sur soi",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14,
                    }
                },
                equippableLabel: {
                    type: "text",
                    y: 185,
                    x: 30,
                    text: "Dans le coffre",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14,
                    }
                },
                close: {
                    type: "button",
                    key: "modal/item/button_close",
                    overFrame: "modal/item/button_close.0",
                    outFrame: "modal/item/button_close.1",
                    downFrame: "modal/item/button_close.2",
                    x: 400,
                    y: 25,
                    props: { scale: 0.8 }
                },
            }
        }
    }
};