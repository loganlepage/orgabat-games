let game = new Phaser.Game('100%', '100%', Phaser.CANVAS, "gameDiv");

// Add each game states
game.state.add('boot', Game.State.bootState);
game.state.add('load', Game.State.loadState);
game.state.add('menu', Game.State.menuState);
game.state.add('play', Game.State.playState);
game.state.add('win', Game.State.winState);

// Calling the boot state
game.state.start('boot');


