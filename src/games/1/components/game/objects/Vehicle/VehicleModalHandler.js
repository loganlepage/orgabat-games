"use strict";
import GameModal from 'system/phaser/GameModal';
import BigDescriptionTooltip from 'system/phaser/modals/BigDescriptionTooltip';
import ButtonInfo from 'system/phaser/modals/ButtonInfo';
import Feedback from 'system/phaser/modals/Feedback';
import {TooltipManager, StackManager, Stack} from 'system/phaser/Modal';
import Type from 'system/utils/Type';
import {DoOnce} from 'system/utils/Utils';

/** Vehicle Modal (called by the vehicle gameObject) */
export default class VehicleModalHandler extends GameModal {

    isShowMouseUsable = true;
    isShowUsable = true;
    isDroppedUsable = true;
    isCanUseUsable = true;
    isContainerFullUsable = true;
    isCarefulUsable = true;


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
        this.descriptionText = `${this.properties.description}\nSa taille est de ${this.properties.size}`;
        if(Type.isString(this.properties.infoAdded))
            this.descriptionText += `\n${this.properties.infoAdded}`;

        this.buttonStack = new Stack(
            20, game.canvas.height, game,
            {axe: Stack.HORIZONTAL, direction: Stack.RIGHT, offsetX: 32, offsetY: 5, anchorY: 1}
        );
    }

    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */
    _prepareTooltip(tooltip, isButton) {
        tooltip.items.useButton.visible = isButton;
        const dir = this.isPossibleToOuterRightToSprite(this.obj.sprite, this.obj.sprite.world, 10, tooltip.items.bg) ? 'right' : 'left';
        tooltip.y =  this.getInnerTopToSprite(this.obj.sprite, this.obj.sprite.world) + 10;
        if(dir === 'right') {
            tooltip.x = this.getOuterRightToSprite(this.obj.sprite, this.obj.sprite.world, 10);
            tooltip.setRight();
        } else {
            tooltip.x = this.getOuterLeftToSprite(this.obj.sprite, this.obj.sprite.world, tooltip.items.bg, tooltip.scale.x, 10);
            tooltip.setLeft();
        }
    }
    showMouseTooltip(isCollide) {
        if(!this.isShowMouseUsable) return;
        this.isShowMouseUsable = false;
        const tooltip = new BigDescriptionTooltip({items: {
            title: {text: this.properties.name}, description: {text: this.descriptionText}
        }}, TooltipManager, this.game);
        this.obj.onMouseOutHandled.addOnce(() => tooltip.toggle(false), tooltip);
        tooltip.onDeleted.addOnce(()=>{
            this.obj.onMouseOutHandled.removeAll(tooltip);
            this.isShowMouseUsable = true;
        }, this);

        this._prepareTooltip(tooltip, isCollide);
        tooltip.toggle(true, {context: this},
            (err) => { if(err.code === 403) {
                tooltip.delete(); //Si on a créé un objet non utilisé
                this.isShowMouseUsable = true;
            }}
        );
    }
    showTooltip() {
        if(!this.isShowUsable) return;
        this.isShowUsable = false;
        const tooltip = new BigDescriptionTooltip({items: {
            title: {text: this.properties.name}, description: {text: this.descriptionText}
        }}, TooltipManager, this.game);
        this.obj.onMounted.addOnce(() => tooltip.toggle(false, {controls: true, fixed:true}), tooltip);
        this.obj.onCollisionEndHandled.addOnce(() => tooltip.toggle(false, {controls: true, fixed:true}), tooltip);
        tooltip.onDeleted.addOnce(()=>{
            this.obj.onMounted.removeAll(tooltip);
            this.obj.onCollisionEndHandled.removeAll(tooltip);
            this.isShowUsable = true;
        }, this);

        this._prepareTooltip(tooltip, true);
        tooltip.toggle(true, {fixed: true, controls: false, context: this});
    }
    
    buttonInfoFeedback(visible = true) {
        const dropInfo = new ButtonInfo({items: {
            image: { key: "modal/item/button_e"}, text: { text: "Déposer"}}
        }, StackManager, this.game);
        this.obj.onStopped.addOnce(() => dropInfo.toggle(false, {stack: this.buttonStack}), dropInfo);
        dropInfo.toggle(visible, {stack: this.buttonStack});

        const useInfo = new ButtonInfo({items: {
            image: { key: "modal/item/button_a"}, text: { text: "Prendre"}}
        }, StackManager, this.game);
        this.obj.onStopped.addOnce(() => useInfo.toggle(false, {stack: this.buttonStack}), useInfo);
        useInfo.toggle(visible, {stack: this.buttonStack});

        const exitInfo = new ButtonInfo({items: {
            image: { key: "modal/item/button_z"}, text: { text: "Sortir"}}
        }, StackManager, this.game);
        this.obj.onStopped.addOnce(() => exitInfo.toggle(false, {stack: this.buttonStack}), exitInfo);
        exitInfo.toggle(visible, {stack: this.buttonStack});
    }

    droppedFeedback() {
        if(!this.isDroppedUsable) return;
        this.isDroppedUsable = false;
        const dropped = new Feedback({}, StackManager, this.game);
        dropped.setInfo('Vous venez de quitter le véhicule.');
        dropped.toggle(GameModal.VISIBLE, {stack: 'BOTTOM_RIGHT'});
        setTimeout(() => {
            dropped.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'});
            this.isDroppedUsable = true;
        }, 2000);
    }

    cantUseFeedback() {
        if(!this.isCanUseUsable) return;
        this.isCanUseUsable = false;
        const cantUse = new Feedback({}, StackManager, this.game);
        cantUse.setInfo("Quittez l'outil actuel avant.");
        cantUse.toggle(GameModal.VISIBLE, {stack: 'BOTTOM_RIGHT'});
        setTimeout(() => {
            cantUse.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'});
            this.isCanUseUsable = true;
        }, 2000);
    }

    containerFullFeedback() {
        if(!this.isContainerFullUsable) return;
        this.isContainerFullUsable = false;
        const containerFull = new Feedback({}, StackManager, this.game);
        containerFull.setInfo('Le vehicule est plein !');
        containerFull.toggle(GameModal.VISIBLE, {stack:'BOTTOM_RIGHT'});
        setTimeout(() => {
            containerFull.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'});
            this.isContainerFullUsable = true;
        } , 2000);
    }

    carefulFeedback(text) {
        if(!this.isCarefulUsable) return;
        this.isCarefulUsable = false;
        const careful = new Feedback({}, StackManager, this.game);
        careful.setAlert(`Attention ${text}!`);
        careful.toggle(GameModal.VISIBLE, {stack: 'BOTTOM_RIGHT'});
        setTimeout(() => {
            this.isCarefulUsable = true;
            careful.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'})
        }, 2000);
    }
};