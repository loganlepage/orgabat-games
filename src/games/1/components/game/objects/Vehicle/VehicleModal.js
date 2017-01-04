"use strict";
import Modal from 'system/phaser/Modal';
import DescriptionInfobox from 'system/phaser/modals/DescriptionInfobox';
import {DescriptionInfoboxLeft, DescriptionInfoboxRight} from 'system/phaser/modals/DescriptionInfobox';
import SmallFeedback from 'system/phaser/modals/SmallFeedback';
import {Manager} from 'system/phaser/Xmodal';
import Type from 'system/utils/Type';

/** Vehicle Modal (called by the tool gameObject) */
export default class VehicleModal extends Modal {

    /**
     * Constructor for a new vehicle modal
     * @param properties
     * @param vehicleObj
     * @param game
     */
    constructor(properties, vehicleObj, game) {
        super(properties, vehicleObj, game);
        //pattern - type - name
        this.createWithPattern('big_infobulle', 'infobox', 'infoBox');
        this.createWithPattern('left_robot_infobulle', 'fixed', 'infoBox');

        this.infobox = new DescriptionInfobox({items: {
            title: { text: this.properties.name },
            description: { text: this.properties.description + '\n'
            + "Sa taille est de " + this.properties.size }
        }}, Manager, this.game);


        this.smallFeedback = new SmallFeedback({}, Manager, this.game);
    }

    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    infoBox(params) {
        try {
            Type.isBoolean(params.visible, true);
            !Type.isExist(params.isPlayerCollide) || Type.isBoolean(params.isPlayerCollide, true);
            !Type.isExist(params.fixed) || Type.isBoolean(params.fixed, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }

        if(params.visible) {
            this.infobox.items.useButton.visible = params.isPlayerCollide;
            let dir = this.outerRightToSpriteIsPossible(this.obj.sprite, this.game.modalScale(10), this.infobox.items.bg) ? 'right' : 'left';
            this.infobox.y =  this.getInnerTopToSprite(this.obj.sprite) + this.game.modalScale(10);
            if(dir === 'right') {
                this.infobox.x = this.getOuterRightToSprite(this.obj.sprite, 10);
                new DescriptionInfoboxRight(this.infobox);
            } else {
                this.infobox.x = this.getOuterLeftToSprite(this.obj.sprite, this.infobox.items.bg, 10);
                new DescriptionInfoboxLeft(this.infobox);
            }
        }
        this.infobox.toggle(params.visible, {fixed: Type.isExist(params.fixed) ? params.fixed : false});
    }
    
    fixedDropInfoBox() {
     /*   this.smallFeedback.x = this.game.modalScale(10);
        this.smallFeedback.y = this.game.canvas.height - this.game.modalScale(60);
        this.smallFeedback.toggle(true, {fixed: true});

        return;
        let modalName = this.modals.fixed['infoBox'].modal;
        this.game.modals.update({type: "x", value: 10 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "y", value: this.game.canvas.height - 60 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "text", value: "pour ne plus utiliser."}, modalName, 1);
        this.game.modals.show(modalName, true);*/
    }

    static droppedInfoBox() {
      /*  let modalName = "robot_infobulle";
        this.game.modals.update({type: "image", value: "info_infobulle"}, modalName, 0);
        this.game.modals.update({type: "x", value: this.game.game.canvas.width - 310 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "y", value: this.game.game.canvas.height - 90 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "text", value: "Vous venez de quitter le véhicule."}, modalName, 1);
        this.game.modals.show(modalName);
        this.game.modals.count(2, function() { this.game.modals.hide(modalName); });*/
    }

    static cantUseInfoBox() {
       /* let modalName = "robot_infobulle";
        this.game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        this.game.modals.update({type: "x", value: this.game.game.canvas.width - 310 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "y", value: this.game.game.canvas.height - 90 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "text", value: "Quittez l'outil actuel avant."}, modalName, 1);
        this.game.modals.show(modalName);
        this.game.modals.count(2, function () {
            this.game.modals.hide(modalName);
        });*/
    }

    static containerIsFull() {
       /* let modalName = "robot_infobulle";
        this.game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        this.game.modals.update({type: "x", value: this.game.game.canvas.width - 310 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "y", value: this.game.game.canvas.height - 90 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "text", value: "Le vehicule est plein !"}, modalName, 1);
        this.game.modals.show(modalName);
        this.game.modals.count(2, function () {
            this.game.modals.hide(modalName);
        });*/
    }

    static beCareful(str) {
      /*  let text = str !== undefined ? `${str} ` : '';
        let modalName = "robot_infobulle";
        this.game.modals.update({type: "image", value: "alert_infobulle"}, modalName, 0);
        this.game.modals.update({type: "x", value: this.game.game.canvas.width - 310 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "y", value: this.game.game.canvas.height - 90 * this.game.Manager.ModalScale}, modalName, -1);
        this.game.modals.update({type: "text", value: `Attention ${text}!`}, modalName, 1);
        this.game.modals.show(modalName);
        this.game.modals.count(2, function () {
            this.game.modals.hide(modalName);
        });*/
    }


};