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
        this.createWithPattern('left_robot_infobulle', 'fixed', 'infoBox');
    }

    static useMe() {
    }


    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    infoBox(collided) {
        let modalName = this.modals.infobox['infoBox'].modal;
        let bg = this.game.modals[modalName].children[0], dir = 'left';
        dir = this.outerRightToSpriteIsPossible(this.obj.sprite, 10 * Game.Manager.ModalScale, bg) ? 'right' : 'left';
        if(dir === 'right')
            Game.modals.update({type: "x", value: this.getOuterRightToSprite(this.obj.sprite, 10)}, modalName, -1);
        else
            Game.modals.update({type: "x", value: this.getOuterLeftToSprite(this.obj.sprite, bg, 10)}, modalName, -1);
        let moveThis = [1, 2, 3, 4];
        for (let i in moveThis) {
            let child = this.game.modals[modalName].children[i];
            Game.modals.update({type: "xFromBase", value: dir === 'left' ? (-10 * Game.Manager.ModalScale) : 0}, modalName, moveThis[i]);
        }
        Game.modals.update({type: "image", value: `${this.modals.infobox['infoBox'].pattern}_${dir}`}, modalName, 0);
        Game.modals.update({type: "y", value: this.getInnerTopToSprite(this.obj.sprite) + 10 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "text", value: this.properties.name}, modalName, 1);
        Game.modals.update({type: "text", value: this.properties.description + '\n'
        + "Sa taille est de " + this.properties.size }, modalName, 2);

        Game.modals.update({type: "visible", value: collided}, modalName, 3); //ShowHide A
        Game.modals.update({type: "visible", value: collided}, modalName, 4); //ShowHide "utiliser"
        Game.modals.show(modalName);
    }
    fixedDropInfoBox() {
        let modalName = this.modals.fixed['infoBox'].modal;
        Game.modals.update({type: "x", value: 10 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 60 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "text", value: "pour ne plus utiliser."}, modalName, 1);
        Game.modals.show(modalName, true);
    }

    static droppedInfoBox() {
        let modalName = "robot_infobulle";
        Game.modals.update({type: "image", value: "info_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "text", value: "Vous venez de quitter le véhicule."}, modalName, 1);
        Game.modals.show(modalName);
        Game.modals.count(2, function() { Game.modals.hide(modalName); });
    }

    static cantUseInfoBox() {
        let modalName = "robot_infobulle";
        Game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "text", value: "Quittez l'outil actuel avant."}, modalName, 1);
        Game.modals.show(modalName);
        Game.modals.count(2, function () {
            Game.modals.hide(modalName);
        });
    }

    static containerIsFull() {
        let modalName = "robot_infobulle";
        Game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "text", value: "Le vehicule est plein !"}, modalName, 1);
        Game.modals.show(modalName);
        Game.modals.count(2, function () {
            Game.modals.hide(modalName);
        });
    }

    static beCareful(str) {
        let text = str !== undefined ? `${str} ` : '';
        let modalName = "robot_infobulle";
        Game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.Manager.ModalScale}, modalName, -1);
        Game.modals.update({type: "text", value: `Attention ${text}!`}, modalName, 1);
        Game.modals.show(modalName);
        Game.modals.count(2, function () {
            Game.modals.hide(modalName);
        });
    }


};