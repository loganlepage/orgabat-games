"use strict";
import Phaser, {State, Keyboard} from 'phaser';
import AJoystick from 'system/phaser/utils/joysticks/AJoystick';

/** State when we the game is loaded */
export default class Rules extends State {

    /** Called when the state must be created */
    create() {
        this.game.add.text(this.game.uiScale(80), this.game.uiScale(80), "Approvisionnez le chantier",
            { font: 'Arial', fill: '#272727', fontSize: this.game.uiScale(21) });

        this.game.add.text(this.game.uiScale(80), this.game.uiScale(160),
            "Vous devez apporter du liant dans l'entrepôt afin d'approvisionner le chantier.\n" +
            "Pour cela, choisissez un des trois outils (brouette, transpalette ou l'élévateur), " +
            "prenez du liant dans le mortier et apportez le au dépôt à l'intérieur du bâtiment.",
            { font: 'Arial', fill: '#272727', fontSize: this.game.uiScale(16),
                wordWrap: true, wordWrapWidth: this.game.world.width - this.game.uiScale(160) });

        const a = this.game.add.sprite(
            this.game.uiScale(80),
            this.game.world.height - this.game.uiScale(80+12),
            'atlas', 'modal/item/button_a'
        );
        a.scale.set(this.game.uiScale(0.8));
        a.inputEnabled = true;

        const text = this.game.add.text(
            this.game.uiScale(135), this.game.world.height - this.game.uiScale(80),
            "Voir l'introduction",
            { font: 'Arial', fill: '#c0392b', fontSize: this.game.uiScale(16) }
        );
        text.inputEnabled = true;

        if(window.isMobile)
            new AJoystick(this.game);
        a.events.onInputDown.add(this.video, this);
        text.events.onInputDown.add(this.video, this);
        this.game.keys.addKey(Keyboard.ENTER).onDown.addOnce(this.video, this);
        this.game.keys.addKey(Keyboard.A).onDown.addOnce(this.video, this);
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