"use strict";
import Type from "system/utils/Type";
import Modal, {Sprite} from "system/phaser/Modal";
import {Signal} from "phaser";

/** Feedback Modal */
export default class MaterialModal extends Modal {

    name;
    game;
    onMouseOver = new Signal();
    onMouseOut = new Signal();
    onMouseDown = new Signal();
    active;

    /**
     * Constructor for a new modal
     * @param data
     * @param name
     * @param manager
     * @param game
     */
    constructor(data, name, manager, game, active = true) {
        super(Type.deepMerge(MaterialModal.pattern, data), manager, game);
        this.name = name;
        this.game = game;
        this.active = active;
        this.initEvents(this.items.bg);
        this.toggleActive(this.active);
    }

    toggleActive(active = true) {
        this.active = active;
        if (this.active) {
            this.items.bg.tint = 0xffffff;
            this.items.bg.alpha = 1;
        } else {
            this.items.bg.tint = 0x484848;
            this.items.bg.alpha = .5;
        }
    }

    initEvents(bg) {
        bg.events.onInputOver.add(() => {
            if (this.active) {
                this.game.canvas.style.cursor = "move";
            }
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

    static get pattern() {
        return {
            type: "group",
            fixedToCamera: true,
            items: {
                bg: {
                    type: "sprite",
                    key: "...", //set a picture
                    props: {scale: 0.3, inputEnabled: true}
                }
            }
        }
    }
};