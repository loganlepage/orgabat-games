window.onload = function () {
    "use strict";

    /** Init the game canvas */
    let game = new Game.Canvas(window.innerWidth - 250, '100%', Phaser.CANVAS, "game-canvas");
    game.start();

    /** Init the gabator canvas */
    let gabator = new Gabator.Canvas(250, '100%', Phaser.CANVAS, "gabator-canvas");
    gabator.start();
};
