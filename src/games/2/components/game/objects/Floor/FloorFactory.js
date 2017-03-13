'use strict';
import GameFactory from 'system/phaser/GameFactory';
import Floor from './Floor';

/** Floor Group Factory (called by play state) */
export default class FloorFactory extends GameFactory {

    /**
     * Constructor for a new material group
     * @param game
     * @param layer
     * @param floors
     */
    constructor(game, floors) {
        super(game); let floor; let previousHeight = 0;
        for(let i in floors) {
            floor = (new Floor(
                this.game, this, floors[i].name,
                floors[i].prop, 0, previousHeight
            )).sprite;
            previousHeight += floor._frame.height * game.SCALE;
            this.add(floor);
        }
    }
};

