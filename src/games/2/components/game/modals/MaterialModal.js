"use strict";
import Type from "system/utils/Type";
import Modal, {Sprite} from "system/phaser/Modal";
import Phaser, {Signal} from "phaser";

/** Feedback Modal */
export default class MaterialModal extends Modal {

    name;
    game;
    onMouseOver = new Signal();
    onMouseOut = new Signal();
    onMouseDown = new Signal();

    /**
     * Constructor for a new modal
     * @param data
     * @param name
     * @param manager
     * @param handler
     * @param game
     */
    constructor(data, name, manager, game) {
        super(Type.deepMerge(MaterialModal.pattern, data), manager, game);
        this.name = name;
        this.game = game;
        this.initEvents(this.items.bg);
    }

    initEvents(bg) {
        bg.events.onInputOver.add(() => {
            this.game.canvas.style.cursor = "move";
            this.onMouseOver.dispatch()
        }, this);
        bg.events.onInputOut.add(() => {
            this.game.canvas.style.cursor = "default";
            this.onMouseOut.dispatch()
        }, this);
        bg.events.onInputDown.add(() => {
            this.onMouseDown.dispatch(this)
        }, this);
    }

    destroyEvents(bg) {
        bg.events.onInputOver.removeAll(this);
        bg.events.onInputOut.removeAll(this);
        bg.events.onInputDown.removeAll(this);
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
                    props: {scale: 0.5, inputEnabled: true}
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