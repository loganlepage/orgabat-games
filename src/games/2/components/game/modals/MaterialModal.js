"use strict";
import Type from "system/utils/Type";
import Modal, {Sprite} from "system/phaser/Modal";
import Phaser, {Signal} from "phaser";

/** Feedback Modal */
export default class MaterialModal extends Modal {

    name;
    h;
    onMouseOver = new Signal();
    onMouseOut = new Signal();
    onDragStart = new Signal();
    onDragStop = new Signal();

    /**
     * Constructor for a new modal
     * @param name
     * @param manager
     * @param handler
     * @param game
     */
    constructor(data, name, manager, handler, game) {
        super(Type.deepMerge(MaterialModal.pattern, data), manager, game);
        this.name = name;
        this.h = handler;
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
        bg.input.enableDrag();
        bg.events.onDragStart.add(() => {
            this.game.canvas.style.cursor = "drag";
            this.onDragStart.dispatch(this)
        }, this);
        bg.events.onDragStop.add(() => {
            this.game.canvas.style.cursor = "default";
            this.onDragStop.dispatch()
        }, this);
    }

    destroyEvents(bg) {
        bg.events.onInputOver.removeAll(this);
        bg.events.onInputOut.removeAll(this);
        bg.events.onDragStart.removeAll(this);
        bg.events.onDragStop.removeAll(this);
    }

    set count(nb) {
        this.items.text.text = `x${nb}`;
        this.items.text.alignTo(this.items.bg, Phaser.RIGHT_TOP);
    }

    clone(bg) {
        this.items.bg = new Sprite(this.game, 0, 0, bg._frame.name, {scale: 0.5, inputEnabled: true});
        this.add(this.items.bg);
        this.initEvents(this.items.bg);
        this.destroyEvents(bg);
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