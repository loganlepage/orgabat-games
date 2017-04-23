"use strict";
import GameModal from "system/phaser/GameModal";
import {TooltipManager, DefaultManager} from "system/phaser/Modal";
import WasteModal from "../../modals/WasteModal";
import Config from "../../config/data";
import {Stack, StackManager} from "system/phaser/Modal";

/** Waste Modal (called by the material gameObject) */
export default class WasteModalHandler extends GameModal {

    isShowUsable = true;

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
        if(!this.isShowUsable) return;
        this.isShowUsable = false;

        const modal = new WasteModal({items: {
            waste: { key: `jeu3/dechets/${this.obj.type}` },
            title: { text: Config.infos.wastes[this.obj.type].title },
            description: { text: Config.infos.wastes[this.obj.type].description }
        }}, DefaultManager, this.game);

        modal.onDeleted.addOnce(() => {
            this.isShowUsable = true;
        }, this);

        modal.toggle(true, {controls: true});
    }
};