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
    }

    _initPicture() {
        const bg = this.items.bg;
        const picture = this.items.picture;
        const scale = bg.width / picture.width;
        picture.scale.set((scale/2.5) * this.game.SCALE);
        picture.x = (bg.width/2) - (picture.width/2);
        picture.y = (bg.height/2) - (picture.height/2);
    }

    _initAnswerEvents() {
        const goodAnswer = this.items.answerPane.items.answer_good;
        const badAnswer = this.items.answerPane.items.answer_bad;
        goodAnswer.input.useHandCursor = true;
        badAnswer.input.useHandCursor = true;
        goodAnswer.events.onInputDown.add(() => {
            this.answer = true;
            this.onContinue.dispatch(this.answer, this);
        });
        badAnswer.events.onInputDown.add(() => {
            this.answer = false;
            this.onContinue.dispatch(this.answer, this);
        });
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
                    x: 15,
                    y: 15,
                    items: {
                        question: {
                            type: "text",
                            text: "Est-ce bon ou mauvais ?",
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 20,
                                wordWrap: true,
                                wordWrapWidth: 300
                            }
                        },
                        answer_good: {
                            type: "sprite",
                            key: "jeu5/good",
                            x: 245,
                            y: 340,
                            props: {inputEnabled: true, useHandCursor: true}
                        },
                        answer_bad: {
                            type: "sprite",
                            key: "jeu5/bad",
                            x: 135,
                            y: 340,
                            props: {inputEnabled: true, useHandCursor: true}
                        }
                    }
                }
            },
        }
    }
};