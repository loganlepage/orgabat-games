"use strict";
import Type from "system/utils/Type";
import Modal from "system/phaser/Modal";
import {Signal} from "phaser";


/** Description Tooltip Modal */
export default class QcmMultipleChoice extends Modal {

    data;
    onClick = new Signal();
    key;

    /**
     * Constructor for a new modal
     * @param key
     * @param manager
     * @param bg
     * @param game
     */
    constructor(key, manager, bg, game) {
        super(Type.deepMerge(QcmMultipleChoice.pattern, {items: {image: {key: `jeu5/${key}`}}}), manager, game);
        this.key = key;
        this.bg = bg;
        this.initRender();
        this.initEvents(this.items.image);
    }

    initRender() {
        const picture = this.items.image;
        const scale = this.bg.width / (picture.width + 50);
        picture.scale.set((picture.scale.x * scale) / 3.2);
    }

    initEvents(image) {
        const self = this;
        image.events.onInputOver.add(() => {
            this.game.canvas.style.cursor = "pointer";
            this.items.image.alpha = 0.8;
        }, this);
        image.events.onInputOut.add(() => {
            this.game.canvas.style.cursor = "default";
            this.items.image.alpha = 1;
        }, this);
        image.events.onInputDown.add(() => {
            this.onClick.dispatch(self.key, self);
        }, this);
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                image: {
                    type: "sprite",
                    key: "[changer cette clé]",
                    props: {scale: 1, inputEnabled: true}
                }
            }
        }
    }
};