"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';
import GameModal from 'system/phaser/GameModal';


/** Description Tooltip Modal */
export default class BigDescriptionTooltip extends Modal {

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
        super(Type.deepMerge(BigDescriptionTooltip.pattern, data), manager, game);
        this.items.description.y = game.uiScale(95 - Type.nbChar(this.items.description.text, '\n') * 10);
        GameModal.fillWord(this.items.description, 'requis', '#D82E32');
    }

    setLeft() {
        this.items.bg.loadTexture('atlas', 'modal/bg/big_tooltip_left');
        ['title', 'description', 'useButton'].forEach((key) => {
            this.items[key].setX(this.data.items[key].x);
        });
    }
    setRight() {
        this.items.bg.loadTexture('atlas', 'modal/bg/big_tooltip_right');
        ['title', 'description', 'useButton'].forEach((key) => {
            this.items[key].setX(this.data.items[key].x);
        });
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/big_tooltip_right"
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
                        fontSize: 12
                    }
                },
                useButton: {
                    type: "group",
                    y: 126,
                    x: 260,
                    items: {
                        image: {
                            type: "sprite",
                            key: "modal/item/button_a",
                            props: { scale: 0.4 }
                        },
                        text: {
                            type: "text",
                            x: 26,
                            y: 2,
                            text: "utiliser",
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