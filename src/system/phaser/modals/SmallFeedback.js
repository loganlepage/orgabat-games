"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';

/** Feedback Modal */
export default class SmallFeedback extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(Type.deepMerge(SmallFeedback.pattern, data), manager, game);
    }

    static get pattern() {
        return {
            type: "group",
            fixedToCamera: true,
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/small_feedback"
                },
                image: {
                    type: "sprite",
                    y: 10,
                    x: 10,
                    key: "modal/item/button_z",
                },
                text: {
                    type: "text",
                    x: 55,
                    y: 20,
                    text: "{content}",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 12
                    }
                },
                closeButton: {
                    type : "text",
                    x: 182,
                    y: 10,
                    text: "X",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 12
                    },
                    props: { inputEnabled: true }
                }
            }
        }
    }
};