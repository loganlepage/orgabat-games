'use strict';
import GameFactory from "system/phaser/GameFactory";
import Ghost from "./Ghost";

/** Ghost Group Factory (called by play state) */
export default class GhostFactory extends GameFactory {

    /**
     * Constructor for a new material group
     * @param game
     * @param qcms
     */
    constructor(game, ghosts) {
        super(game);
        for (const ghost of ghosts) {
            this.add((new Ghost(this.game, ghost.key, ghost.prop)).sprite);
        }
    }
};

