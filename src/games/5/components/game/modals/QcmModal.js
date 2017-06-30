"use strict";
import {Signal} from "phaser";
import Type from "system/utils/Type";
import Modal from "system/phaser/Modal";


/** Description Tooltip Modal */
export default class QcmInfoModal extends Modal {

    _answer = null;
    onContinue = new Signal();

    set answer(answer) {
        this._answer = answer;
        const check = this.items.answerPane.items.check;
        check.visible = true;
        check.setY(answer ? QcmInfoModal.checkGoodPosition.y : QcmInfoModal.checkBadPosition.y);
    }

    get answer() {
        return this._answer;
    }

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(Type.deepMerge(QcmInfoModal.pattern, data), manager, game);
        this._initPicture();
        this._initAnswerEvents();
        this._initContinueEvents();
    }

    _initPicture() {
        const bg = this.items.bg;
        const picture = this.items.picture;
        window.picture = picture;
        window.bg = bg;

        const scale = bg.width / picture.width;
        picture.scale.set(scale);
        picture.y = bg.height - picture.height - this.game.uiScale(15) /*padding bottom*/;
    }

    _initAnswerEvents() {
        this.items.answerPane.items.answer_good.events.onInputDown.add(() => this.answer = true);
        this.items.answerPane.items.answer_bad.events.onInputDown.add(() => this.answer = false);
    }

    _initContinueEvents() {
        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.add(this._continue, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.add(this._continue, this);
        this.items.answerPane.items.close.items.iconA.events.onInputDown.add(this._continue, this);
        this.items.answerPane.items.close.items.textA.events.onInputDown.add(this._continue, this);
    }

    _continue() {
        if(this.answer !== null) {
            this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.removeAll(this);
            this.game.keys.addKey(Phaser.Keyboard.A).onDown.removeAll(this);
        }
        this.onContinue.dispatch(this.answer, this);
    }

    static get checkGoodPosition() {
        return {y: 60};
    }

    static get checkBadPosition() {
        return {y: 100};
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/big_modal"
                },
                picture: {
                    type: "sprite",
                    key: "jeu5/[NUMBER]",
                    x: 15,
                    y: 15
                },
                answerPane: {
                    type: "group",
                    y: 150,
                    x: 300,
                    items: {
                        question: {
                            type: "text",
                            text: "Est-ce bon ou mauvais ?",
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 14,
                                wordWrap: true,
                                wordWrapWidth: 110
                            }
                        },
                        answer_good: {
                            type: "sprite",
                            key: "jeu5/good",
                            y: 65,
                            props: {inputEnabled: true}
                        },
                        answer_bad: {
                            type: "sprite",
                            key: "jeu5/bad",
                            y: 105,
                            props: {inputEnabled: true}
                        },
                        check: {
                            type: "sprite",
                            key: "jeu5/check",
                            y: QcmInfoModal.checkGoodPosition.y,
                            props: {visible: false}
                        },
                        close: {
                            type: "group",
                            y: 160,
                            items: {
                                iconA: {
                                    type: "sprite",
                                    key: "modal/item/button_a",
                                    props: {scale: 0.53, inputEnabled: true}
                                },
                                textA: {
                                    type: "text",
                                    text: "CONTINUER",
                                    x: 36,
                                    y: 7,
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
            },
        }
    }
};