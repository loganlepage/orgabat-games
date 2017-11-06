"use strict";
import Type from "system/utils/Type";
import Modal, {Stack, StackManager} from "system/phaser/Modal";
import WasteActionModal from "./WasteActionModal";
import Config from "../config/data";
import {Keyboard, Signal} from "phaser";


/** Description Tooltip Modal */
export default class WasteModal extends Modal {

    onActionClick = new Signal();
    obj;

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param type
     * @param game
     */
    constructor(data, manager, obj, game) {
        super(Type.deepMerge(WasteModal.pattern, data), manager, game);
        this.obj = obj;

        this.items.description.x = this.items.bg.width - this.items.description.width - game.uiScale(30) + 20;

        //Initialisation de la barre d'action
        this.items.actions = new Stack(
            20, this.game.uiScale(292), this.game,
            {axe: Stack.HORIZONTAL, direction: Stack.RIGHT, offsetX: 4, offsetY: 10}
        );
        this.add(this.items.actions);

        //Ajout des actions
        Config.entities.actions.forEach((action) => {
            const modal = new WasteActionModal(action, StackManager, this.game);
            modal.toggle(true, {stack: this.items.actions});
            modal.onClick.add((action) => this.onActionClick.dispatch(action, this), this);
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
                    y: 20,
                    x: 20,
                    text: "[changer ce titre]",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 25
                    }
                },
                waste: {
                    type: "sprite",
                    y: 80,
                    x: 20,
                    key: "[changer cette clé]"
                },
                description: {
                    type: "text",
                    y: 80,
                    text: "[changer ce texte]",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14,
                        wordWrap: true,
                        wordWrapWidth: 280
                    }
                },
                choice: {
                    type: "text",
                    y: 262,
                    x: 20,
                    text: "Choisir une action : ",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14
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