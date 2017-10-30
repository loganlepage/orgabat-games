"use strict";
import {Signal} from "phaser";
import Type from "system/utils/Type";
import Modal, {Stack, StackManager} from "system/phaser/Modal";
import QcmMultipleChoice from "./QcmChoiceModal";


/** Description Tooltip Modal */
export default class QcmMultipleModal extends Modal {

    onContinue = new Signal();

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param keys
     * @param game
     */
    constructor(data, manager, keys, game) {
        super(Type.deepMerge(QcmMultipleModal.pattern, data), manager, game);
        this._initPictures(keys);
    }

    _initPictures(keys) {

        this.items.choices = new Stack(
            this.game.uiScale(25), this.game.uiScale(115), this.game, {
                axe: Stack.HORIZONTAL,
                direction: Stack.RIGHT,
                offsetX: this.game.uiScale(10),
                offsetY: this.game.uiScale(5)
            }
        );
        this.add(this.items.choices);

        keys.forEach(key => {
            const modal = new QcmMultipleChoice(key, StackManager, this.items.bg, this.game);
            modal.toggle(true, {stack: this.items.choices});
            modal.onClick.add(a => this.onContinue.dispatch(a, this));
        });
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "jeu5/custom_modal"
                },
                answerPane: {
                    type: "group",
                    x: 20,
                    y: 20,
                    items: {
                        question: {
                            type: "text",
                            text: "Quel comportement est le plus adapté ?",
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 20,
                                wordWrap: true,
                                wordWrapWidth: 500
                            }
                        }
                    }
                }
            },
        }
    }
};