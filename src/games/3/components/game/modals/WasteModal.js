"use strict";
import Type from "system/utils/Type";
import Modal, {Stack, StackManager} from "system/phaser/Modal";
import WasteActionModal from "./WasteActionModal";
import Config from "../config/data";
import {Keyboard} from "phaser";


/** Description Tooltip Modal */
export default class WasteModal extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(Type.deepMerge(WasteModal.pattern, data), manager, game);
        this.items.description.x = this.items.bg.width - this.items.description.width - game.uiScale(30);

        //Initialisation de la barre d'action
        this.items.actions = new Stack(
            20, this.game.uiScale(292), this.game,
            {axe: Stack.HORIZONTAL, direction: Stack.RIGHT, offsetX: 4, offsetY: 10}
        );
        this.add(this.items.actions);

        //Ajout des actions
        Config.entities.actions.forEach((action) => {
            new WasteActionModal(action, StackManager, this.game).toggle(true, {stack: this.items.actions});
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
                    y: 50,
                    x: 30,
                    text: "[changer ce titre]",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 28
                    }
                },
                waste: {
                    type: "sprite",
                    y: 115,
                    x: 30,
                    key: "[changer cette clé]"
                },
                description: {
                    type: "text",
                    y: 115,
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
                    x: 30,
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