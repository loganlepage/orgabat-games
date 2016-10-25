window.onload = function () {
    let width = window.innerWidth - 250;
    let game = new Phaser.Game(width, '100%', Phaser.CANVAS, "game-canvas");

    // Add each game states
    game.state.add('boot', Game.State.bootState);
    game.state.add('load', Game.State.loadState);
    game.state.add('menu', Game.State.menuState);
    game.state.add('play', Game.State.playState);
    game.state.add('win', Game.State.winState);

    // Calling the boot state
    game.state.start('boot');
};
