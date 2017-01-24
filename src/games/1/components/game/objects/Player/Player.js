"use strict";
import Config from '../../config/data';
import GameObject from 'system/phaser/GameObject';
import PlayerSprite from './PlayerSprite';
import Position from 'system/phaser/utils/Position';
import {Keyboard} from 'phaser';
import CrossAJoystick from 'system/phaser/utils/joysticks/CrossAJoystick';

import Vehicle from '../Vehicle/Vehicle';

/** Player Object (include sprite and keys) */
export default class Player extends GameObject {

    /**
     * Constructor for a new character object
     * @param game
     * @param layer
     * @param x
     * @param y
     */
    constructor(game, layer, x, y) {
        super(game, layer);
        this.addSprite(new PlayerSprite(game, Position.getPixelAt(x), Position.getPixelAt(y), this.type, this));
        this.game.layer.zDepth0.add(this.sprite);
        this.configure();
        this.ready = true;
    }

    /** Config */
    configure() {
        this.speed = Config.entities.player.speed * this.game.SCALE;
        this.vehicleInUse = {object: null, started: false};
        this.setControls();
        this.game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.mountedEvent.add(this, "onVehicleMount");
            vehicle.obj.startedEvent.add(this, "onVehicleStart");
            vehicle.obj.stoppedEvent.add(this, "onVehicleStop");
        });
    }

    /** Set Cross and AZE buttons */
    setControls() {
        if(window.isSmartphone)
            this.GuiJoystick = new CrossAJoystick(this.game, this.game.layer.zDepthOverAll);

        this.game.keys.key(Keyboard.LEFT).onDown.add(this.moveTo, this);
        this.game.keys.key(Keyboard.RIGHT).onDown.add(this.moveTo, this);
        this.game.keys.key(Keyboard.UP).onDown.add(this.moveTo, this);
        this.game.keys.key(Keyboard.DOWN).onDown.add(this.moveTo, this);

        this.game.keys.key(Keyboard.LEFT).onUp.add(this.standTo, this);
        this.game.keys.key(Keyboard.RIGHT).onUp.add(this.standTo, this);
        this.game.keys.key(Keyboard.UP).onUp.add(this.standTo, this);
        this.game.keys.key(Keyboard.DOWN).onUp.add(this.standTo, this);

        this.game.keys.key(Keyboard.A);
    }

    removeControls() {
        if(window.isSmartphone)
            this.GuiJoystick.destroy();

        this.game.keys.key(Keyboard.LEFT).onDown.remove(this.moveTo, this);
        this.game.keys.key(Keyboard.RIGHT).onDown.remove(this.moveTo, this);
        this.game.keys.key(Keyboard.UP).onDown.remove(this.moveTo, this);
        this.game.keys.key(Keyboard.DOWN).onDown.remove(this.moveTo, this);

        this.game.keys.key(Keyboard.LEFT).onUp.remove(this.standTo, this);
        this.game.keys.key(Keyboard.RIGHT).onUp.remove(this.standTo, this);
        this.game.keys.key(Keyboard.UP).onUp.remove(this.standTo, this);
        this.game.keys.key(Keyboard.DOWN).onUp.remove(this.standTo, this);
    }

    /** Update, not called when the player mount a vehicle */
    update() {
        if(!this.ready) return;
        super.update();
        this.objectCollisionUpdate();
        this.moveUpdate();
    }

    /** Add comportements to an Object collided */
    objectCollisionUpdate() {
        if(this.objectInCollision === null) return; //if not collision, break
        if(this.game.keys.key(Keyboard.A).isDown)
            switch(this.objectInCollision.sprite.obj.constructor) {
                case Vehicle:
                    this.setVehicle(this.objectInCollision);
                    this.objectInCollision = null;
                    break;
                default:
                    break;
            }
    }
    onCollisionBegin(o) {
        if( this.vehicleInUse.object !== null ) return;
        super.onCollisionBegin(o.object);
    }

    /** Start vehicle */
    setVehicle(vehicle) {
        if(this.vehicleInUse.object !== null) return;
        if(vehicle.sprite.obj.startProcess === true) return;
        this.isMoving = false;
        vehicle.sprite.obj.startBy(this.sprite);
    }
    onVehicleMount(vehicle) { this.vehicleInUse.object = vehicle; }
    onVehicleStart() {
        this.vehicleInUse.started = true;
        this.removeControls();
    }
    onVehicleStop() {
        this.vehicleInUse.started = false;
        this.vehicleInUse.object = null;
        this.setControls();
    }

    /** Boucle d'animation pour les déplacements */
    moveUpdate() {
        this.sprite.body.setZeroVelocity();
        if(!this.isMoving) return;
        if(this.direction == Keyboard.LEFT)   this.sprite.body.moveLeft(this.speed);
        if(this.direction == Keyboard.RIGHT)  this.sprite.body.moveRight(this.speed);
        if(this.direction == Keyboard.UP)     this.sprite.body.moveUp(this.speed);
        if(this.direction == Keyboard.DOWN)   this.sprite.body.moveDown(this.speed);
    }
    /** Evenement onDown sur une touche directionnelle */
    moveTo(key) {
        if(!this.game.controlsEnabled) return;
        this.sprite.body.setZeroVelocity();
        this.sprite.walk(key.keyCode);
        this.direction = key.keyCode;
        this.isMoving = true;
    }
    /** Evenement onUp sur une touche directionnelle */
    standTo(key) {
        if(!this.game.controlsEnabled) return;
        this.sprite.body.setZeroVelocity();
        this.sprite.idle(key.keyCode);
        this.direction = null;
        this.isMoving = false;

        //Si on a une autre touche enfoncée, alors on relance l'évènement moveTo pour se déplacer
        if(this.game.keys.key(Keyboard.LEFT).isDown) this.moveTo(this.game.keys.key(Keyboard.LEFT));
        if(this.game.keys.key(Keyboard.RIGHT).isDown) this.moveTo(this.game.keys.key(Keyboard.RIGHT));
        if(this.game.keys.key(Keyboard.UP).isDown) this.moveTo(this.game.keys.key(Keyboard.UP));
        if(this.game.keys.key(Keyboard.DOWN).isDown) this.moveTo(this.game.keys.key(Keyboard.DOWN));
    }
};