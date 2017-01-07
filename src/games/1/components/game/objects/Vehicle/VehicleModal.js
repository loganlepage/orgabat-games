"use strict";
import Vehicle from './Vehicle';
import GameModal from 'system/phaser/GameModal';
import DescriptionTooltip from 'system/phaser/modals/DescriptionTooltip';
import SmallFeedback from 'system/phaser/modals/SmallFeedback';
import Feedback from 'system/phaser/modals/Feedback';
import {TooltipManager, StackManager} from 'system/phaser/Modal';
import Type from 'system/utils/Type';

/** Vehicle Modal (called by the tool gameObject) */
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

        this.tooltip = new DescriptionTooltip({items: {
            title: { text: this.properties.name },
            description: { text: this.properties.description + '\n'
            + "Sa taille est de " + this.properties.size }
        }}, TooltipManager, this.game);

        this.drop = new SmallFeedback({}, StackManager, this.game);
        this.drop.items.closeButton.events.onInputDown.add(() => {
            this.drop.toggle(GameModal.HIDDEN, {stack:'BOTTOM_LEFT'});
        });

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
            const dir = this.isPossibleToOuterRightToSprite(this.obj.sprite, this.game.modalScale(10), this.tooltip.items.bg) ? 'right' : 'left';
            this.tooltip.y =  this.getInnerTopToSprite(this.obj.sprite) + this.game.modalScale(10);
            if(dir === 'right') {
                this.tooltip.x = this.getOuterRightToSprite(this.obj.sprite, 10);
                this.tooltip.setRight();
            } else {
                this.tooltip.x = this.getOuterLeftToSprite(this.obj.sprite, this.tooltip.items.bg, 10);
                this.tooltip.setLeft();
            }
        }
        this.tooltip.toggle(visible, {controls: controls, fixed: fixed, force: force});
    }
    
    howDropFeedback(visible = true) {
        if(visible)
            this.drop.items.text.text = 'pour ne plus utiliser.';
        this.drop.toggle(visible, {stack:'BOTTOM_LEFT'});
    }

    droppedFeedback() {
        this.dropped.setInfo('Vous venez de quitter le véhicule.');
        this.dropped.toggle(GameModal.VISIBLE, {stack:'BOTTOM_RIGHT'});
        window.setTimeout(() => this.dropped.toggle(GameModal.HIDDEN, {stack:'BOTTOM_RIGHT'}), 2000);
    }

    cantUseFeedback() {
        this.cantUse.setInfo("Quittez l'outil actuel avant.");
        this.cantUse.toggle(GameModal.VISIBLE, {stack:'BOTTOM_RIGHT'});
        window.setTimeout(() => this.cantUse.toggle(GameModal.HIDDEN, {stack:'BOTTOM_RIGHT'}), 2000);
    }

    containerFullFeedback() {
        this.containerFull.setInfo('Le vehicule est plein !');
        this.containerFull.toggle(GameModal.VISIBLE, {stack:'BOTTOM_RIGHT'});
        window.setTimeout(() => this.containerFull.toggle(GameModal.HIDDEN, {stack:'BOTTOM_RIGHT'}), 2000);
    }

    carefulFeedback(text) {
        const careful = new Feedback({}, StackManager, this.game);
        careful.setAlert(`Attention ${text}!`);
        careful.toggle(GameModal.VISIBLE, {stack:'BOTTOM_RIGHT'});
        window.setTimeout(() => careful.toggle(GameModal.HIDDEN, {stack:'BOTTOM_RIGHT'}), 2000);
    }
};