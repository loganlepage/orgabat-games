"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';
import Phaser, {Signal} from 'phaser'

/** Feedback Modal */
export default class MaterialModal extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, handler, game) {
        super(Type.deepMerge(MaterialModal.pattern, data), manager, game);
        this.onMouseOver = new Signal();
        this.onMouseOut = new Signal();
        this.h = handler;

        this.items.bg.events.onInputOver.add(() => {
            this.game.canvas.style.cursor = "move";
            this.onMouseOver.dispatch()
        }, this);
        this.items.bg.events.onInputOut.add(() => {
            this.game.canvas.style.cursor = "default";
            this.onMouseOut.dispatch()
        }, this);
    }

    set count(nb) {
        this.items.text.text = `x${nb}`;
        this.items.text.alignTo(this.items.bg, Phaser.RIGHT_TOP);
    }

    static get pattern() {
        return {
            type: "group",
            fixedToCamera: true,
            items: {
                bg: {
                    type: "sprite",
                    key: "...", //set a picture
                    props: { scale: 0.5, inputEnabled: true }
                },
                text: {
                    type: "text",
                    y: 10,
                    text: "x0",
                    style: {
                        fill: "#ffffff",
                        fontFamily: "Arial",
                        fontSize: 11,
                        stroke: "#5F4D21",
                        strokeThickness: 3
                    }
                }
            }
        }
    }
};