var Game = Game || {};
Game.State = Game.State || {};


/**
 * State when we win
 */
Game.State.winState = {
    create: function() {
        let loadingText = "Partie terminée";
        let text = this.game.add.text(this.game.world.centerX, 150, loadingText);
        //  Centers the text
        text.anchor.set(0.5);
        text.align = 'center';

        //  Our font + size
        text.font = 'Arial';
        text.fontWeight = 'bold';
        text.fontSize = 70;
        text.fill = '#ffffff';
    }
};