'use strict';
var Game = Game || {};
Game.Utils = Game.Utils || {};

/**
 * Constructor for a new Position in the grid
 */
Game.Utils.Position = class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Get current grid position to pixel
     */
    getPixelFor(n) {
        return Position.getPixelAt(this[n]);
    }

    /**
     * Get a grid position in pixel
     */
    static getPixelAt(n) {
        return n * Game.TileSize;
    }
};