"use strict";
var MyPhaser = MyPhaser || {};
MyPhaser.Modals = MyPhaser.Modals || {};

/**
 * Decorator to turn the infobox in left direction
 * @type {DescriptionInfoboxLeft}
 */
MyPhaser.Modals.DescriptionInfoboxLeft = class DescriptionInfoboxLeft {
    constructor(modal) {
        try { Utils.Type.isInstanceOf(modal, MyPhaser.Modals.DescriptionInfobox, true); }
        catch (e) { console.error(e.name + ": " + e.message); }

        modal.items.bg.loadTexture(`big_infobulle_left`);
        ['title', 'description', 'useButton'].forEach((key) => {
            modal.items[key].x = modal.game.modalScale(modal.data.items[key].x - 12);
        });
    }
};

/**
 * Decorator to turn the infobox in right direction
 * @type {DescriptionInfoboxLeft}
 */
MyPhaser.Modals.DescriptionInfoboxRight = class DescriptionInfoboxRight {
    constructor(modal) {
        try { Utils.Type.isInstanceOf(modal, MyPhaser.Modals.DescriptionInfobox, true); }
        catch (e) { console.error(e.name + ": " + e.message); }

        modal.items.bg.loadTexture(`big_infobulle_right`);
        ['title', 'description', 'useButton'].forEach((key) => {
            modal.items[key].x = modal.game.modalScale(modal.data.items[key].x);
        });
    }
};

/**
 * Description Infobox Modal
 * @type {Xmodal}
 */
MyPhaser.Modals.DescriptionInfobox = class DescriptionInfobox extends MyPhaser.Xmodal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        try {
            Utils.Type.isExist(data.items, true);
            Utils.Type.isExist(data.items.title, true);
            Utils.Type.isExist(data.items.description, true);
            Utils.Type.isString(data.items.title.text, true);
            Utils.Type.isString(data.items.description.text, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }
        super(Utils.Type.deepMerge(DescriptionInfobox.pattern, data), manager, game);
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                bg: {
                    type: "image",
                    key: "big_infobulle_right"
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
                        fontSize: 14
                    }
                },
                useButton: {
                    type: "group",
                    y: 129,
                    x: 263,
                    items: {
                        image: {
                            type: "image",
                            x: 0,
                            y: 0,
                            key: "bouton_a",
                            props: { scale: 0.6 }
                        },
                        text: {
                            type: "text",
                            x: 30,
                            y: 3,
                            text: "utiliser",
                            style: {
                                fill: "#5F4D21",
                                fontFamily: "Arial",
                                fontSize: 12
                            }
                        }
                    }
                }
            }
        }
    }
};