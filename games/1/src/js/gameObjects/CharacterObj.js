"use strict";
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * character object (include sprite and keys)
 */
Game.Object.CharacterObj = class CharacterObj extends Game.Abstract.AbstractGameObject {
    constructor(game, layer, x, y) {
        super(game, layer, "character");
        this.addSprite(new Game.Sprite.CharacterSpr(game, Game.Utils.Position.getPixelAt(x),
            Game.Utils.Position.getPixelAt(y), this));
        this.configure();
        this.ready = true;
    }

    /**
     * Config
     */
    configure() {
        this.speed = Game.Config.data.entities.player.speed * Game.SCALE;
        this.vehicleInUse = {object: null, started: false};

        this.keys = new Game.Utils.Keyboard(this.game);
        this.keys.addEvent(this, "moveTo", Phaser.Keyboard.LEFT,    {name: "left",   axe: "x", signe: -1});
        this.keys.addEvent(this, "moveTo", Phaser.Keyboard.RIGHT,   {name: "right",  axe: "x", signe: +1});
        this.keys.addEvent(this, "moveTo", Phaser.Keyboard.UP,      {name: "up",     axe: "y", signe: -1});
        this.keys.addEvent(this, "moveTo", Phaser.Keyboard.DOWN,    {name: "down",   axe: "y", signe: +1});
        this.keys.addBool("A"); this.keys.addBool("Z"); this.keys.addBool("E");

        Game.vehicleGroup.forEach((vehicle) => {
            vehicle.obj.vehicleMountedEvent.add(this, "onVehicleMount");
            vehicle.obj.vehicleStartedEvent.add(this, "onVehicleStart");
            vehicle.obj.vehicleStopedEvent.add(this, "onVehicleStop");
            vehicle.obj.vehicleStopedEvent.add(this, "onVehicleUnmount");
        });
    }

    /**
     * Update, not called when the player mount a vehicle
     */
    update() {
        if(!this.ready) return;
        this.objectCollisionUpdate();
        this.moveUpdate();
    }

    /**
     * Add comportements to an Object collided
     */
    objectCollisionUpdate() {
        if(!super.objectCollisionUpdate()) return; //if not collision, break
        if(this.keys.bool["A"].state) {
            switch(this.objectInCollision.obj.type) {
                case "vehicle":
                    this.setVehicle(this.objectInCollision);
                    this.objectInCollision.obj.modal.hideInfobox('infoBox');
                    this.objectInCollision = null;
                    break;
                default:
                    break;
            }
        }
    }
    objectCollision(o) {
        if( this.vehicleInUse.object !== null ) return;
        super.objectCollision(o.object);
    }

    /**
     * Start vehicle
     */
    setVehicle(vehicle) {
        if(this.vehicleInUse.object !== null) return;
        if(vehicle.obj.startProcess === true) return;
        this.isMoving = false;
        vehicle.obj.startBy(this.sprite, this.keys);
    }
    onVehicleMount(vehicle) { this.vehicleInUse.object = vehicle; }
    onVehicleStart() { this.vehicleInUse.started = true;}
    onVehicleStop() { this.vehicleInUse.started = false; }
    onVehicleUnmount() { this.vehicleInUse.object = null; }

    /**
     * Move
     */
    moveUpdate() {
        this.sprite.body.setZeroVelocity();
        if(!this.isMoving) return;
        if(this.direction == "left")   this.sprite.body.moveLeft(this.speed);
        if(this.direction == "right")  this.sprite.body.moveRight(this.speed);
        if(this.direction == "up")     this.sprite.body.moveUp(this.speed);
        if(this.direction == "down")   this.sprite.body.moveDown(this.speed);
    }
    moveTo(keycode, keystate) {
        if(this.vehicleInUse.object !== null)
            return this.vehicleInUse.started ? this.vehicleInUse.object.moveTo(keycode, keystate) : 0;

        this.sprite.body.setZeroVelocity();
        if (keystate) {
            this.sprite.walk(this.keys.event[keycode].info.name);
            this.direction = this.keys.event[keycode].info.name;
            this.isMoving = true;
        } else {
            this.sprite.idle(this.keys.event[keycode].info.name);
            this.direction = null;
            this.isMoving = false;
        }
    }
};