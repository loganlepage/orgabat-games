"use strict";

import {Signal} from "phaser";
import Config from "../../config/data";
import Debug from "system/utils/Debug";
import MaterialModalHandler from "./MaterialModalHandler";
import AbstractObject from "system/phaser/AbstractObject";
import MaterialSprite from "./MaterialSprite";
import MyArray from "system/utils/MyArray";

/** Material Object (include sprite and modals) */
export default class Material extends AbstractObject {

    ready = false;
    onDropped = new Signal();
    onProtect = new Signal();

    //Dispatch an event when active state change.
    _active = false;
    onActive = new Signal();

    set active(active) {
        this.onActive.dispatch(active);
        this._active = active;
    }

    get active() {
        return this._active;
    }

    /**
     * Constructor for a new Material object
     * @param game
     * @param type
     * @param properties
     */
    constructor(game, type, properties) {
        super(game);
        this.entities = [];
        this.properties = properties;
        this.type = type;
        this.addModalHandler(new MaterialModalHandler(properties, this, game));

        /**
         * Show tooltip on over
         */
        this.modalHandler.modal.onMouseOver.add(() => {
                //On affiche une fenêtre d'information uniquement si le matériel est actif.
                if (!this.active) return;
                this.modalHandler.showTooltip();
            }, this
        );

        /**
         * Dispatch mouse out to other
         */
        this.modalHandler.modal.onMouseOut.add(() => {
            this.onMouseOutHandled.dispatch()
        }, this);

        /**
         * Create a material sprite at cursor on container (material modal) drag
         * @param modalBg
         */
        this.modalHandler.modal.onMouseDown.add((modalBg) => {

            if (!this.game.controlsEnabled || !this.active) return;

            if (this.game.input.activePointer.isDown) {

                const entity = new MaterialSprite(this.game, modalBg.items.bg.world.x, modalBg.items.bg.world.y,
                    'atlas', modalBg.items.bg._frame.name, this
                );

                this.entities.push(entity);
                Material.debugCircleCreate(entity, this.game);

                /**
                 * destroy the entity on drag stop on container (material modal)
                 */
                entity.onDragStop.add((entity) => {
                    if (Config.developer.debug) {
                        //Show the material position on drop
                        console.log("Materiel " + entity.type + " à la position : "
                            + (entity.world.x / this.game.SCALE).toFixed(2) + ", "
                            + (entity.world.y / this.game.SCALE).toFixed(2));
                    }

                    //try to drop the material sprite entity on a floor container
                    entity.drop();
                    Material.debugCirclePurge();

                    if (entity.container !== null) {
                        //Drop is success !
                        this.onDropped.dispatch(entity.container);
                    } else {
                        //We drop on background, purge material.
                        this.kill(entity);
                    }
                }, this);

                /**
                 * When a material is dropped on protectable container
                 */
                entity.onDroppedHandled.add((entity) => {
                    if (entity.container !== null && entity.container.protects.indexOf(this.type) >= 0) {
                        entity.finish();
                        entity.container.isProtected = true;
                        this.onProtect.dispatch();
                    }
                }, this);

                entity.x = this.game.input.x + this.game.camera.x;
                entity.y = this.game.input.y + this.game.camera.y;
                entity.input.startDrag(this.game.input.activePointer);
            }
        }, this);

        this.modalHandler.materialModal();
        this.ready = true;
    }

    kill(sprite) {
        sprite.moveTo(this.modalHandler.modal.items.bg, () => {
            sprite.destroy();
            MyArray.remove(this.entities, sprite);
        })
    }

    static debugCirclePurge() {
        if (!Config.developer.debug) return;
        if (Material.debugCircles) {
            for (const circle of Material.debugCircles) {
                circle.pendingDestroy = true;
            }
        }
    }

    static debugCircleCreate(entity, game) {
        if (!Config.developer.debug) return;
        Material.debugCircles = Material.debugCircles || [];
        for (const container of Config.containers) {
            for (const protectKey in container.area) {
                if (protectKey === entity.obj.type) {
                    Material.debugCircles.push(
                        Debug.circle({
                            x: container.area[protectKey].from.x,
                            y: container.area[protectKey].from.y,
                            diameter: container.area[protectKey].from.radius * 2 * game.SCALE
                        }, game)
                    );
                }
            }
        }
    }
};