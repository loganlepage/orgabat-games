"use strict";
var Game = Game || {};
Game.Modal = Game.Modal || {};

/**
 * material modal (called by the material gameObject)
 */
Game.Modal.MaterialModal = class MaterialModal extends Game.Abstract.AbstractGameModal {
    constructor(properties, materialObj, game) {
        super(properties, materialObj, game);
        //pattern - type - name
        this.createWithPattern('small_infobulle', 'infobox', 'infoBox');
        this.createWithPattern('small_infobulle', 'fixed', 'infoBox');
    }

    changeVehicleState(vehicle) {
        if(vehicle !== null && this.properties.amount !== undefined && this.properties.amount > 0) {
            this.fixedInfoBox(this.properties.amount);
        } else {
            this.hideFixed('infoBox');
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
        Game.modals.update({type: "visible", value: false}, modalName, 4);
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

    fixedInfoBox(amountText) {
        let modalName = `${this.modals.fixed['infoBox'].modal}`;
        let dir = this.properties.modalDirection;
        let bg = this.game.modals[modalName].children[0];
        let title = this.game.modals[modalName].children[1];
        let amount = this.game.modals[modalName].children[2];
        let take = this.game.modals[modalName].children[3];
        let drop = this.game.modals[modalName].children[4];

        Game.modals.update({type: "visible", value: true}, modalName, 3); //Show button A
        Game.modals.update({type: "visible", value: true}, modalName, 4); //Show button E
        Game.modals.update({type: "x", value: this.obj.sprite.x - bg._frame.centerX * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "image", value: `${this.modals.fixed['infoBox'].pattern}_${dir}`}, modalName, 0);
        if(dir === "bottom")
            Game.modals.update({type: "y", value: this.obj.sprite.y
            + this.obj.sprite.height * (1 - this.obj.sprite.anchor.x)}, modalName, -1);
        if(dir === "top")
            Game.modals.update({type: "y", value: this.obj.sprite.y
            - this.obj.sprite.height * (1 - this.obj.sprite.anchor.x) - bg._frame.height * Game.SCALE}, modalName, -1);

        Game.modals.update({type: "text", value: this.properties.name}, modalName, 1);
        this.updateAmount(amountText);

        Game.modals.update({type: "_offsetX", value: 12 * Game.SCALE}, modalName, 1);
        Game.modals.update({type: "_offsetY", value: ((dir === "top" ? 25 : 37) - 10) * Game.SCALE}, modalName, 1);
        Game.modals.update({type: "_offsetX", value: 12 * Game.SCALE}, modalName, 2);
        Game.modals.update({type: "_offsetY", value: ((dir === "top" ? 25 : 37) + 10) * Game.SCALE}, modalName, 2);

        //A
        Game.modals.update({type: "x", value: this.getAlignRightX(bg, take) - 10 * Game.SCALE}, modalName, 3);
        Game.modals.update({type: "y", value: this.getAlignCenterY(bg, title) + (dir === "top" ? -20 : -14) * Game.SCALE}, modalName, 3);
        //E
        Game.modals.update({type: "x", value: this.getAlignRightX(bg, drop) - 10 * Game.SCALE}, modalName, 4);
        Game.modals.update({type: "y", value: this.getAlignCenterY(bg, title) + (dir === "top" ? 8 : 14) * Game.SCALE}, modalName, 4);
        Game.modals.show(modalName, true);
    }

    updateAmount(amount) {
        let modalName = `${this.modals.fixed['infoBox'].modal}`;
        let str = amount > 1 ? 'restants' : 'restant';
        Game.modals.update({type: "text", value: `${amount} ${str}`}, modalName, 2);
    }
};