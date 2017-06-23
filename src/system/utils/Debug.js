'use strict';

/** Debug your game */
export default class Debug {

    static circle({x = 0, y = 0, diameter = 100}, game) {
        var graphics = game.add.graphics(0, 0);
        // graphics.lineStyle(2, 0xffd900, 1);
        graphics.beginFill(0xFF0000, 0.5);
        graphics.drawCircle(x * game.SCALE, y * game.SCALE, diameter);
        game.layer.zDepthOverAll.add(graphics);
        return graphics;
    }


};
