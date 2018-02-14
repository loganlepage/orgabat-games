"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';
import GameModal from 'system/phaser/GameModal';


/** Description Tooltip Modal */
export default class StartInfoModal extends Modal {

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
                    text: "Objectifs",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 28
                    }
                },
                description: {
                    type: "text",
                    x: 20,
                    y: 85,
                    text: "En fonction des différentes situations, choisi la meilleure conduite à avoir pour avoir la meilleure cohabitation possible entre l’intervention professionnelle et le cadre de vie du client.",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 14,
                        wordWrap: true,
                        wordWrapWidth: 450 - 40 //sprite.width - margin
                    }
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