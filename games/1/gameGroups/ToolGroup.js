'use strict';
var Game = Game || {};
Game.Group = Game.Group || {};

/**
 * tool group (called by play state)
 */
Game.Group.ToolGroup = class ToolGroup extends Phaser.Group {
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