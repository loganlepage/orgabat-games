'use strict';
import GameFactory from 'system/phaser/GameFactory';
import Floor from './Floor';
import Config from '../../config/data';

/** Floor Group Factory (called by play state) */
export default class FloorFactory extends GameFactory {

    /**
     * Constructor for a new material group
     * @param game
     * @param floors
     */
    constructor(game, floors) {
        super(game); let floor; let previousHeight = 0;
        let tab = [];
        for(let i in floors) {
            floor = (new Floor(
                this.game, this, floors[i].name,
                floors[i].prop, 0, previousHeight
            )).sprite;
            previousHeight += (floor._frame.height - Config.offsetHeight) * game.SCALE;
            tab.push(floor);
        }
        let j = tab.length;
        while(j--) {
            this.add(tab[j]); //bring to top
        }
    }
};

