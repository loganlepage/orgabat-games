"use strict";
import GameModal from 'system/phaser/GameModal';
import LittleDescriptionTooltip from 'system/phaser/modals/LittleDescriptionTooltip';
import {TooltipManager} from 'system/phaser/Modal';
import Type from 'system/utils/Type';
import {DoOnce} from 'system/utils/Utils';

/** Tool Modal (called by the tool gameObject) */
export default class ToolModalHandler extends GameModal {

    isTooltipUsable = true;

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
    }

    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    showTooltip(fixed = false) {
        if(!this.isTooltipUsable) return;
        this.isTooltipUsable = false;
        const tooltip = new LittleDescriptionTooltip({items: {
            name: { text: this.properties.name }
        }}, TooltipManager, this, this.game);

        /** Events */
        const close = (enabled) => tooltip.toggle(false, {fixed: enabled});
        this.obj.onMouseOutHandled.addOnce(()=>{close(false)}, tooltip);
        this.obj.onCollisionEndHandled.addOnce(()=>{close(!tooltip.params.fixed)}, tooltip);
        this.obj.onVehicleStartHandled.addOnce(() => {if(!fixed) {
            tooltip.setButtons({a:true, e:true});
            tooltip.toggle(true, {fixed: true});
        }}, tooltip);
        this.obj.onVehicleStopHandled.addOnce(()=>{close(true)}, tooltip);
        this.obj.onAmountChange.add(tooltip.setAmount, tooltip);
        tooltip.onDeleted.addOnce(()=>{
            this.obj.onMouseOutHandled.removeAll(tooltip);
            this.obj.onCollisionEndHandled.removeAll(tooltip);
            this.obj.onVehicleStartHandled.removeAll(tooltip);
            this.obj.onVehicleStopHandled.removeAll(tooltip);
            this.obj.onAmountChange.removeAll(tooltip);
            this.isTooltipUsable = true;
        }, this);

        /** UI */
        tooltip.x = this.getOuterCenterXToSprite(this.obj.sprite, this.obj.sprite.world, tooltip.items.bg, tooltip.scale.x);
        if(this.properties.modalDirection === "bottom") {
            tooltip.y = this.getOuterBottomToSprite(this.obj.sprite, this.obj.sprite.world, 5);
            tooltip.setBottom();
        } else {
            tooltip.y = this.getOuterTopToSprite(this.obj.sprite, this.obj.sprite.world, tooltip.items.bg, tooltip.scale.y, 5);
            tooltip.setTop();
        }
        if(Type.isExist(this.properties.amount) && Type.isNumber(this.properties.amount.current))
            tooltip.setAmount(this.properties.amount.current);
        if(fixed)
            tooltip.setButtons({a:false, e:true});
        tooltip.toggle(true, {fixed: fixed},
            (err) => { if(err.code === 403) {
                tooltip.delete(); //Si on a créé un objet non utilisé
                this.isShowMouseUsable = true;
            }});
    }
};