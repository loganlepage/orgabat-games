"use strict";
import {State, Keyboard} from 'phaser';
import AJoystick from 'system/phaser/utils/joysticks/AJoystick';

/** State when we the game is loaded */
export default class Rules extends State {

    /** Called when the state must be created */
    create() {
        this.game.add.text(this.game.uiScale(80), this.game.uiScale(80), "Manutention et postures au travail",
            { font: 'Arial', fill: '#272727', fontSize: this.game.uiScale(21) });

        this.game.add.text(this.game.uiScale(80), this.game.uiScale(160),
            "Depuis quelques temps, je ressens des douleurs articulaires notamment au niveau du dos. En observant mes collègues, je m’aperçois que les situations de travail sur les chantiers sont assez contraignantes." + 
            "Indiquer si les situations de travail suivantes sont bonnes ou mauvaises pour la santé.",
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
            "Jouer",
            { font: 'Arial', fill: '#c0392b', fontSize: this.game.uiScale(16) }
        );
        text.inputEnabled = true;

        if(window.isMobile)
            new AJoystick(this.game);
        a.events.onInputDown.add(this.start, this);
        text.events.onInputDown.add(this.start, this);
        this.game.keys.addKey(Keyboard.ENTER).onDown.addOnce(this.start, this);
        this.game.keys.addKey(Keyboard.A).onDown.addOnce(this.start, this);
    }

    /** Called after create, to start the state */
    start() {
        this.game.state.start('play');
    }
};