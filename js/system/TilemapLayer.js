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

        let sWidth = this.game.width / this.game.baseWidth;
        let sHeight = this.game.height / this.game.baseHeight;
        let ratio;
        if(this.game.baseHeight * sWidth > this.game.height) {
            this.setScale(sWidth);
            if(sWidth < 1) {
                ratio = 1 - sWidth + 1;
                this.resize(game.width  + game.width * ratio, game.height + game.height * ratio );
            }
        } else {
            this.setScale(sHeight);
            ratio = 1 - sHeight + 1;
            this.resize(game.width  + game.width * ratio, game.height + game.height * ratio );
        }
        this.resizeWorld();
    }


};