"use strict";
import Config from '../../config/data';
import GameObject from 'system/phaser/GameObject';
import VehicleSprite from './VehicleSprite';
import VehicleModal from './VehicleModal';
import GameModal from 'system/phaser/GameModal';
import Position from 'system/phaser/utils/Position';
import Inventary from 'system/phaser/Inventary';
import EventHandler from 'system/utils/EventHandler';
import Keyboard from 'system/phaser/utils/Keyboard';
import Type from 'system/utils/Type';

import Material from '../Material/Material';
import Player from '../Player/Player';
import Tool from '../Tool/Tool';

/** Vehicle Object (include sprite and modals) */
export default class Vehicle extends GameObject {

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
        this.vehicleMountedEvent = new EventHandler();
        this.vehicleUnmountedEvent = new EventHandler();
        this.vehicleStartedEvent = new EventHandler();
        this.vehicleStopedEvent = new EventHandler();
        this.startProcess = false;
        this.stopProcess = false;
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
        this.driver = null;
    }

    /** Start & stop vehicle */
    startBy(player, keys){
        if(this.stopProcess) return;
        this.startProcess = true;
        this.keys = keys;
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
        this.modal.howDropFeedback();
        this.modal.tooltipHandler(GameModal.HIDDEN, false, GameModal.FIXED);

        this.initializedAnimation = false;
        this.vehicleMountedEvent.fire(this);
        setTimeout(() => {
            this.vehicleStartedEvent.fire(this);
            this.startProcess = false;
        }, 200);
    }
    stop(){
        if(this.startProcess) return;
        this.stopProcess = true;
        let x = this.driver.world.x, y = this.driver.world.y;
        this.sprite.body.static = true;
        this.sprite.body.fixedRotation = true;
        this.sprite.body.setZeroVelocity();

        this.collisionEventEnabled = false;
        this.game.add.existing(this.driver);
        this.driver.scale.setTo(this.game.SCALE);
        this.driver.anchor.set(0.5, 0.5);
        this.driver.reset(x, y);
        this.driver.body.collideWorldBounds = true;
        let driver = this.driver; this.driver = null;
        this.modal.howDropFeedback(GameModal.HIDDEN);
        this.modal.droppedFeedback();

        this.vehicleStopedEvent.fire(driver.obj);
        setTimeout(() => {
            driver.obj.onCollisionBegin({object: this.sprite.body});
            this.collisionEventEnabled = true;
            this.vehicleUnmountedEvent.fire(driver.obj);
            this.stopProcess = false;
        }, 200);
    }

    /** Update */
    update() {
        if(!this.ready) return;
        super.update();
        if(this.driver === null) return;
        this.objectCollisionUpdate();
        this.moveUpdate();
        if(this.keys.bool["Z"].state && this.driver.obj.vehicleInUse.object !== null)
            this.stop();
    }

    /** Add events comportements */
    objectCollisionUpdate() {
        if(this.objectInCollision === null) return; //if not collision, break
        if(this.keys.bool["A"].state) {
            switch(this.objectInCollision.sprite.obj.type) {
                case Vehicle.name:
                    this.modal.cantUseFeedback();
                    break;
                case Material.name:
                    if(this.keys.bool["E"].state) return;
                    if(!(Type.isExist(this.objectInCollision.sprite.obj.properties.amount)
                        && Type.isExist(this.objectInCollision.sprite.obj.properties.amount.current)
                        && this.objectInCollision.sprite.obj.properties.amount.current > 0)) return;
                    const materialAmount = this.objectInCollision.sprite.obj.properties.amount.current;
                    const wantAmount = this.container.getSizeLeft() > materialAmount ? materialAmount : this.container.getSizeLeft();
                    this.objectInCollision.sprite.obj.getRessource(wantAmount, (name, amount) => {
                        this.container.addItem(name, amount);
                        if(amount > 0 && this.container.getSizeLeft() === 0)
                            this.modal.containerFullFeedback();
                        if(this.container.getSizeUsed() > 0)
                            this.loading.visible = true;
                    });
                    break;
                case Tool.name:
                    if(this.keys.bool["E"].state) return;
                    let needed = this.objectInCollision.sprite.obj.properties.needed;
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
        if(this.keys.bool["E"].state) {
            switch(this.objectInCollision.sprite.obj.type) {
                case Material.name:
                    if(this.keys.bool["A"].state) return;
                    let needed = this.objectInCollision.sprite.key;
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
                if(this.collisionEventEnabled)
                    switch(this.objectInCollision.sprite.obj.type) {
                        case Player.name:
                            this.modal.tooltipHandler(GameModal.VISIBLE, Vehicle.COLLIDED, GameModal.CONTROLS_DISABLED, null, GameModal.FORCE);
                            break;
                        case Vehicle.name:
                            if(Type.isExist(this.driver))
                                this.modal.carefulFeedback('aux véhicules');
                            break;
                        default:
                            break;
                    }
                break;
            case 'layer':
                this.modal.carefulFeedback('aux murs');
                break;
            default:
                break;
        }
    }
    onCollisionEnd(o) {
        if(super.isCollidWith(Player.name, o)) {
            this.modal.tooltipHandler(GameModal.HIDDEN, null, GameModal.CONTROLS_ENABLED);
        }
    }
    mouseOver() {
        this.modal.tooltipHandler(GameModal.VISIBLE, super.isCollidWith(Player.name));
    }
    mouseOut() {
        this.modal.tooltipHandler(GameModal.HIDDEN);
    }

    /** Move */
    moveUpdate(){
        if(!this.initializedAnimation) {
            this.driver.idle(this.properties.use);
            this.initializedAnimation = true;
        }
       // this.driver.body.setZeroVelocity(); // force player to don't move by default
        let speed = this.speed * (this.properties.use === 'up' ? 1 : -1);
        if(this.keys.event[Keyboard.UP].state)
            this.sprite.body.thrust(speed);
        else if (this.keys.event[Keyboard.DOWN].state)
            this.sprite.body.reverse(speed);
        /*else
            this.sprite.body.setZeroVelocity();*/
        if(!this.keys.event[Keyboard.LEFT].state && !this.keys.event[Keyboard.RIGHT].state)
            this.sprite.body.setZeroRotation();
      //  Vehicle.constrainVelocity(this.sprite, this.speed);
    }
    moveTo(keycode, keystate){
        if(keystate) {
            if(this.keys.event[keycode].info.name == "left")
                this.sprite.body.rotateLeft(this.speedRotate);
            if(this.keys.event[keycode].info.name == "right")
                this.sprite.body.rotateRight(this.speedRotate);

            if(this.properties.walkToMove) {
                if(this.keys.event[keycode].info.name == "up") this.driver.walk(this.properties.use);
                else if(this.keys.event[keycode].info.name == "down") this.driver.walk('up');
            }
            else this.driver.idle(this.properties.use);
        } else
            this.driver.idle(this.properties.use);
    }

    /** Static methods */
    static constrainVelocity(sprite, maxVelocity) {
        let body = sprite.body;
        let angle, currVelocitySqr, vx, vy;
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        currVelocitySqr = vx * vx + vy * vy;
        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            body.data.velocity[0] = vx;
            body.data.velocity[1] = vy;
        }
    }
};