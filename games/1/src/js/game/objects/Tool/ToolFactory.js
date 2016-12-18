'use strict';
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * Tool Group Factory (called by play state)
 * @type {ToolFactory}
 */
Game.Object.ToolFactory = class ToolFactory extends Phaser.Group {

    /**
     * Constructor for a new tool group
     * @param game
     * @param layer
     * @param tools
     */
    constructor(game, layer, tools) {
        super(game);
        for(let i in tools) {
            let tool = new Game.Object.Tool(
                this.game, layer, tools[i].name,
                tools[i].prop, tools[i].x, tools[i].y
            );
            this.add(tool.sprite);
        }
    }
};