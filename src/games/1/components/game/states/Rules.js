"use strict";
import {State} from 'phaser';
import Keyboard from 'system/phaser/utils/Keyboard';

/** State when we the game is loaded */
export default class Rules extends State {

    /** Called when the state must be created */
    create() {
        this.game.add.text(this.game.modalScale(80), this.game.modalScale(80), "Approvisionnez le chantier",
            { font: 'Arial', fill: '#272727', fontSize: this.game.modalScale(21) });

        this.game.add.text(this.game.modalScale(80), this.game.modalScale(160),
            "Vous devez apporter du liant dans l'entrepôt afin d'approvisionner le chantier. " +
            "Pour cela, choisissez un des trois outils (brouette, transpalette ou l'élévateur), " +
            "prennez du liant dans le mortier et apportez le au dépôt à l'intérieur du bâtiment.",
            { font: 'Arial', fill: '#272727', fontSize: this.game.modalScale(16),
                wordWrap: true, wordWrapWidth: this.game.world.width - this.game.modalScale(160) });

        this.game.add.text(this.game.modalScale(80), this.game.world.height - this.game.modalScale(80),
            "Appuyez sur [Entrer] pour voir l'introduction",
            { font: 'Arial', fill: '#c0392b', fontSize: this.game.modalScale(16) });

        let wKey = this.game.input.keyboard.addKey(Keyboard.ENTER);
        wKey.onDown.addOnce(this.video, this);
    }

    video() {
        this.game.iframe.setState({
            visible:true, closeCallback:this.start.bind(this),
            url:'https://www.youtube.com/embed/R7igzXWzMXc?rel=0&autoplay=1&controls=0&showinfo=0' }
        );
    }

    /** Called after create, to start the state */
    start() {
        this.game.iframe.setState({ visible:false });
        this.game.state.start('play');
    }
};