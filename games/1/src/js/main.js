window.onload = function () {
    "use strict";
    (function() {
        let game = new Phaser.Game(window.innerWidth - 250, '100%', Phaser.CANVAS, "game-canvas");

        // Add each game states
        game.state.add('boot', Game.State.bootState);
        game.state.add('load', Game.State.loadState);
        game.state.add('menu', Game.State.menuState);
        game.state.add('play', Game.State.playState);
        game.state.add('win', Game.State.winState);

        // Calling the boot state
        game.state.start('boot');
    })();
    (function() {
        let game = new Phaser.Game(250, '100%', Phaser.CANVAS, "gabator-canvas");

        // Add each game states
        game.state.add('boot', Gabator.State.bootState);
        game.state.add('load', Gabator.State.loadState);
        game.state.add('play', Gabator.State.playState);

        // Calling the boot state
        game.state.start('boot');
    })();
};
