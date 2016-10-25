var Game = Game || {};
Game.State = Game.State || {};


/**
 * State to boot the game
 */
Game.State.infoState = {
    preload: function() {
        this.game.load.image('gabator-sleep', `${game_path}/assets/sprites/gabator-sleep.png`);
        this.game.load.image('gabator', `${game_path}/assets/sprites/gabator.png`);
        this.game.stage.backgroundColor = "#FFFFFF";
    },
    create: function() {
        this.gabator = this.game.add.sprite(0, 0, 'gabator-sleep');
        this.gabator.x = document.querySelector('#info-canvas > canvas').width / 2 - this.gabator.width / 2;
        this.gabator.y = document.querySelector('#info-canvas > canvas').height - this.gabator.height;
    },
    awakeGabator: function() {
        this.gabator.loadTexture('gabator', 0);
    }
};