'use strict';
import {Keyboard} from 'phaser';
import Type from 'system/utils/Type';
import Joystick, {Button} from '../Joystick';

export default class AJoystick extends Joystick {
    static get MARGIN() {return 30;}

    /**
     * Constructor for a new keyboard
     * @param game
     * @param parent
     */
    constructor(game, parent) {
        super(game, parent);
        const button = new Button(this.game, undefined, Keyboard.A, 0, 0, 'atlas', 'joystick/button_a.0');
        button.scale.set(this.game.uiScale(Joystick.SCALE));
        button.x = this.game.canvas.width - button.width - AJoystick.MARGIN;
        button.y = this.game.canvas.height - button.height - AJoystick.MARGIN;
        this.add(button);
    }
}