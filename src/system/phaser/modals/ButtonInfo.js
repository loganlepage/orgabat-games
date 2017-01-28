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
                image: {
                    type: "sprite",
                    x: 10,
                    key: "bouton_z",
                    props: { scale: 0.4 }
                },
                text: {
                    type: "text",
                    x: 40,
                    y: 3,
                    text: "{content}",
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