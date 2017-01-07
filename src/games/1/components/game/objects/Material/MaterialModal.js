"use strict";
import GameModal from 'system/phaser/GameModal';
import SmallDescriptionTooltip from 'system/phaser/modals/SmallDescriptionTooltip';
import {TooltipManager} from 'system/phaser/Modal';
import Type from 'system/utils/Type';

/** Material Modal (called by the material gameObject) */
export default class MaterialModal extends GameModal {

    /**
     * Constructor for a new material modal
     * @param properties
     * @param materialObj
     * @param game
     */
    constructor(properties, materialObj, game) {
        super(game);
        this.properties = properties;
        this.obj = materialObj;
        this.tooltip = new SmallDescriptionTooltip({items: {
            name: { text: this.properties.name }
        }}, TooltipManager, this, this.game);
    }


    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    tooltipHandler(visible, controls, fixed, force) {
        if(visible) {
            const dir = this.properties.modalDirection;
            this.tooltip.x = this.getOuterCenterXToSprite(this.obj.sprite, this.tooltip.items.bg);
            if(dir === "bottom") {
                this.tooltip.y = this.getOuterBottomToSprite(this.obj.sprite);
                this.tooltip.setBottom();
            } else {
                this.tooltip.y = this.getOuterTopToSprite(this.obj.sprite, this.tooltip.items.bg);
                this.tooltip.setTop();
            }
        }
        Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current)
        && this.properties.amount.current > 0 ? this.tooltip.setAmount(this.properties.amount.current) : this.tooltip.delAmount();
        this.tooltip.toggle(visible, {controls: controls, fixed: fixed, force: force});
    }
};