"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';
import GameModal from 'system/phaser/GameModal';


/** Description Tooltip Modal */
export default class StartInfoModal extends Modal {

    textG;
    textB;
    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(Type.deepMerge(StartInfoModal.pattern, data), manager, game);

    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/big_modal"
                },
                title: {
                    type: "text",
                    x: 20,
                    y: 25,
                    text: "Informations",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 28
                    }
                },
                description: {
                    type: "text",
                    x: 20,
                    y: 70,
                    text: "Identifier les bonnes et les mauvaises postures au travail",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14,
                        wordWrap: true,
                        wordWrapWidth: 450 - 40 //sprite.width - margin
                    }
                },
                process: {
                    type: "sprite",
                    key: "jeu5/process",
                    x: 120,
                    y: 110,
                },
                close: {
                    type: "group",
                    x: 360,
                    y: 320,
                    items: {
                        iconA: {
                            type: "sprite",
                            key: "modal/item/button_a",
                            x: -36,
                            y: -7,
                            props: {scale: 0.53, inputEnabled: true}
                        },
                        textA: {
                            type: "text",
                            text: "CONTINUER",
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 12
                            },
                            props: {inputEnabled: true}
                        }
                    },
                }
            }
        }
    }
};