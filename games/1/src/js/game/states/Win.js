"use strict";
var Game = Game || {};
Game.State = Game.State || {};

/**
 * State when we win
 * @type {Win}
 */
Game.State.Win = class Win extends Phaser.State {

    /** Called when the state must be created */
    create() {
        let loadingText = "Partie terminée";
        console.log(this.game.world);
        let text = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2, loadingText);
        //  Centers the text
        text.anchor.set(0.5);
        text.align = 'center';

        //  Our font + size
        text.font = 'Arial';
        text.fontSize = 70;
        text.fill = '#272727';
    }
};