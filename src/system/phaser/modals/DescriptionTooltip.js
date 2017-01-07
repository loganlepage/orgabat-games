"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';


/** Description Tooltip Modal */
export default class DescriptionTooltip extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        try {
            Type.isExist(data.items, true);
            Type.isExist(data.items.title, true);
            Type.isExist(data.items.description, true);
            Type.isString(data.items.title.text, true);
            Type.isString(data.items.description.text, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(Type.deepMerge(DescriptionTooltip.pattern, data), manager, game);
    }

    setLeft() {
        this.items.bg.loadTexture(`big_tooltip_left`);
        ['title', 'description', 'useButton'].forEach((key) => {
            this.items[key].x = this.game.modalScale(this.data.items[key].x - 12);
        });
    }
    setRight() {
        this.items.bg.loadTexture(`big_tooltip_right`);
        ['title', 'description', 'useButton'].forEach((key) => {
            this.items[key].x = this.game.modalScale(this.data.items[key].x);
        });
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "big_tooltip_right"
                },
                title: {
                    type: "text",
                    x: 40,
                    y: 25,
                    text: "{title}",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 28
                    }
                },
                description: {
                    type: "text",
                    x: 40,
                    y: 85,
                    text: "{content}",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14
                    }
                },
                useButton: {
                    type: "group",
                    y: 129,
                    x: 263,
                    items: {
                        image: {
                            type: "sprite",
                            x: 0,
                            y: 0,
                            key: "bouton_a",
                            props: { scale: 0.6 }
                        },
                        text: {
                            type: "text",
                            x: 30,
                            y: 3,
                            text: "utiliser",
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 12
                            }
                        }
                    }
                }
            }
        }
    }
};