"use strict";
import GameModal from "system/phaser/GameModal";
import {TooltipManager, DefaultManager} from "system/phaser/Modal";
import InventaryModal from "../../modals/InventaryModal";
import {Stack, StackManager} from "system/phaser/Modal";
import {Signal} from "phaser";

/** Inventary Modal (called by the material gameObject) */
export default class InventaryModalHandler extends GameModal {

    isShowActionsUsable = true;
    onInventaryClick = new Signal();
    onEquippedClick = new Signal();

    /**
     * Constructor for a new material modal
     * @param obj
     * @param game
     */
    constructor(obj, game) {
        super(game);
        this.obj = obj;
    }


    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    showActions() {
        if(!this.isShowActionsUsable) return;
        this.isShowActionsUsable = false;

        const modal = new InventaryModal({}, DefaultManager, this.obj.equipped || [], this.game);
        this.obj.onStuffAdd.add(
            (stuff) => modal.addStuff(stuff), modal
        );
        this.obj.onStuffDel.add(
            (stuff) => modal.delStuff(stuff), modal
        );
        modal.onInventaryClick.add(
            (action) => this.onInventaryClick.dispatch(action), this
        );
        modal.onEquippedClick.add(
            (action) => this.onEquippedClick.dispatch(action), this
        );
        modal.onDeleted.addOnce(() => {
            this.obj.onStuffAdd.removeAll(modal);
            this.obj.onStuffDel.removeAll(modal);
            this.isShowActionsUsable = true;
        }, this);

        modal.toggle(true, {controls: true});
    }
};