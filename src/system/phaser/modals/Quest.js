"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';

export class TitleLayout extends Modal {

    constructor(data, manager, game) {
        super(Type.deepMerge(TitleLayout.pattern, data), manager, game);
    }

    static get pattern() {
        return {
            type: "group",
            fixedToCamera: true,
            items: {
                text: {
                    type: "text",
                    x: 0,
                    y: 0,
                    text: "OBJECTIFS",
                    style: {
                        fill: "#ffffff",
                        fontFamily: "Arial",
                        fontSize: 14,
                        stroke: "#5F4D21",
                        strokeThickness: 2
                    }
                }
            }
        }
    }
}

/** Feedback Modal */
export default class QuestLayout extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(Type.deepMerge(QuestLayout.pattern, data), manager, game);
        //Aligne l'étoile à droite du texte
        this.items.star.alignTo(this.items.text, Phaser.RIGHT_CENTER, 6, -3);
        this.setFinish(false);
    }

    setFinish(isFinish = true) {
        if(isFinish) {
            this.items.star.loadTexture('atlas', 'modal/item/star');
            this.items.text.stroke = "#3F3F3F";
            this.items.text.strokeThickness = 2;
            this.items.text.setShadow(0, 0, 'rgba(0,0,0,0)', 0);
        } else {
            this.items.star.loadTexture('atlas', 'modal/item/star_disabled');
            this.items.text.stroke = QuestLayout.pattern.items.text.style.stroke;
            this.items.text.strokeThickness = QuestLayout.pattern.items.text.style.strokeThickness;
            this.items.text.setShadow(0, 0, 'rgba(0,0,0,0.4)', 5);
        }
    }

    static get pattern() {
        return {
            type: "group",
            fixedToCamera: true,
            items: {
                star: {
                    type: "sprite",
                    key: "modal/item/star_disabled",
                    props: { scale: 0.4 }
                },
                text: {
                    type: "text",
                    text: "{content}",
                    style: {
                        fill: "#ffffff",
                        fontFamily: "Arial",
                        fontSize: 12,
                        stroke: "#5F4D21",
                        strokeThickness: 3,
                        wordWrap: true,
                        wordWrapWidth: 150,
                        align: 'right'
                    }
                }
            }
        }
    }
}