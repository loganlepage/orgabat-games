'use strict';
import GameFactory from 'system/phaser/GameFactory';
import Waste from './Waste';

/** Waste Group Factory (called by play state) */
export default class WasteFactory extends GameFactory {

    /**
     * Constructor for a new material group
     * @param game
     * @param wastes
     */
    constructor(game, wastes) {
        super(game);
        for(let i in wastes) {
            this.add((new Waste(
                this.game, wastes[i].name,
                wastes[i].prop, wastes[i].x, wastes[i].y
            )).sprite);
        }
    }
};

