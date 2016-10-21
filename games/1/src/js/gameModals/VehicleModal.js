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
      //  this.createWithPattern('use_infobulle', 'fixed', 'infoBox');
    }

    static useMe() {
       /* Game.vehicleGroup.forEach(function(vehicle) {
            vehicle.modal.showUseMe();
        });*/
    }
   /* showUseMe() {
        let modalName = this.modals.fixed['infoBox'].modal;
        let bg = this.game.modals[modalName].children[0];
        let title = this.game.modals[modalName].children[1];
        let take = this.game.modals[modalName].children[3];
        let drop = this.game.modals[modalName].children[4];

        Game.modals.update({type: "visible", value: true}, modalName, 3); //Show button A
        Game.modals.update({type: "x", value: this.obj.sprite.x - bg._frame.centerX * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "y", value: this.obj.sprite.y + this.obj.sprite.height * (1 - this.obj.sprite.anchor.x)}, modalName, -1);
        Game.modals.update({type: "image", value: `${this.modals.fixed['infoBox'].pattern}_${dir}`}, modalName, 0);

        Game.modals.update({type: "text", value: this.properties.name}, modalName, 1);

        Game.modals.update({type: "_offsetX", value: 12 * Game.SCALE}, modalName, 1);
        Game.modals.update({type: "_offsetY", value: ((dir === "top" ? 25 : 37) - 10) * Game.SCALE}, modalName, 1);
        Game.modals.update({type: "_offsetX", value: 12 * Game.SCALE}, modalName, 2);
        Game.modals.update({type: "_offsetY", value: ((dir === "top" ? 25 : 37) + 10) * Game.SCALE}, modalName, 2);

        //A
        Game.modals.update({type: "x", value: this.getAlignRightX(bg, take) - 10 * Game.SCALE}, modalName, 3);
        Game.modals.update({type: "y", value: this.getAlignCenterY(bg, title) -14 * Game.SCALE}, modalName, 3);
        Game.modals.show(modalName, true);
    }*/


    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    infoBox(collided) {
        let modalName = this.modals.infobox['infoBox'].modal;
        let bg = this.game.modals[modalName].children[0], dir = 'left';
        dir = this.outerRightToSpriteIsPossible(this.obj.sprite, 10 * Game.SCALE, bg) ? 'right' : 'left';
        if(dir === 'right')
            Game.modals.update({type: "x", value: this.getOuterRightToSprite(this.obj.sprite) + 10 * Game.SCALE}, modalName, -1);
        else
            Game.modals.update({type: "x", value: this.getOuterLeftToSprite(this.obj.sprite, bg) - 10 * Game.SCALE}, modalName, -1);
        let moveThis = [1, 2, 3, 4];
        for (let i in moveThis) {
            let child = this.game.modals[modalName].children[i];
            Game.modals.update({type: "xFromBase", value: dir === 'left' ? (-10 * Game.SCALE) : 0}, modalName, moveThis[i]);
        }
        Game.modals.update({type: "image", value: `${this.modals.infobox['infoBox'].pattern}_${dir}`}, modalName, 0);
        Game.modals.update({type: "y", value: this.getInnerTopToSprite(this.obj.sprite) + 10 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "text", value: this.properties.name}, modalName, 1);
        Game.modals.update({type: "text", value: this.properties.description + '\n'
        + "Sa taille est de " + this.properties.size }, modalName, 2);

        Game.modals.update({type: "visible", value: collided}, modalName, 3); //ShowHide A
        Game.modals.update({type: "visible", value: collided}, modalName, 4); //ShowHide "utiliser"
        Game.modals.show(modalName);
    }
    fixedDropInfoBox() {
        let modalName = this.modals.fixed['infoBox'].modal;
        Game.modals.update({type: "x", value: 10 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 60 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "text", value: "pour ne plus utiliser."}, modalName, 1);
        Game.modals.show(modalName, true);
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

    static beCareful(str) {
        let text = str !== undefined ? `${str} ` : '';
        let modalName = "robot_infobulle";
        Game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        Game.modals.update({type: "x", value: window.innerWidth - 310 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "y", value: window.innerHeight - 90 * Game.SCALE}, modalName, -1);
        Game.modals.update({type: "text", value: `Attention ${text}!`}, modalName, 1);
        Game.modals.show(modalName);
        Game.modals.count(2, function () {
            Game.modals.hide(modalName);
        });
    }


};