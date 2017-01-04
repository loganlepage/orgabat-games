'use strict';
import Phaser from 'phaser';

/**
 * Tilemap layer class
 * see https://github.com/photonstorm/phaser/blob/v2.4.4/src/tilemap/Tilemap.js
 */
export default class TilemapLayer extends Phaser.TilemapLayer {

    /**
     * Constructor for a new Tilemap layer
     * @param game
     * @param tilemap
     * @param layer
     * @param group
     */
    constructor(game, tilemap, layer, group) {
        if (group === undefined) group = game.world;
        let index = layer;
        if (typeof layer === 'string') index = tilemap.getLayerIndex(layer);
        if (index === null || index > tilemap.length) {
            console.warn('Tilemap.createLayer: Invalid layer ID given: ' + index);
            return;
        }
        super(game, tilemap, index, game.width, game.height);
        group.add(this);
        this.scaleTo(1);
    }

    /**
     * Scale the world with the tilemap
     * @param s
     */
    scaleTo(s) {
        let scale = this.game.SCALE * s;
        this.setScale(scale);
        this.resize(this.game.width + this.game.width / scale, this.game.height + this.game.height / scale );
        this.resizeWorld();
    }
};