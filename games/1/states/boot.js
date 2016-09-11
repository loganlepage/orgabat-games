var Game = Game || {};
Game.State = Game.State || {};


/**
 * State to boot the game
 */
Game.State.bootState = {

    // Automatically called
    create: function() {
        game.state.start('load');
    }
};