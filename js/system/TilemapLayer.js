'use strict';
var Game = Game || {};
Game.System = Game.System || {};

//see https://github.com/photonstorm/phaser/blob/v2.4.4/src/tilemap/Tilemap.js
Game.System.TilemapLayer = class TilemapLayer extends Phaser.TilemapLayer {
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
    scaleTo(s) {
        let scale = Game.SCALE * s;
        this.setScale(scale);
        this.resize(this.game.width + this.game.width / scale, this.game.height + this.game.height / scale );
        this.resizeWorld();
    }
};