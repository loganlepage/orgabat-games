"use strict";
import {State} from 'phaser';

/** State when we win */
export default class Win extends State {

    /** Called when the state must be created */
    create() {
        let loadingText = "Partie terminée";
        let text = this.game.add.text(this.game.canvas.width*0.5, this.game.canvas.height*0.5, loadingText);
        //  Centers the text
        text.anchor.set(0.5);
        text.align = 'center';

        //  Our font + size
        text.font = 'Arial';
        text.fontSize = 70;
        text.fill = '#272727';
        this.start();
    }

    /** Called when game over, send score to API */
    start() {
        api.sendScore({id: game_id, time: 10, health: 3, organization: 4, business: 2});
    }
};