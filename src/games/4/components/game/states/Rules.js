"use strict";
import Phaser, {State, Keyboard} from 'phaser';
import AJoystick from 'system/phaser/utils/joysticks/AJoystick';

/** State when we the game is loaded */
export default class Rules extends State {

    /** Called when the state must be created */
    create() {
        this.game.add.text(this.game.uiScale(80), this.game.uiScale(80), "L’approvisionnement",
            {font: 'Arial', fill: '#272727', fontSize: this.game.uiScale(21)});

        this.game.add.text(this.game.uiScale(80), this.game.uiScale(160),
            "Tu viens d'arriver sur l'entrepot et tu dois charger le camion avant de te rendre sur le chantier.\n" +
            "Le but de ce chantier est de réaliser un mur en agglo de 20 en retour d'angle.\n" + 
            "Sélectionne les différents éléments nécessaires à ce chantier pour les déposer dans le camion.\n",
            {
                font: 'Arial', fill: '#272727', fontSize: this.game.uiScale(16),
                wordWrap: true, wordWrapWidth: this.game.world.width - this.game.uiScale(160)
            });

        const a = this.game.add.sprite(
            this.game.uiScale(80),
            this.game.world.height - this.game.uiScale(80 + 12),
            'atlas', 'modal/item/button_a'
        );
        a.scale.set(this.game.uiScale(0.8));
        a.inputEnabled = true;

        const text = this.game.add.text(
            this.game.uiScale(135), this.game.world.height - this.game.uiScale(80),
            "Continuer",
            {font: 'Arial', fill: '#c0392b', fontSize: this.game.uiScale(16)}
        );
        text.inputEnabled = true;

        if (window.isMobile)
            new AJoystick(this.game);
        a.events.onInputDown.add(this.start, this);
        text.events.onInputDown.add(this.start, this);
        this.game.keys.addKey(Keyboard.ENTER).onDown.addOnce(this.start, this);
        this.game.keys.addKey(Keyboard.A).onDown.addOnce(this.start, this);
        this.game.keys.addKey(Keyboard.SPACEBAR).onDown.addOnce(this.start, this);
    }

    /** Called after create, to start the state */
    start() {
        this.game.state.start('play');
    }
};