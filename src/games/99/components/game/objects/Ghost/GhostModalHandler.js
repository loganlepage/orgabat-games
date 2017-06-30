"use strict";
import GameModal from "system/phaser/GameModal";


/** Modal handler (called by the gameObject) */
export default class GhostModalHandler extends GameModal {


    /**
     * Constructor for a new modal
     * @param properties
     * @param obj
     * @param game
     */
    constructor(properties, obj, game) {
        super(game);
        this.properties = properties;
        this.obj = obj;
    }
};