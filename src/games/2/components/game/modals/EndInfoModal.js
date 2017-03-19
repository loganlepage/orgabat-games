"use strict";
import Phaser, {Signal} from 'phaser';
import Type from 'system/utils/Type';
import Modal from 'system/phaser/Modal';


/** Description Tooltip Modal */
export default class EndInfoModal extends Modal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game, scoreMax = {}) {
        super(Type.deepMerge(EndInfoModal.pattern, data), manager, game);
        this.healthMax = Type.isNumber(scoreMax.healthMax) ? scoreMax.healthMax : 0;
        this.organizationMax = Type.isNumber(scoreMax.organizationMax) ? scoreMax.organizationMax : 0;
        this.enterpriseMax = Type.isNumber(scoreMax.enterpriseMax) ? scoreMax.enterpriseMax : 0;
        this.onReplay = new Signal();
        this.onExit = new Signal();
    }

    // Juste avant d'afficher, on place le text au centre
    toggle(visible, params, stars = {}, score = {}) {
        if(visible) {
            this.items.c.y = this.items.bg.centerY - this.items.c.height * 0.5;
            this.items.c.items.text.x = this.items.bg.centerX;

            //Stars
            this.items.c.items.stars.x = this.items.bg.centerX - this.items.c.items.stars.width * 0.5;
            if(Type.isBoolean(stars.star1))
                if(stars.star1) this.items.c.items.stars.items.star1.loadTexture('atlas', 'modal/item/star');
                else this.items.c.items.stars.items.star1.loadTexture('atlas', 'modal/item/star_disabled');
            if(Type.isBoolean(stars.star2))
                if(stars.star2) this.items.c.items.stars.items.star2.loadTexture('atlas', 'modal/item/star');
                else this.items.c.items.stars.items.star2.loadTexture('atlas', 'modal/item/star_disabled');
            if(Type.isBoolean(stars.star3))
                if(stars.star3) this.items.c.items.stars.items.star3.loadTexture('atlas', 'modal/item/star');
                else this.items.c.items.stars.items.star3.loadTexture('atlas', 'modal/item/star_disabled');

            //Score
            this.items.c.items.score.text =
                `SANTÉ ${Type.isNumber(score.health) ? score.health : 0 } / ${this.healthMax} - ` +
                `ORGANISATION ${Type.isNumber(score.organization) ? score.organization : 0 } / ${this.organizationMax} - ` +
                `NOTORIÉTÉ ${Type.isNumber(score.enterprise) ? score.enterprise : 0 } / ${this.enterpriseMax}`;
            this.items.c.items.score.x = this.items.bg.centerX;

            //Buttons
            this.items.c.items.choice.x = this.items.bg.centerX - this.items.c.items.choice.width * 0.5;

            this._prepareEvents();
        }
        super.toggle(visible, params);
    }

    _prepareEvents() {
        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this._onExit, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(this._onExit, this);
        this.items.c.items.choice.items.exit.items.icon.events.onInputDown.add(this._onExit, this);
        this.items.c.items.choice.items.exit.items.text.events.onInputDown.add(this._onExit, this);

        this.game.keys.addKey(Phaser.Keyboard.E).onDown.addOnce(this._onReplay, this);
        this.items.c.items.choice.items.replay.items.icon.events.onInputDown.add(this._onReplay, this);
        this.items.c.items.choice.items.replay.items.icon.events.onInputDown.add(this._onReplay, this);
    }

    _removeEvents() {
        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onExit, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onExit, this);
        this.game.keys.addKey(Phaser.Keyboard.E).onDown.remove(this._onReplay, this);
    }

    _onExit() {
        this._removeEvents();
        this.onExit.dispatch();
    }

    _onReplay() {
        this._removeEvents();
        this.onReplay.dispatch();
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "sprite",
                    key: "modal/bg/big_modal"
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
                                    key: "modal/item/star_disabled"
                                },
                                star2: {
                                    type: "sprite",
                                    x: 80,
                                    key: "modal/item/star_disabled"
                                },
                                star3: {
                                    type: "sprite",
                                    x: 160,
                                    key: "modal/item/star_disabled"
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
                        },
                        choice: {
                            type: "group",
                            y: 260,
                            items: {
                                exit: {
                                    type: "group",
                                    items: {
                                        icon: {
                                            type: "sprite",
                                            key: "modal/item/button_a",
                                            props: { scale: 0.53, inputEnabled: true }
                                        },
                                        text: {
                                            type : "text",
                                            text: "QUITTER",
                                            x: 36,
                                            y: 7,
                                            style: {
                                                fill: "#5F4D21",
                                                fontFamily: "Arial",
                                                fontSize: 12
                                            },
                                            props: { inputEnabled: true }
                                        }
                                    }
                                },
                                replay: {
                                    type: "group",
                                    x: 140,
                                    items: {
                                        icon: {
                                            type: "sprite",
                                            key: "modal/item/button_e",
                                            props: { scale: 0.53, inputEnabled: true }
                                        },
                                        text: {
                                            type : "text",
                                            text: "REJOUER",
                                            x: 36,
                                            y: 7,
                                            style: {
                                                fill: "#5F4D21",
                                                fontFamily: "Arial",
                                                fontSize: 12
                                            },
                                            props: { inputEnabled: true }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};