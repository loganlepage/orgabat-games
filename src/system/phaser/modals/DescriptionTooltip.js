"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';

/** Small Description Tooltip Modal */
export default class DescriptionTooltip extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param materialModal
     * @param game
     */
    constructor(data, manager, materialModal, game) {
        try {
            Type.isExist(data.items, true);
            Type.isExist(data.items.name, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(Type.deepMerge(DescriptionTooltip.pattern, data), manager, game);
        this.m = materialModal;
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/tooltip_top"
                },
                name: {
                    type: "text",
                    text: "{name}",
                    y: 20,
                    x: 10,
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 12
                    }
                },
                useButton: {
                    type: "group",
                    y: 63,
                    x: 52,
                    items: {
                        image: {
                            type: "sprite",
                            key: "modal/item/mouse_cross",
                            props: { scale: 0.4 }
                        },
                        text: {
                            type: "text",
                            x: 26,
                            y: 2,
                            text: "glisser - déposer",
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 11
                            }
                        }
                    }
                }
            }
        }
    }
};