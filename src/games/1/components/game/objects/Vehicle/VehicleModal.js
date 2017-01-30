"use strict";
import GameModal from 'system/phaser/GameModal';
import DescriptionTooltip from 'system/phaser/modals/DescriptionTooltip';
import ButtonInfo from 'system/phaser/modals/ButtonInfo';
import Feedback from 'system/phaser/modals/Feedback';
import {TooltipManager, StackManager, Stack} from 'system/phaser/Modal';
import Type from 'system/utils/Type';
import {DoOnce} from 'system/utils/Utils';

/** Vehicle Modal (called by the vehicle gameObject) */
export default class VehicleModal extends GameModal {

    /**
     * Constructor for a new vehicle modal
     * @param properties
     * @param vehicleObj
     * @param game
     */
    constructor(properties, vehicleObj, game) {
        super(game);
        this.properties = properties;
        this.obj = vehicleObj;

        let text = `${this.properties.description}\nSa taille est de ${this.properties.size}`;
        if(Type.isString(this.properties.infoAdded)) text += `\n${this.properties.infoAdded}`;
        this.tooltip = new DescriptionTooltip({items: {
            title: {text: this.properties.name}, description: {text: text}
        }}, TooltipManager, this.game);

        this.buttonStack = new Stack(
            20, game.canvas.height, game,
            {axe: Stack.HORIZONTAL, direction: Stack.RIGHT, offsetX: 32, offsetY: 5, anchorY: 1}
        );
        this.dropInfo = new ButtonInfo({items: {
            image: { key: "bouton_e"}, text: { text: "Déposer"}}
        }, StackManager, this.game);
        this.useInfo = new ButtonInfo({items: {
            image: { key: "bouton_a"}, text: { text: "Prendre"}}
        }, StackManager, this.game);
        this.exitInfo = new ButtonInfo({items: {
            image: { key: "bouton_z"}, text: { text: "Sortir"}}
        }, StackManager, this.game);

        this.dropped = new Feedback({}, StackManager, this.game);
        this.cantUse = new Feedback({}, StackManager, this.game);
        this.containerFull = new Feedback({}, StackManager, this.game);
    }

    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    tooltipHandler(visible, isCollide = false, controls, fixed, force) {
        if(visible) {
            this.tooltip.items.useButton.visible = isCollide;
            const dir = this.isPossibleToOuterRightToSprite(this.obj.sprite, 10, this.tooltip.items.bg) ? 'right' : 'left';
            this.tooltip.y =  this.getInnerTopToSprite(this.obj.sprite) + 10;
            if(dir === 'right') {
                this.tooltip.x = this.getOuterRightToSprite(this.obj.sprite, 10);
                this.tooltip.setRight();
            } else {
                this.tooltip.x = this.getOuterLeftToSprite(this.obj.sprite, this.tooltip.items.bg, this.tooltip.scale.x, 10);
                this.tooltip.setLeft();
            }
        }
        this.tooltip.toggle(visible, {controls: controls, fixed: fixed, force: force});
    }
    
    buttonInfoFeedback(visible = true) {
        this.dropInfo.toggle(visible, {stack: this.buttonStack});
        this.useInfo.toggle(visible, {stack: this.buttonStack});
        this.exitInfo.toggle(visible, {stack: this.buttonStack});
    }

    droppedFeedback() {
        this.droppedFeedbackOnce = this.droppedFeedbackOnce || new DoOnce(() => {
            this.dropped.setInfo('Vous venez de quitter le véhicule.');
            this.dropped.toggle(GameModal.VISIBLE, {stack: 'BOTTOM_RIGHT'});
            setTimeout(() => {
                this.dropped.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'});
                this.droppedFeedbackOnce.done = false;
            }, 2000);
        });
        this.droppedFeedbackOnce.call();
    }

    cantUseFeedback() {
        this.cantUseFeedbackOnce = this.cantUseFeedbackOnce || new DoOnce(() => {
            this.cantUse.setInfo("Quittez l'outil actuel avant.");
            this.cantUse.toggle(GameModal.VISIBLE, {stack: 'BOTTOM_RIGHT'});
            setTimeout(() => {
                this.cantUse.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'});
                this.cantUseFeedbackOnce.done = false;
            }, 2000);
        });
        this.cantUseFeedbackOnce.call();
    }

    containerFullFeedback() {
        this.containerFullFeedbackOnce = this.containerFullFeedbackOnce || new DoOnce(() => {
            this.containerFull.setInfo('Le vehicule est plein !');
            this.containerFull.toggle(GameModal.VISIBLE, {stack:'BOTTOM_RIGHT'});
            setTimeout(() => {
                this.containerFull.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'});
                this.containerFullFeedbackOnce.done = false;
            } , 2000);
        });
        this.containerFullFeedbackOnce.call();
    }

    carefulFeedback(text) {
        this.carefulFeedbackOnce = this.carefulFeedbackOnce || new DoOnce((text) => {
            const careful = new Feedback({}, StackManager, this.game);
            careful.setAlert(`Attention ${text}!`);
            careful.toggle(GameModal.VISIBLE, {stack: 'BOTTOM_RIGHT'});
            setTimeout(() => {
                this.carefulFeedbackOnce.done = false;
                careful.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'})
            }, 2000);
        });
        this.carefulFeedbackOnce.call(text);
    }
};