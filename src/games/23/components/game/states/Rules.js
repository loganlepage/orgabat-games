"use strict";
import Phaser, {State, Keyboard} from 'phaser';
import AJoystick from 'system/phaser/utils/joysticks/AJoystick';

/** State when we the game is loaded */
export default class Rules extends State {

    /** Called when the state must be created */
    create() {
        this.game.add.text(this.game.uiScale(80), this.game.uiScale(80), "La protection",
            {font: 'Arial', fill: '#272727', fontSize: this.game.uiScale(21)});

        this.game.add.text(this.game.uiScale(80), this.game.uiScale(160),
            "Objectif: A partir de la situation de travail ci-dessous, analyser le risque, trouver une mesure de prévention et secourir la victime.\n\nSituation de travail: Vous devez remplacer quelques mètres carrés d’ardoises avec votre patron. Comme d’habitude, pour ces petites réparations qui ne sont pas fréquentes, il veut installer une échelle pour monter sur le toit et deux autres posées bout à bout sur les ardoises. Dans ce cas, aucune échelle n’est attachée. Elles tiennent simplement en appui sur la gouttière. De plus, il pleut. En se penchant pour atteindre une ardoise, l’échelle glisse. Votre patron chute de 7 mètres. Sa moelle épinière est sectionnée, il se retrouve en incapacité de travail pendant un an avec une inaptitude définitive à exercer son métier.",
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