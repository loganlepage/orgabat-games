'use strict';
import {Keyboard, Group} from 'phaser';
import Type from 'system/utils/Type';
import Joystick, {Button} from '../Joystick';

export default class CrossAzeJoystick extends Joystick {

    /**
     * Constructor for a new keyboard
     * @param game
     * @param parent
     */
    constructor(game, parent) {
        super(game, parent);

        const padV = new Group(game);
        new Button(this.game, padV, Keyboard.UP, 0, 0, 'pad_fleche');
        new Button(this.game, padV, Keyboard.DOWN, 0, 120, 'pad_r');
        padV.scale.set(this.game.uiScale(Joystick.SCALE));
        padV.x = padV.width/2 + Joystick.MARGIN;
        padV.y = this.game.canvas.height - padV.height - Joystick.MARGIN;
        this.add(padV);

        const padH = new Group(game);
        const leftB = new Button(this.game, padH, Keyboard.LEFT, 0, 0, 'pad_fleche', {angle: -90});
        const rightB = new Button(this.game, padH, Keyboard.RIGHT, 0, 0, 'pad_fleche', {angle: 90});
        leftB.anchor.setTo(0.5, 1);
        rightB.anchor.setTo(0.5, 1);
        padH.scale.set(this.game.uiScale(Joystick.SCALE));
        padH.x = this.game.canvas.width - padH.width/2 - Joystick.MARGIN;
        padH.y = this.game.canvas.height - padH.height/2 - Joystick.MARGIN;
        this.add(padH);

        const aze = new Group(game);
        new Button(this.game, aze, Keyboard.A, 0, 0, 'button_a');
        new Button(this.game, aze, Keyboard.E, 125, -60, 'button_e');
        new Button(this.game, aze, Keyboard.Z, 250, -120, 'button_z');
        aze.scale.set(this.game.uiScale(Joystick.SCALE));
        aze.x = this.game.canvas.width - aze.width - Joystick.MARGIN;
        aze.y = this.game.canvas.height - aze.height/2 - Joystick.MARGIN - padH.height;
        this.add(aze);
    }
}