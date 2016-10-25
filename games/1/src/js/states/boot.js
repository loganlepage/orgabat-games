var Game = Game || {};
Game.State = Game.State || {};


/**
 * State to boot the game
 */
Game.State.bootState = {

    preload: function() {
        this.game.stage.backgroundColor = "#FFFFFF";
    },

    // Automatically called
    create: function() {
        this.initInfoCanvas();
        this.game.state.start('load');
    },

    initInfoCanvas: function() {
        this.game.infoCanvas = new Phaser.Game(250, '100%', Phaser.CANVAS, "info-canvas");
        this.game.infoCanvas.state.add('info', Game.State.infoState);
        this.game.infoCanvas.state.start('info');
    }
};