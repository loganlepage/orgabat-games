"use strict";
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';
import GameModal from 'system/phaser/GameModal';


/** Description Tooltip Modal */
export default class DefaultModal extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game, scoreMax = {}) {
        super(Type.deepMerge(DefaultModal.pattern, data), manager, game);
        this.healthMax = Type.isNumber(scoreMax.healthMax) ? scoreMax.healthMax : 0;
        this.organizationMax = Type.isNumber(scoreMax.organizationMax) ? scoreMax.organizationMax : 0;
        this.enterpriseMax = Type.isNumber(scoreMax.enterpriseMax) ? scoreMax.enterpriseMax : 0;
    }

    // Juste avant d'afficher, on place le text au centre
    toggle(visible, params, stars = {}, score = {}) {
        if(visible) {
            this.items.c.y = this.items.bg._frame.centerY - this.items.c.height/2;
            this.items.c.items.text.x = this.items.bg._frame.centerX;

            this.items.c.items.stars.x = this.items.bg._frame.centerX - this.items.c.items.stars.width/2;
            if(Type.isBoolean(stars.star1))
                if(stars.star1) this.items.c.items.stars.items.star1.loadTexture('star');
                else this.items.c.items.stars.items.star1.loadTexture('star_disabled');
            if(Type.isBoolean(stars.star2))
                if(stars.star2) this.items.c.items.stars.items.star2.loadTexture('star');
                else this.items.c.items.stars.items.star2.loadTexture('star_disabled');
            if(Type.isBoolean(stars.star3))
                if(stars.star3) this.items.c.items.stars.items.star3.loadTexture('star');
                else this.items.c.items.stars.items.star3.loadTexture('star_disabled');

            this.items.c.items.score.text =
                `SANTÉ ${Type.isNumber(score.health) ? score.health : 0 } / ${this.healthMax} - ` +
                `ORGANISATION ${Type.isNumber(score.organization) ? score.organization : 0 } / ${this.organizationMax} - ` +
                `NOTORIÉTÉ ${Type.isNumber(score.enterprise) ? score.enterprise : 0 } / ${this.enterpriseMax}`;
            this.items.c.items.score.x = this.items.bg._frame.centerX;
        }
        super.toggle(visible, params);
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "big_modal"
                },
                c: {
                    type: "group",
                    items: {
                        text: {
                            type: "text",
                            text: "Partie terminée",
                            props: { anchorX: 0.5 },
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 36,
                            }
                        },
                        stars: {
                            type: "group",
                            y: 100,
                            items: {
                                star1: {
                                    type: "sprite",
                                    key: "star_disabled"
                                },
                                star2: {
                                    type: "sprite",
                                    x: 80,
                                    key: "star_disabled"
                                },
                                star3: {
                                    type: "sprite",
                                    x: 160,
                                    key: "star_disabled"
                                },
                            }
                        },
                        score: {
                            type: "text",
                            y: 200,
                            text: "",
                            props: { anchorX: 0.5 },
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 12,
                            }
                        }
                    }
                }
            }
        }
    }
};