"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';

/** Feedback Modal */
export default class Feedback extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(Type.deepMerge(Feedback.pattern, data), manager, game);
    }

    setAlert(text = 'Attention !') {
        this.items.bg.loadTexture('atlas', 'modal/bg/alert_feedback');
        this.items.text.text = text;
    }
    setInfo(text = '{content}') {
        this.items.bg.loadTexture('atlas', 'modal/bg/info_feedback');
        this.items.text.text = text;
    }

    static get pattern() {
        return {
            type: "group",
            fixedToCamera: true,
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/info_feedback"
                },
                text: {
                    type: "text",
                    x: 85,
                    y: 35,
                    text: "{content}",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 12
                    }
                }
            }
        }
    }
};