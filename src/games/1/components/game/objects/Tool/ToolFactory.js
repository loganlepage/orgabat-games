'use strict';
import {Group} from 'phaser';
import Tool from './Tool';

/** Tool Group Factory (called by play state) */
export default class ToolFactory extends Group {

    /**
     * Constructor for a new tool group
     * @param game
     * @param layer
     * @param tools
     */
    constructor(game, layer, tools) {
        super(game);
        for(let i in tools) {
            let tool = new Tool(
                this.game, layer, tools[i].name,
                tools[i].prop, tools[i].x, tools[i].y
            );
            this.add(tool.sprite);
        }
    }
};