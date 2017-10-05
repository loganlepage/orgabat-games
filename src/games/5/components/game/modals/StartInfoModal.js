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
        const good = StartInfoModal.pattern.items.process.processText.goodText;
        const bad = StartInfoModal.pattern.items.process.processText.badText;
        good.x = this.game.width  - (this.game.width / 2.05);
        good.y = this.game.height  - (this.game.height / 3.65);
        bad.x = this.game.width  - (this.game.width / 1.7);
        bad.y = this.game.height  - (this.game.height / 3.65);
        // add text below icons
        this.textG = this.game.add.text(good.x, good.y, good.text, good.style);
        this.textB = this.game.add.text(bad.x, bad.y, bad.text, bad.style);

        this.textG.anchor.set
        //this.game.add.text(processT.badText);
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
                    text: "Choisir si le mouvement est BON ou MAUVAIS par rapport aux images.",
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
                    processText: {
                        goodText: {
                            type: "text",
                            x: 245,
                            y: 250,
                            text: "BON",
                            style: {
                                fill: "#72e583",
                                fontFamily: "Arial",
                                fontSize: 14,
                                wordWrap: true,
                                wordWrapWidth: 450 - 40 //sprite.width - margin
                            }
                        },
                        badText: {
                            type: "text",
                            x: 435,
                            y: 485,
                            text: "MAUVAIS",
                            style: {
                                fill: "#e56767",
                                fontFamily: "Arial",
                                fontSize: 14,
                                wordWrap: true,
                                wordWrapWidth: 450 - 40 //sprite.width - margin
                            }
                        }
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