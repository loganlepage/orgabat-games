'use strict';
var Game = Game || {};
Game.Group = Game.Group || {};

/**
 * Tool Group Factory (called by play state)
 * @type {ToolGroup}
 */
Game.Group.ToolGroup = class ToolGroup extends Phaser.Group {

    /**
     * Constructor for a new tool group
     * @param game
     * @param layer
     * @param tools
     */
    constructor(game, layer, tools) {
        super(game);
        for(let i in tools) {
            let tool = new Game.Object.ToolObj(
                this.game, layer, tools[i].name,
                tools[i].prop, tools[i].x, tools[i].y
            );
            this.add(tool.sprite);
        }
    }
};