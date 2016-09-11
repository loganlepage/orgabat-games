"use strict";
var Game = Game || {};
Game.Modal = Game.Modal || {};

/**
 * vehicle modal (called by the vehicle gameObject)
 */
Game.Modal.VehicleModal = class VehicleModal extends Game.Abstract.AbstractGameModal {
    constructor(properties, vehicleObj, game) {
        super(properties, vehicleObj, game);
        //pattern - type - name
        this.createWithPattern('big_infobulle', 'infobox', 'infoBox');
    }
    
    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    infoBox() {
        let modalName = this.modals.infobox['infoBox'].modal;
        Game.modals.update({type: "x", value: this.obj.sprite.position.x
        + this.obj.sprite.width * (1 - this.obj.sprite.anchor.x) + 10 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "y", value: this.obj.sprite.position.y
        - this.obj.sprite.height * (1 - this.obj.sprite.anchor.x) + 10 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "text", value: this.properties.name}, modalName, 1);
        Game.modals.update({type: "text", value: this.properties.description + '\n'
        + "Sa taille est de " + this.properties.size }, modalName, 2);
        Game.modals.show(modalName);
    }

    static howDropInfoBox() {
        let modalName = "robot_infobulle";
        VehicleModal.howDropInfoBoxFired = true;
        Game.modals.update({type: "image", value: "info_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "text", value: "Z pour ne plus utiliser l'outil."}, modalName, 1);
        Game.modals.show(modalName, true);
        Game.modals.count(2, function() { Game.modals.hide(modalName); });
    }

    static droppedInfoBox() {
        let modalName = "robot_infobulle";
        Game.modals.update({type: "image", value: "info_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "text", value: "Vous venez de quitter le véhicule."}, modalName, 1);
        Game.modals.show(modalName);
        Game.modals.count(2, function() { Game.modals.hide(modalName); });
    }

    static cantUseInfoBox() {
        let modalName = "robot_infobulle";
        Game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "text", value: "Quittez l'outil actuel avant."}, modalName, 1);
        Game.modals.show(modalName);
        Game.modals.count(2, function () {
            Game.modals.hide(modalName);
        });
    }

    static containerIsFull() {
        let modalName = "robot_infobulle";
        Game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "text", value: "Le vehicule est plein !"}, modalName, 1);
        Game.modals.show(modalName);
        Game.modals.count(2, function () {
            Game.modals.hide(modalName);
        });
    }
};

Object.assign(Game.Modal.VehicleModal, { // static properties
    howDropInfoBoxFired: false
});