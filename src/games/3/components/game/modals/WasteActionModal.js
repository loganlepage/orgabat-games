"use strict";
import Type from "system/utils/Type";
import Modal from "system/phaser/Modal";


/** Description Tooltip Modal */
export default class WasteActionModal extends Modal {

    controller;
    data;

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param context
     * @param game
     */
    constructor(data, manager, context, game) {
        super(Type.deepMerge(WasteActionModal.pattern, {items: {image: {key: `jeu3/actions/${data.name}`}}}), manager, game);
        this.data = data;
        this.controller = context;
        this.initEvents(this.items.image);
    }

    initEvents(image) {
        image.events.onInputOver.add(() => {
            this.game.canvas.style.cursor = "pointer";
            this.controller.choice = this.data.info;
            this.items.image.alpha = 0.8;
        }, this);
        image.events.onInputOut.add(() => {
            this.game.canvas.style.cursor = "default";
            this.controller.choice = "";
            this.items.image.alpha = 1;
        }, this);
        image.events.onInputDown.add(() => {
        }, this);
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                image: {
                    type: "sprite",
                    key: "[changer cette clé]",
                    props: {scale: 0.297, inputEnabled: true}
                }
            }
        }
    }
};