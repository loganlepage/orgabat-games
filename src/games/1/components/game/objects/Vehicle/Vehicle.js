"use strict";
import {Signal} from 'phaser';
import Config from '../../config/data';
import GameObject from 'system/phaser/GameObject';
import VehicleSprite from './VehicleSprite';
import VehicleModal from './VehicleModal';
import GameModal from 'system/phaser/GameModal';
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
     * @param name
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, layer, name, properties, x, y) {
        super(game, layer);
        this.container = new Inventary(properties.containerSize, Config.entities.materials);
        this.addSprite(new VehicleSprite(this.game, Position.getPixelAt(x), Position.getPixelAt(y), name, this));
        this.addModal(new VehicleModal(properties, this, game));
        this.configure(properties);
        this.ready = true;
    }

    /** Config & initialize */
    configure(properties) {
        this.speed = properties.speed * this.game.SCALE * 500; //500: convert to km/h in game
        this.speedRotate = properties.speedRotate * this.game.SCALE * 2; //2: convert to tr/min in game

        this.properties = properties;
        this.loading = this.game.add.sprite(0, 0, 'charge');
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

        this.game.keys.addKey(Keyboard.LEFT).onDown.add(this.moveTo, this);
        this.game.keys.addKey(Keyboard.RIGHT).onDown.add(this.moveTo, this);
        this.game.keys.addKey(Keyboard.UP).onDown.add(this.moveTo, this);
        this.game.keys.addKey(Keyboard.DOWN).onDown.add(this.moveTo, this);

        this.game.keys.addKey(Keyboard.LEFT).onUp.add(this.standTo, this);
        this.game.keys.addKey(Keyboard.RIGHT).onUp.add(this.standTo, this);
        this.game.keys.addKey(Keyboard.UP).onUp.add(this.standTo, this);
        this.game.keys.addKey(Keyboard.DOWN).onUp.add(this.standTo, this);

        this.game.keys.addKey(Keyboard.A);
        this.game.keys.addKey(Keyboard.Z);
        this.game.keys.addKey(Keyboard.E);
    }
    removeControls() {
        if(window.isMobile)
            this.guiJoystick.destroy();

        this.game.keys.addKey(Keyboard.LEFT).onDown.remove(this.moveTo, this);
        this.game.keys.addKey(Keyboard.RIGHT).onDown.remove(this.moveTo, this);
        this.game.keys.addKey(Keyboard.UP).onDown.remove(this.moveTo, this);
        this.game.keys.addKey(Keyboard.DOWN).onDown.remove(this.moveTo, this);

        this.game.keys.addKey(Keyboard.LEFT).onUp.remove(this.standTo, this);
        this.game.keys.addKey(Keyboard.RIGHT).onUp.remove(this.standTo, this);
        this.game.keys.addKey(Keyboard.UP).onUp.remove(this.standTo, this);
        this.game.keys.addKey(Keyboard.DOWN).onUp.remove(this.standTo, this);
    }

    /** Start & stop vehicle */
    startBy(player){
        if(this.stopProcess) return;
        this.startProcess = true;
        player.body.collideWorldBounds = false;
        this.sprite.body.static = false;
        this.sprite.body.fixedRotation = false;
        this.sprite.addChild(player);

        player.scale.setTo(1);
        player.reset(0, 0);
        player.anchor.set(this.properties.player_x, this.properties.player_y);
        this.sprite.anchor.setTo(0.5, 0.5); //don't change when vehicle is mounted
        player.idle("up");
        this.driver = player;
        this.modal.buttonInfoFeedback();
        this.modal.tooltipHandler(GameModal.HIDDEN, false, GameModal.FIXED);

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

        let x = this.driver.world.x, y = this.driver.world.y;
        this.sprite.body.static = true;
        this.sprite.body.fixedRotation = true;
        this.sprite.body.setZeroVelocity();

        this.collisionEventEnabled = false;
        this.game.layer.zDepth0.add(this.driver);
        this.driver.scale.setTo(this.game.SCALE);
        this.driver.anchor.set(0.5, 0.5);
        this.driver.reset(x, y);
        this.driver.body.collideWorldBounds = true;
        let driver = this.driver; this.driver = null;
        this.modal.buttonInfoFeedback(GameModal.HIDDEN);
        this.modal.droppedFeedback();

        this.onStopped.dispatch(driver.obj);
        setTimeout(() => {
            driver.obj.onCollisionBegin({object: this.sprite.body});
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
            switch(this.objectInCollision.sprite.obj.constructor) {
                case Vehicle:
                    this.modal.cantUseFeedback();
                    break;
                case Material:
                    if(this.game.keys.isDown(Keyboard.E)) return;
                    if(!(Type.isExist(this.objectInCollision.sprite.obj.properties.amount)
                        && Type.isExist(this.objectInCollision.sprite.obj.properties.amount.current)
                        && this.objectInCollision.sprite.obj.properties.amount.current > 0)) return;
                    const materialAmount = this.objectInCollision.sprite.obj.properties.amount.current;
                    const wantAmount = this.container.getSizeLeft() > materialAmount ? materialAmount : this.container.getSizeLeft();
                    this.objectInCollision.sprite.obj.getRessource(wantAmount, (name, amount) => {
                        this.container.addItem(name, amount);
                        this.onLoaded.dispatch(name, amount);
                        if(amount > 0 && this.container.getSizeLeft() === 0)
                            this.modal.containerFullFeedback();
                        if(this.container.getSizeUsed() > 0)
                            this.loading.visible = true;
                    });
                    break;
                default:
                    break;
            }
        }
        if(this.game.keys.isDown(Keyboard.E)) {
            let needed;
            switch(this.objectInCollision.sprite.obj.constructor) {
                case Material:
                    if(this.game.keys.isDown(Keyboard.A)) return;
                    needed = this.objectInCollision.sprite.key;
                    this.objectInCollision.sprite.obj.setRessource(this.container.getSumOf(needed), (name, amount) => {
                        this.container.delItem(needed, amount);
                        if(this.container.getSizeUsed() === 0)
                            this.loading.visible = false;
                    });
                    break;
                case Tool:
                    if(this.game.keys.isDown(Keyboard.A)) return;
                    needed = this.objectInCollision.sprite.obj.properties.needed;
                    this.objectInCollision.sprite.obj.setRessource(this.container.getSumOf(needed), (name, amount) => {
                        this.container.delItem(needed, amount);
                        if(this.container.getSizeUsed() === 0)
                            this.loading.visible = false;
                    });
                    break;
                default:
                    break;
            }
        }
    }
    onCollisionBegin(o) {
        switch(o.object.class) {
            case 'gameObject':
                super.onCollisionBegin(o.object);
                if(this.collisionEventEnabled) {
                    switch(this.objectInCollision.sprite.obj.constructor) {
                        case Player:
                            this.modal.tooltipHandler(GameModal.VISIBLE, Vehicle.COLLIDED, GameModal.CONTROLS_DISABLED, null, GameModal.FORCE);
                            break;
                        case Vehicle:
                            if(Type.isExist(this.driver)) {
                                this.onCollision.dispatch('vehicle');
                                this.modal.carefulFeedback('aux véhicules');
                            }
                            break;
                        default:
                            break;
                    }
                }

                break;
            case 'layer':
                this.onCollision.dispatch('wall');
                this.modal.carefulFeedback('aux murs');
                break;
            default:
                break;
        }
    }
    onCollisionEnd(o) {
        if(super.isCollidWith(Player, o))
            this.modal.tooltipHandler(GameModal.HIDDEN, null, GameModal.CONTROLS_ENABLED);
    }
    onMouseOver() {
        this.modal.tooltipHandler(GameModal.VISIBLE, super.isCollidWith(Player));
    }
    onMouseOut() {
        this.modal.tooltipHandler(GameModal.HIDDEN);
    }

    /** Move */
    moveUpdate(){
        if(!this.initializedAnimation) {
            this.driver.idle(this.properties.use);
            this.initializedAnimation = true;
        }
        const speed = this.speed * (this.properties.use === Keyboard.UP ? 1 : -1);

        if(this.properties.walkToMove && this.walkDirection.length > 0)
            this.driver.walk(this.properties.use);
        if(this.walkDirection[this.walkDirection.length-1] == Keyboard.UP)
            this.sprite.body.thrust(speed);
        if(this.walkDirection[this.walkDirection.length-1] == Keyboard.DOWN)
            this.sprite.body.reverse(speed);

        if(this.rotateDirection == Keyboard.LEFT) this.sprite.body.rotateLeft(this.speedRotate);
        if(this.rotateDirection == Keyboard.RIGHT) this.sprite.body.rotateRight(this.speedRotate);

        if(!this.game.keys.isDown(Keyboard.LEFT) && !this.game.keys.isDown(Keyboard.RIGHT))
            this.sprite.body.setZeroRotation();
    }
    moveTo(key){
        if(!this.game.controlsEnabled) return;

        if(key.keyCode == Keyboard.DOWN || key.keyCode == Keyboard.UP) {
            if(this.game.keys.isDown(Keyboard.LEFT)) this.moveTo(this.game.keys.addKey(Keyboard.LEFT));
            if(this.game.keys.isDown(Keyboard.RIGHT)) this.moveTo(this.game.keys.addKey(Keyboard.RIGHT));
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
    standTo(key) {
        if(!this.game.controlsEnabled) return;
        if(key.keyCode == Keyboard.UP || key.keyCode == Keyboard.DOWN)
        this.driver.idle(this.properties.use);
        const indexOf = this.walkDirection.indexOf(key.keyCode);
        if(indexOf > -1)
            this.walkDirection.splice(indexOf, 1);
        this.rotateDirection = null;
        if(this.game.keys.isDown(Keyboard.LEFT)) this.moveTo(this.game.keys.addKey(Keyboard.LEFT));
        if(this.game.keys.isDown(Keyboard.RIGHT)) this.moveTo(this.game.keys.addKey(Keyboard.RIGHT));

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