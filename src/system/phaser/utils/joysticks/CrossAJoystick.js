'use strict';
import {Keyboard, Group} from 'phaser';
import Type from 'system/utils/Type';
import Joystick, {Button} from '../Joystick';
import AJoystick from './AJoystick';

export default class CrossAJoystick extends Joystick {

    /**
     * Constructor for a new keyboard
     * @param game
     * @param parent
     */
    constructor(game, parent) {
        super(game, parent);

        const cross = new Group(game);
        new Button(this.game, cross, Keyboard.LEFT, 0, 0, 'atlas', 'joystick/cross.0', {angle: 0});
        new Button(this.game, cross, Keyboard.UP, 0, 0, 'atlas', 'joystick/cross.0', {angle: 90});
        new Button(this.game, cross, Keyboard.RIGHT, 0, 0, 'atlas', 'joystick/cross.0', {angle: 180});
        new Button(this.game, cross, Keyboard.DOWN, 0, 0, 'atlas', 'joystick/cross.0', {angle: 270});
        cross.forEach((b) => b.anchor.setTo(1, 1));
        cross.angle = -45;
        cross.scale.set(this.game.uiScale(Joystick.SCALE));
        cross.x = cross.width * 0.5 + Joystick.MARGIN;
        cross.y = this.game.canvas.height - cross.height * 0.5 - Joystick.MARGIN;
        this.add(cross);

        const button =  new Button(this.game, undefined, Keyboard.A, 0, 0, 'atlas', 'joystick/button_a.0');
        button.scale.set(this.game.uiScale(Joystick.SCALE));
        button.x = this.game.canvas.width - button.width - AJoystick.MARGIN - this.game.uiScale(40);
        button.y = this.game.canvas.height - button.height - Joystick.MARGIN - this.game.uiScale(40);
        this.add(button);
    }
}