"use strict";
import GameModal from 'system/phaser/GameModal';
import SmallDescriptionTooltip from 'system/phaser/modals/SmallDescriptionTooltip';
import {TooltipManager} from 'system/phaser/Modal';
import Type from 'system/utils/Type';

/** Tool Modal (called by the tool gameObject) */
export default class ToolModal extends GameModal {

    /**
     * Constructor for a new tool modal
     * @param properties
     * @param toolObj
     * @param game
     */
    constructor(properties, toolObj, game) {
        super(game);
        this.properties = properties;
        this.obj = toolObj;
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
            this.tooltip.x = this.getOuterCenterXToSprite(this.obj.sprite, this.tooltip.items.bg, this.tooltip.scale.x);
            if(dir === "bottom") {
                this.tooltip.y = this.getOuterBottomToSprite(this.obj.sprite, 5);
                this.tooltip.setBottom();
            } else {
                this.tooltip.y = this.getOuterTopToSprite(this.obj.sprite, this.tooltip.items.bg, this.tooltip.scale.y, 5);
                this.tooltip.setTop();
            }
        }
        Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current)
            ? this.tooltip.setAmount(this.properties.amount.current) : this.tooltip.delAmount();
        this.tooltip.toggle(visible, {controls: controls, fixed: fixed, force: force});
    }
};