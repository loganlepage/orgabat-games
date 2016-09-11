"use strict";
var Game = Game || {};
Game.Modal = Game.Modal || {};

/**
 * tool modal (called by the tool gameObject)
 */
Game.Modal.ToolModal = class ToolModal extends Game.Abstract.AbstractGameModal {
    constructor(properties, toolObj, game) {
        super(properties, toolObj, game);
        //pattern - type - name
        this.createWithPattern('small_infobulle', 'infobox', 'infoBox');
    }

    changeVehicleState(vehicle) {
        if(vehicle !== null && this.properties.amount !== undefined && this.properties.amount > 0) {
           // this.fixedInfoBox(this.properties.amount);
        } else {
           // this.hideStatic('fixedInfoBox');
        }
    }


    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    infoBox() {
        let modalName = `${this.modals.infobox['infoBox'].modal}`;
        let dir = this.properties.modalDirection;
        let bg = this.game.modals[modalName].children[0];
        let title = this.game.modals[modalName].children[1];

        Game.modals.update({type: "visible", value: false}, modalName, 3);
        Game.modals.update({type: "x", value: this.obj.sprite.x - bg._frame.centerX * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "image", value: `${this.modals.infobox['infoBox'].pattern}_${dir}`}, modalName, 0);
        if(dir === "bottom")
            Game.modals.update({type: "y", value: this.obj.sprite.y
            + this.obj.sprite.height * (1 - this.obj.sprite.anchor.x)}, modalName, -1);
        if(dir === "top")
            Game.modals.update({type: "y", value: this.obj.sprite.y
            - this.obj.sprite.height * (1 - this.obj.sprite.anchor.x) - bg._frame.height * Game.SCALE}, modalName, -1);

        Game.modals.update({type: "text", value: this.properties.name}, modalName, 1);
        Game.modals.update({type: "text", value: ""}, modalName, 2);
        Game.modals.update({type: "_offsetX", value: this.getAlignCenterX(bg, title)}, modalName, 1);
        Game.modals.update({type: "_offsetY", value: this.getAlignCenterY(bg, title) + (dir === "top" ? -3 : 9) * Game.SCALE}, modalName, 1);
        Game.modals.show(modalName);
    }
};