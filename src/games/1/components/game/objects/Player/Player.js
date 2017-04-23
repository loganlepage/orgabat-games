"use strict";
import Config from '../../config/data';
import GameObject from 'system/phaser/GameObject';
import PlayerSprite from './PlayerSprite';
import Position from 'system/phaser/utils/Position';
import {Keyboard} from 'phaser';
import CrossAJoystick from 'system/phaser/utils/joysticks/CrossAJoystick';

import Vehicle from '../Vehicle/Vehicle';
import Type from 'system/utils/Type';

/** Player Object (include sprite and keys) */
export default class Player extends GameObject {

    ready = false;
    direction = [];
    isMoving = false;


    /**
     * Constructor for a new character object
     * @param game
     * @param layer
     * @param x
     * @param y
     */
    constructor(game, layer, x, y) {
        super(game, layer);
        this.addSprite(new PlayerSprite(game, Position.getPixelAt(x), Position.getPixelAt(y), 'player/0', this));
        this.game.layer.zDepth1.add(this.sprite);
        this.configure();
        this.ready = true;
    }

    /** Config */
    configure() {
        this.speed = Config.entities.player.speed * this.game.SCALE;
        this.vehicleInUse = {object: null, started: false};
        this.setControls();
        this.game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.onMounted.add(this.onVehicleMount, this);
            vehicle.obj.onStarted.add(this.onVehicleStart, this);
            vehicle.obj.onStopped.add(this.onVehicleStop, this);
        });
    }

    /** Set Cross and AZE buttons */
    setControls() {
        if(window.isMobile)
            this.guiJoystick = new CrossAJoystick(this.game, this.game.layer.zDepthOverAll);
        this.direction = [];

        this.game.keys.addKey(Keyboard.LEFT).onDown.add(this.onMoveRequest, this);
        this.game.keys.addKey(Keyboard.RIGHT).onDown.add(this.onMoveRequest, this);
        this.game.keys.addKey(Keyboard.UP).onDown.add(this.onMoveRequest, this);
        this.game.keys.addKey(Keyboard.DOWN).onDown.add(this.onMoveRequest, this);

        this.game.keys.addKey(Keyboard.LEFT).onUp.add(this.onStandRequest, this);
        this.game.keys.addKey(Keyboard.RIGHT).onUp.add(this.onStandRequest, this);
        this.game.keys.addKey(Keyboard.UP).onUp.add(this.onStandRequest, this);
        this.game.keys.addKey(Keyboard.DOWN).onUp.add(this.onStandRequest, this);

        this.game.keys.addKey(Keyboard.A);
    }

    removeControls() {
        if(window.isMobile) this.guiJoystick.destroy();

        this.game.keys.addKey(Keyboard.LEFT).onDown.removeAll(this);
        this.game.keys.addKey(Keyboard.RIGHT).onDown.removeAll(this);
        this.game.keys.addKey(Keyboard.UP).onDown.removeAll(this);
        this.game.keys.addKey(Keyboard.DOWN).onDown.removeAll(this);

        this.game.keys.addKey(Keyboard.LEFT).onUp.removeAll(this);
        this.game.keys.addKey(Keyboard.RIGHT).onUp.removeAll(this);
        this.game.keys.addKey(Keyboard.UP).onUp.removeAll(this);
        this.game.keys.addKey(Keyboard.DOWN).onUp.removeAll(this);
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
        if(this.game.keys.isDown(Keyboard.A)) {
            if(Type.isInstanceOf(this.objectInCollision.sprite.obj, Vehicle))
                this.setVehicle(this.objectInCollision);
        }
    }
    onCollisionBegin(o) {
        if( this.vehicleInUse.object !== null ) return;
        this.objectInCollision = o.object;
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
        this.sprite.idle(Keyboard.DOWN);
        this.setControls();
    }

    /** Boucle d'animation pour les déplacements */
    moveUpdate() {
        this.sprite.body.setZeroVelocity();
        if(!this.isMoving && this.direction.length === 0) return;
        this.sprite.walk(this.direction[this.direction.length-1]);
        if(this.direction[this.direction.length-1] == Keyboard.LEFT)   this.sprite.body.moveLeft(this.speed);
        if(this.direction[this.direction.length-1] == Keyboard.RIGHT)  this.sprite.body.moveRight(this.speed);
        if(this.direction[this.direction.length-1] == Keyboard.UP)     this.sprite.body.moveUp(this.speed);
        if(this.direction[this.direction.length-1] == Keyboard.DOWN)   this.sprite.body.moveDown(this.speed);
    }
    /** Evenement onDown sur une touche directionnelle */
    onMoveRequest(key) {
        if(!this.game.controlsEnabled) return;
        if(this.direction.indexOf(key.keyCode) === -1)
            this.direction.push(key.keyCode);
        this.isMoving = true;
    }
    /** Evenement onUp sur une touche directionnelle */
    onStandRequest(key) {
        if(!this.game.controlsEnabled) return;
        this.sprite.idle(key.keyCode);
        const indexOf = this.direction.indexOf(key.keyCode);
        if(indexOf > -1)
            this.direction.splice(indexOf, 1);
        if(this.direction.length === 0)
            this.isMoving = false;

        // Si une touche devrait être enfoncée mais ne l'est pas
        // évènement non détecté, ex: clic hors canvas
        const clear = (key) => {
            if(!this.game.keys.isDown(key)) {
                const indexOf = this.direction.indexOf(key);
                if(indexOf > -1) this.direction.splice(indexOf, 1);
            }
        };
        clear(Keyboard.LEFT);
        clear(Keyboard.RIGHT);
        clear(Keyboard.UP);
        clear(Keyboard.DOWN);
    }
};