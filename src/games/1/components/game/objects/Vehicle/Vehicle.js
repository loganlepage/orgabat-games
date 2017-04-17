"use strict";
import {Signal} from 'phaser';
import Config from '../../config/data';
import GameObject from 'system/phaser/GameObject';
import VehicleSprite from './VehicleSprite';
import VehicleModalHandler from './VehicleModalHandler';
import Position from 'system/phaser/utils/Position';
import Inventary from 'system/phaser/Inventary';
import Type from 'system/utils/Type';
import {Keyboard} from 'phaser';
import PadAzeJoystick from 'system/phaser/utils/joysticks/PadAzeJoystick';

import Material from '../Material/Material';
import Player from '../Player/Player';
import Tool from '../Tool/Tool';

/** Vehicle Object (include sprite and modals) */
export default class Vehicle extends GameObject {

    ready = false;
    startProcess = false;
    stopProcess = false;

    onMounted = new Signal();
    onUnmounted = new Signal();
    onStarted = new Signal();
    onStopped = new Signal();
    onLoaded = new Signal(); //Si on charge un véhicule, on remplis un objectif
    onCollision = new Signal(); //Si on tape un véhicule/mur, on baisse le score

    speed = 0;
    speedRotate = 0;
    driver = null;
    rotateDirection = null;
    walkDirection = null;

    /**
     * Constructor for a new vehicle object
     * @param game
     * @param layer
     * @param type
     * @param properties
     * @param x
     * @param y
     * @param sprite
     */
    constructor(game, layer, type, properties, x, y, sprite = null) {
        super(game, layer);
        this.container = new Inventary(properties.containerSize, Config.entities.materials);
        this.addSprite(
            Type.isInstanceOf(sprite, VehicleSprite)
            ? sprite
            : new VehicleSprite(this.game, Position.getPixelAt(x), Position.getPixelAt(y), type, this)
        );
        this.addModalHandler(new VehicleModalHandler(properties, this, game));
        this.configure(properties);
        this.ready = true;
    }

    /** Config & initialize */
    configure(properties) {
        this.speed = properties.speed * this.game.SCALE * 500; //500: convert to km/h in game
        this.speed = this.speed * (properties.use === Keyboard.UP ? 1 : -1);
        this.speedRotate = properties.speedRotate * this.game.SCALE * 2; //2: convert to tr/min in game

        this.properties = properties;
        this.loading = this.game.add.sprite(0, 0, 'atlas', 'jeu1/charge');
        this.sprite.addChild(this.loading);
        this.loading.anchor.set(this.properties.loading_x, this.properties.loading_y);
        this.loading.visible = false;
        this.sprite.body.damping = 1;
    }

    /** Set Cross and AZE buttons */
    setControls() {
        if(this.driver === null) return;
        if(window.isMobile)
            this.guiJoystick = new PadAzeJoystick(this.game, this.game.layer.zDepthOverAll);
        this.rotateDirection = null;
        this.walkDirection = [];

        this.game.keys.addKey(Keyboard.LEFT).onDown.add(this.onMoveRequest, this);
        this.game.keys.addKey(Keyboard.RIGHT).onDown.add(this.onMoveRequest, this);
        this.game.keys.addKey(Keyboard.UP).onDown.add(this.onMoveRequest, this);
        this.game.keys.addKey(Keyboard.DOWN).onDown.add(this.onMoveRequest, this);

        this.game.keys.addKey(Keyboard.LEFT).onUp.add(this.onStandRequest, this);
        this.game.keys.addKey(Keyboard.RIGHT).onUp.add(this.onStandRequest, this);
        this.game.keys.addKey(Keyboard.UP).onUp.add(this.onStandRequest, this);
        this.game.keys.addKey(Keyboard.DOWN).onUp.add(this.onStandRequest, this);

        this.game.keys.addKey(Keyboard.A);
        this.game.keys.addKey(Keyboard.Z);
        this.game.keys.addKey(Keyboard.E);
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

    /** Start & stop vehicle */
    startBy(player){
        if(this.stopProcess) return;
        this.startProcess = true;
        this.objectInCollision = null;
        player.obj.objectInCollision = null;

        player.body.collideWorldBounds = false;
        this.sprite.body.static = false;
        this.sprite.body.fixedRotation = false;
        this.sprite.addChild(player);

        player.idle(`${this.properties.use}_topview`);
        player.scale.setTo(1);
        player.reset(0, 0);
        player.anchor.set(this.properties.player_x, this.properties.player_y);
        this.sprite.anchor.setTo(0.5, 0.5); //don't change when vehicle is mounted
        this.driver = player;
        this.modalHandler.buttonInfoFeedback();

        this.initializedAnimation = false;
        this.onMounted.dispatch(this);
        setTimeout(() => {
            this.setControls(); //une fois que c'est démarré on ajoute les controls
            this.onStarted.dispatch(this);
            this.startProcess = false;
        }, 200);
    }
    stop(){
        if(this.startProcess) return;
        this.stopProcess = true;
        this.removeControls();

        const x = this.driver.world.x, y = this.driver.world.y;
        this.sprite.body.static = true;
        this.sprite.body.fixedRotation = true;
        this.sprite.body.setZeroVelocity();

        this.collisionEventEnabled = false;
        this.game.layer.zDepth0.add(this.driver);
        this.driver.scale.setTo(this.game.SCALE);
        this.driver.anchor.set(0.5, 0.5);
        this.driver.reset(x, y);
        this.driver.body.collideWorldBounds = true;
        const driver = this.driver; this.driver = null;
        this.modalHandler.droppedFeedback();

        this.onStopped.dispatch(driver.obj);
        setTimeout(() => {
            driver.obj.objectInCollision = this.sprite.body;
            this.objectInCollision = driver.body;
            this.collisionEventEnabled = true;
            this.onUnmounted.dispatch(driver.obj);
            this.stopProcess = false;
        }, 200);
    }

    /** Update */
    update() {
        if(!this.ready || this.startProcess || this.stopProcess) return;
        super.update();
        if(this.driver === null) return;

        //Fix un glitch: le personnage se déplaçait quand on cognait l'arrière d'un véhicule dans un angle
        if(this.driver.x != 0 || this.driver.y != 0)
            this.driver.reset(0, 0);

        this.objectCollisionUpdate();
        this.moveUpdate();
        if(this.game.keys.isDown(Keyboard.Z) && this.driver.obj.vehicleInUse.object !== null)
            this.stop();
    }

    /** Add events comportements */
    objectCollisionUpdate() {
        if(this.objectInCollision === null) return; //if not collision, break
        if(this.game.keys.isDown(Keyboard.A)) {
            if(Type.isInstanceOf(this.objectInCollision.sprite.obj, Vehicle)) {
                this.modalHandler.cantUseFeedback();
            }
            else if(Type.isInstanceOf(this.objectInCollision.sprite.obj, Material)) {
                if(this.game.keys.isDown(Keyboard.E) || this.container.getSizeLeft() === 0) return;
                if(!(Type.isExist(this.objectInCollision.sprite.obj.properties.amount)
                    && Type.isExist(this.objectInCollision.sprite.obj.properties.amount.current)
                    && this.objectInCollision.sprite.obj.properties.amount.current > 0)) return;
                const materialAmount = this.objectInCollision.sprite.obj.properties.amount.current;
                const wantAmount = this.container.getSizeLeft() > materialAmount ? materialAmount : this.container.getSizeLeft();
                this.objectInCollision.sprite.obj.getRessource(wantAmount, (name, amount) => {
                    this.container.addItem(name, amount);
                    this.onLoaded.dispatch(name, amount);
                    if(amount > 0 && this.container.getSizeLeft() === 0)
                        this.modalHandler.containerFullFeedback();
                    if(this.container.getSizeUsed() > 0)
                        this.loading.visible = true;
                });
            }
        }
        if(this.game.keys.isDown(Keyboard.E)) {
            let needed;
            if(Type.isInstanceOf(this.objectInCollision.sprite.obj, Material)) {
                if(this.game.keys.isDown(Keyboard.A)) return;
                needed = this.objectInCollision.sprite.obj.type;
                if(this.container.getSumOf(needed) === 0) return;
                this.objectInCollision.sprite.obj.setRessource(this.container.getSumOf(needed), (name, amount) => {
                    this.container.delItem(needed, amount);
                    if(this.container.getSizeUsed() === 0)
                        this.loading.visible = false;
                });
            }
            else if(Type.isInstanceOf(this.objectInCollision.sprite.obj, Tool)) {
                if(this.game.keys.isDown(Keyboard.A)) return;
                needed = this.objectInCollision.sprite.obj.properties.needed;
                if(this.container.getSumOf(needed) === 0) return;
                this.objectInCollision.sprite.obj.setRessource(this.container.getSumOf(needed), (name, amount) => {
                    this.container.delItem(needed, amount);
                    if(this.container.getSizeUsed() === 0)
                        this.loading.visible = false;
                });
            }
        }
    }
    onCollisionBegin(o) {
        switch(o.object.class) {
            case 'gameObject':
                this.objectInCollision = o.object;
                if(this.collisionEventEnabled) {
                    if(Type.isInstanceOf(this.objectInCollision.sprite.obj, Player)) {
                        this.modalHandler.showTooltip(Vehicle.COLLIDED);
                    }
                    else if(Type.isInstanceOf(this.objectInCollision.sprite.obj, Vehicle) && Type.isExist(this.driver)) {
                        this.onCollision.dispatch('vehicle');
                        this.modalHandler.carefulFeedback('aux véhicules');
                    }
                }
                break;
            case 'layer':
                this.onCollision.dispatch('wall');
                this.modalHandler.carefulFeedback('aux murs');
                break;
            default:
                break;
        }
    }
    onCollisionEnd(o) {
        if(super.isCollidWith(Player, o))
            this.onCollisionEndHandled.dispatch();
    }
    onMouseOver() {
        this.modalHandler.showMouseTooltip(super.isCollidWith(Player));
    }
    onMouseOut() {
        this.onMouseOutHandled.dispatch();
    }

    /** Move */
    moveUpdate(){
        if(this.properties.walkToMove && this.walkDirection.length > 0)
            this.driver.walk(`${this.properties.use}_topview`);
        if(this.walkDirection[this.walkDirection.length-1] == Keyboard.UP)
            this.sprite.body.thrust(this.speed);
        if(this.walkDirection[this.walkDirection.length-1] == Keyboard.DOWN)
            this.sprite.body.reverse(this.speed);

        if(this.rotateDirection == Keyboard.LEFT) this.sprite.body.rotateLeft(this.speedRotate);
        if(this.rotateDirection == Keyboard.RIGHT) this.sprite.body.rotateRight(this.speedRotate);

        if(!this.game.keys.isDown(Keyboard.LEFT) && !this.game.keys.isDown(Keyboard.RIGHT))
            this.sprite.body.setZeroRotation();
    }
    onMoveRequest(key){
        if(!this.game.controlsEnabled) return;
        if(key.keyCode == Keyboard.DOWN || key.keyCode == Keyboard.UP) {
            if(this.game.keys.isDown(Keyboard.LEFT)) this.onMoveRequest(this.game.keys.addKey(Keyboard.LEFT));
            if(this.game.keys.isDown(Keyboard.RIGHT)) this.onMoveRequest(this.game.keys.addKey(Keyboard.RIGHT));
        }

        //si on recule on tourne dans l'autre sens (pour faire réaliste)
        if(key.keyCode == Keyboard.LEFT)
            this.rotateDirection = !this.game.keys.isDown(Keyboard.DOWN) ? Keyboard.LEFT : Keyboard.RIGHT;
        if(key.keyCode == Keyboard.RIGHT)
            this.rotateDirection = !this.game.keys.isDown(Keyboard.DOWN) ? Keyboard.RIGHT : Keyboard.LEFT;

        if((key.keyCode == Keyboard.UP || key.keyCode == Keyboard.DOWN)
            && this.walkDirection.indexOf(key.keyCode) === -1)
                this.walkDirection.push(key.keyCode);
    }
    onStandRequest(key) {
        if(!this.game.controlsEnabled) return;
        if(key.keyCode == Keyboard.UP || key.keyCode == Keyboard.DOWN)
            this.driver.idle(`${this.properties.use}_topview`);
        const indexOf = this.walkDirection.indexOf(key.keyCode);
        if(indexOf > -1)
            this.walkDirection.splice(indexOf, 1);
        this.rotateDirection = null;
        if(this.game.keys.isDown(Keyboard.LEFT)) this.onMoveRequest(this.game.keys.addKey(Keyboard.LEFT));
        if(this.game.keys.isDown(Keyboard.RIGHT)) this.onMoveRequest(this.game.keys.addKey(Keyboard.RIGHT));

        // Si une touche devrait être enfoncée mais ne l'est pas
        // évènement non détecté, ex: clic hors canvas
        const clear = (key) => {
            if(!this.game.keys.isDown(key)) {
                const indexOf = this.walkDirection.indexOf(key);
                if(indexOf > -1) this.walkDirection.splice(indexOf, 1);
            }
        };
        clear(Keyboard.UP);
        clear(Keyboard.DOWN);
    }
};