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