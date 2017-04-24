"use strict";
import GameModal from "system/phaser/GameModal";
import {TooltipManager, DefaultManager, Stack, StackManager} from "system/phaser/Modal";
import InventaryModal from "../../modals/InventaryModal";
import {Signal} from "phaser";
import InventaryItemModal from "../../modals/InventaryItemModal";

/** Inventary Modal (called by the material gameObject) */
export default class InventaryModalHandler extends GameModal {

    isShowActionsUsable = true;
    isShowEquippedUsable = true;
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

        this.equippedToolbar = new Stack(
            game.canvas.width - game.uiScale(175), game.uiScale(5), game,
            {axe: Stack.HORIZONTAL, direction: Stack.LEFT, offsetX: 8, offsetY: 5, anchorY: 0}
        );
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

    showEquipped() {
        if(!this.isShowEquippedUsable) return;
        this.isShowEquippedUsable = false;

        const add = (data) => {
            const m = new InventaryItemModal(data, StackManager, this.game);
            m.scale.set(0.65);
            m.toggle(true, {stack: this.equippedToolbar});
        };

        this.obj.equipped.forEach((stuff) => add(stuff.data));
        this.obj.onStuffAdd.add((stuff) => add(stuff.data));
        this.obj.onStuffDel.add((stuff) => {
            this.equippedToolbar.forEach((modal) => {
                if(modal.data.name === stuff.data.name) {
                    this.equippedToolbar.remove(modal);
                    modal.delete();
                    this.game.canvas.style.cursor = "default";
                }
            });
        });
    }
};