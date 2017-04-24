"use strict";
import GameModal from "system/phaser/GameModal";
import {TooltipManager, DefaultManager, Stack, StackManager} from "system/phaser/Modal";
import WasteModal from "../../modals/WasteModal";
import Config from "../../config/data";
import {Signal} from "phaser";

/** Waste Modal (called by the material gameObject) */
export default class WasteModalHandler extends GameModal {

    isShowUsable = true;
    onActionClick = new Signal();

    /**
     * Constructor for a new material modal
     * @param properties
     * @param obj
     * @param game
     */
    constructor(properties, obj, game) {
        super(game);
        this.properties = properties;
        this.obj = obj;
    }


    /** ------------------------------------------
     * Modals
     * ------------------------------------------ */

    showActions() {
        if (!this.isShowUsable) return;
        this.isShowUsable = false;

        const modal = new WasteModal({
            items: {
                waste: {key: `jeu3/dechets/${this.obj.type}`},
                title: {text: Config.infos.wastes[this.obj.type].title},
                description: {text: Config.infos.wastes[this.obj.type].description}
            }
        }, DefaultManager, this.obj, this.game);

        modal.onActionClick.add(
            (action, waste) => this.onActionClick.dispatch(action, waste), this
        );

        modal.onDeleted.addOnce(() => {
            this.isShowUsable = true;
        }, this);

        modal.toggle(true, {controls: true});
    }
};