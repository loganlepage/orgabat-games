"use strict";
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * vehicle object (include sprite and modals)
 */
Game.Object.VehicleObj = class VehicleObj extends Game.Abstract.AbstractGameObject {
    constructor(game, layer, name, properties, x, y) {
        super(game, layer, "vehicle");
        this.vehicleMountedEvent = new Game.Utils.EventHandler();
        this.vehicleUnmountedEvent = new Game.Utils.EventHandler();
        this.vehicleStartedEvent = new Game.Utils.EventHandler();
        this.vehicleStopedEvent = new Game.Utils.EventHandler();
        this.startProcess = false;
        this.stopProcess = false;
        this.container = new Game.System.Inventary(properties.containerSize);

        this.addSprite(new Game.Sprite.VehicleSpr(this.game, Game.Utils.Position.getPixelAt(x),
            Game.Utils.Position.getPixelAt(y), name, this));
        this.addModal(new Game.Modal.VehicleModal(properties, this, game));
        this.configure(properties);
        this.ready = true;
    }

    /**
     * Config & initialize
     */
    configure(properties) {
        this.speed = properties.speed * Game.SCALE;
        this.speedRotate = properties.speedRotate * Game.SCALE;
        this.properties = properties;
        this.driver = null;
    }

    /**
     * Update
     */
    update() {
        if(!this.ready || this.driver === null) return;
        this.objectCollisionUpdate();
        this.moveUpdate();
        if(this.keys.bool["Z"].state && this.driver !== null && this.driver.obj.vehicleInUse.object !== null)
            this.stop();
    }

    /**
     * Start & stop vehicle
     */
    startBy(player, keys){
        if(this.stopProcess) return;
        this.startProcess = true;
        this.keys = keys;
        this.playerSpeed = player.obj.speed;
        player.body.setCollisionGroup(Game.CollisionGroup.disabled);
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
        if(!Game.Modal.VehicleModal.howDropInfoBoxFired)
            Game.Modal.VehicleModal.howDropInfoBox();

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
        this.driver.scale.setTo(Game.SCALE);
        this.driver.anchor.set(0.5, 0.5);
        this.driver.reset(x, y);
        this.driver.body.setCollisionGroup(Game.CollisionGroup.player);
        this.driver.body.collideWorldBounds = true;
        let driver = this.driver; this.driver = null;
        Game.Modal.VehicleModal.droppedInfoBox();

        this.vehicleStopedEvent.fire(driver.obj);
        setTimeout(() => {
            driver.obj.objectCollision({object: this.sprite.body});
            this.collisionEventEnabled = true;
            this.vehicleUnmountedEvent.fire(driver.obj);
            this.stopProcess = false;
        }, 200);
    }

    /**
     * Add comportements to an Object collided
     */
    objectCollisionUpdate() {
        if(!super.objectCollisionUpdate()) return; //if not collision, break
        if(this.keys.bool["A"].state) {
            switch(this.objectInCollision.obj.type) {
                case "vehicle":
                    if(this.driver !== null)
                        Game.Modal.VehicleModal.cantUseInfoBox();
                    break;
                case "material":
                    let material = this.objectInCollision.obj.getRessource(this.container.getSizeLeft());
                    this.container.addItem(material.name, material.amount);
                    if(material.amount > 0 && this.container.getSizeLeft() === 0)
                        Game.Modal.VehicleModal.containerIsFull();
                    break;
                default:
                    break;
            }
        }
    }
    objectCollision(o) {
        super.objectCollision(o);
        switch(this.objectInCollision.obj.type) {
            case "character":
                if(this.collisionEventEnabled)
                    this.modal.infoBox();
                break;
            default:
                break;
        }
    }

    /**
     * Move
     */
    moveUpdate(){
        this.driver.body.setZeroVelocity(); // force player to don't move by default
        if(this.keys.event[Phaser.Keyboard.UP].state)
            this.sprite.body.thrust(this.playerSpeed);
        else if (this.keys.event[Phaser.Keyboard.DOWN].state)
            this.sprite.body.reverse(this.playerSpeed);
        else
            this.sprite.body.setZeroVelocity();
        if(!this.keys.event[Phaser.Keyboard.LEFT].state && !this.keys.event[Phaser.Keyboard.RIGHT].state)
            this.sprite.body.setZeroRotation();
        VehicleObj.constrainVelocity(this.sprite, this.speed);
    }
    moveTo(keycode, keystate){
        if(keystate) {
            if(this.keys.event[keycode].info.name == "left")
                this.sprite.body.rotateLeft(this.speedRotate);
            if(this.keys.event[keycode].info.name == "right")
                this.sprite.body.rotateRight(this.speedRotate);
            if(this.properties.walkToMove) this.driver.walk("up");
            else this.driver.idle("up");
        } else
            this.driver.idle("up");
    }

    /**
     * Static methods
     */
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