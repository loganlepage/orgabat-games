"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';

/** Small Description Tooltip Modal */
export default class InventaryItemTooltip extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        try {
            Type.isExist(data.items, true);
            Type.isExist(data.items.name, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(Type.deepMerge(InventaryItemTooltip.pattern, data), manager, game);
        this.items.name.setShadow(0, 0, 'rgba(0, 0, 0, 0.3)', 5);
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    y: 0,
                    type: "sprite",
                    key: "modal/other/arrow_down",
                    style: {
                        tint: "#5F4D21"
                    },
                    props: {scale: 0.6, anchorX: 0.5}
                },
                name: {
                    type: "text",
                    text: "{name}",
                    y: 10,
                    style: {
                        fill: "#ffffff",
                        fontFamily: "Arial",
                        fontSize: 12,
                        stroke: "#5F4D21",
                        strokeThickness: 3,
                    },
                    props: {anchorX: 0.5}
                }
            }
        }
    }
};