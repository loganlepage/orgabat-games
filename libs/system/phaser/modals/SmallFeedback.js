"use strict";
var MyPhaser = MyPhaser || {};
MyPhaser.Modals = MyPhaser.Modals || {};

/**
 * Small Feedback Modal
 * @type {Xmodal}
 */
MyPhaser.Modals.SmallFeedback = class SmallFeedback extends MyPhaser.Xmodal {

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(Utils.Type.deepMerge(SmallFeedback.pattern, data), manager, game);
    }

    static get pattern() {
        return {
            type: "group",
            fixedToCamera: true,
            items: {
                bg: {
                    type: "image",
                    key: "small_info_infobulle"
                },
                image: {
                    type: "image",
                    y: 10,
                    x: 10,
                    key: "bouton_z",
                },
                text: {
                    type: "text",
                    x: 55,
                    y: 20,
                    text: "{content}",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 12
                    }
                },
                closeButton: {
                    type : "text",
                    x: 182,
                    y: 10,
                    text: "X",
                    style: {
                        fill: "#5F4D21",
                        fontFamily: "Arial",
                        fontSize: 12
                    }/*,
                    callback: function() {
                        Game.modals.modal.hideModal(this.type);
                    }*/
                }
            }
        }
    }
};