"use strict";
import GameModal from "system/phaser/GameModal";
import DescriptionTooltip from "system/phaser/modals/DescriptionTooltip";
import {TooltipManager, StackManager, Stack} from "system/phaser/Modal";
import MaterialModal from "../../modals/MaterialModal";

/** Material Modal (called by the material gameObject) */
export default class MaterialModalHandler extends GameModal {

    isTooltipUsable = true;

    /**
     * Constructor for a new material modal
     * @param properties
     * @param materialObj
     * @param game
     */
    constructor(properties, obj, game) {
        super(game);
        this.properties = properties;
        this.obj = obj;
        this.modal = new MaterialModal({items: {
            bg: { key: `jeu2/material/${this.obj.type}`}
        }}, this.obj.type, StackManager, this, this.game);
    }


    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    showTooltip() {
        if(!this.isTooltipUsable) return;
        this.isTooltipUsable = false;
        const tooltip = new DescriptionTooltip({items: {
            name: { text: this.properties.name }
        }}, TooltipManager, this, this.game);

        /** Events */
        const close = (enabled) => tooltip.toggle(false, {fixed: enabled});
        this.obj.onMouseOutHandled.addOnce(()=>{close(false)}, tooltip);
        tooltip.onDeleted.addOnce(()=>{
            this.obj.onMouseOutHandled.removeAll(tooltip);
            this.isTooltipUsable = true;
        }, this);

        /** UI */
        tooltip.fixedToCamera = true;
        tooltip.cameraOffset.setTo(
            this.getOuterCenterXToSprite(this.modal.items.bg, this.modal.items.bg.worldPosition, tooltip.items.bg, tooltip.scale.x),
            this.getOuterTopToSprite(this.modal.items.bg, this.modal.items.bg.worldPosition, tooltip.items.bg, tooltip.scale.y)
        );
        tooltip.toggle(true, {fixed: false},
            (err) => { if(err.code === 403) {
                tooltip.delete(); //Si on a créé un objet non utilisé
                this.isShowMouseUsable = true;
            } }
        );
    }

    materialModal(visible = true) {
        this.modal.toggle(visible, {stack: 'BOTTOM_LEFT'});
        this.modal.count = 5;
    }
};