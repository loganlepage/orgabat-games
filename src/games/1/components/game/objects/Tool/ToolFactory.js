'use strict';
import GameFactory from 'system/phaser/GameFactory';
import Tool from './Tool';

/** Tool Group Factory (called by play state) */
export default class ToolFactory extends GameFactory {

    /**
     * Constructor for a new tool group
     * @param game
     * @param layer
     * @param tools
     */
    constructor(game, layer, tools) {
        super(game);
        for(let i in tools) {
            this.add((new Tool(
                this.game, layer, tools[i].name,
                tools[i].prop, tools[i].x, tools[i].y
            )).sprite);
        }
    }
};