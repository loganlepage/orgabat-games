"use strict";
import Modal from 'system/phaser/Modal';

/** Material Modal (called by the material gameObject) */
export default class MaterialModal extends Modal {

    /**
     * Constructor for a new material modal
     * @param properties
     * @param materialObj
     * @param game
     */
    constructor(properties, materialObj, game) {
        super(properties, materialObj, game);
        //pattern - type - name
        this.createWithPattern('small_infobulle', 'infobox', 'infoBox');
        this.createWithPattern('small_infobulle', 'fixed', 'infoBox');
    }

    changeVehicleState(vehicle) {
        (vehicle !== null && this.properties.amount !== undefined && this.properties.amount > 0)
        ? this.fixedInfoBox(this.properties.amount)
        : this.hideFixed('infoBox');
    }


    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    infoBox() {
      /*  let modalName = `${this.modals.infobox['infoBox'].modal}`;
        let dir = this.properties.modalDirection;
        let bg = this.game.modals[modalName].children[0];
        let title = this.game.modals[modalName].children[1];

        this.game.modals.update({type: "visible", value: false}, modalName, 3);
        this.game.modals.update({type: "visible", value: false}, modalName, 4);
        this.game.modals.update({type: "x", value: this.obj.sprite.x - bg._frame.centerX * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "image", value: `${this.modals.infobox['infoBox'].pattern}_${dir}`}, modalName, 0);
        if(dir === "bottom")
            this.game.modals.update({type: "y", value: this.obj.sprite.y
            + this.obj.sprite.height * (1 - this.obj.sprite.anchor.x)}, modalName, -1);
        if(dir === "top")
            this.game.modals.update({type: "y", value: this.obj.sprite.y
            - this.obj.sprite.height * (1 - this.obj.sprite.anchor.x) - bg._frame.height * this.game.Manager.ModalScale}, modalName, -1);

        this.game.modals.update({type: "text", value: this.properties.name}, modalName, 1);
        this.game.modals.update({type: "text", value: ""}, modalName, 2);
        this.game.modals.update({type: "_offsetX", value: this.getAlignCenterX(bg, title)}, modalName, 1);
        this.game.modals.update({type: "_offsetY", value: this.getAlignCenterY(bg, title) + (dir === "top" ? -3 : 9) * this.game.Manager.ModalScale}, modalName, 1);
        this.game.modals.show(modalName);*/
    }

    fixedInfoBox(amountText) {
      /*  let modalName = this.modals.fixed['infoBox'].modal;
        let dir = this.properties.modalDirection;
        let bg = this.game.modals[modalName].children[0];
        let title = this.game.modals[modalName].children[1];
        let amount = this.game.modals[modalName].children[2];
        let take = this.game.modals[modalName].children[3];
        let drop = this.game.modals[modalName].children[4];

        this.game.modals.update({type: "visible", value: true}, modalName, 3); //Show button A
        this.game.modals.update({type: "visible", value: true}, modalName, 4); //Show button E
        this.game.modals.update({type: "x", value: this.obj.sprite.x - bg._frame.centerX * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "image", value: `${this.modals.fixed['infoBox'].pattern}_${dir}`}, modalName, 0);
        if(dir === "bottom")
            this.game.modals.update({type: "y", value: this.obj.sprite.y
            + this.obj.sprite.height * (1 - this.obj.sprite.anchor.x)}, modalName, -1);
        if(dir === "top")
            this.game.modals.update({type: "y", value: this.obj.sprite.y
            - this.obj.sprite.height * (1 - this.obj.sprite.anchor.x) - bg._frame.height * this.game.Manager.ModalScale}, modalName, -1);

        this.game.modals.update({type: "text", value: this.properties.name}, modalName, 1);
        this.updateAmount(amountText);

        this.game.modals.update({type: "_offsetX", value: 12 * this.game.Manager.ModalScale}, modalName, 1);
        this.game.modals.update({type: "_offsetY", value: ((dir === "top" ? 25 : 37) - 10) * this.game.Manager.ModalScale}, modalName, 1);
        this.game.modals.update({type: "_offsetX", value: 12 * this.game.Manager.ModalScale}, modalName, 2);
        this.game.modals.update({type: "_offsetY", value: ((dir === "top" ? 25 : 37) + 10) * this.game.Manager.ModalScale}, modalName, 2);

        //A
        this.game.modals.update({type: "x", value: this.getAlignRightX(bg, take) - 10 * this.game.Manager.ModalScale}, modalName, 3);
        this.game.modals.update({type: "y", value: this.getAlignCenterY(bg, title) + (dir === "top" ? -20 : -14) * this.game.Manager.ModalScale}, modalName, 3);
        //E
        this.game.modals.update({type: "x", value: this.getAlignRightX(bg, drop) - 10 * this.game.Manager.ModalScale}, modalName, 4);
        this.game.modals.update({type: "y", value: this.getAlignCenterY(bg, title) + (dir === "top" ? 8 : 14) * this.game.Manager.ModalScale}, modalName, 4);
        this.game.modals.show(modalName, true);*/
    }

    updateAmount(amount) {
        /*let modalName = `${this.modals.fixed['infoBox'].modal}`;
        let str = amount > 1 ? 'restants' : 'restant';
        this.game.modals.update({type: "text", value: `${amount} ${str}`}, modalName, 2);*/
    }
};