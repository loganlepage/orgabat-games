"use strict";

import {Signal} from "phaser";
import Config from "../../config/data";
import MaterialModalHandler from "./MaterialModalHandler";
import AbstractObject from "system/phaser/AbstractObject";
import MaterialSprite from "./MaterialSprite";
import MyArray from "system/utils/MyArray";

/** Material Object (include sprite and modals) */
export default class Material extends AbstractObject {

    ready = false;
    onDropped = new Signal();
    onProtect = new Signal();

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
        this.modalHandler.modal.onMouseOver.add(() => {this.modalHandler.showTooltip();}, this
        );

        /**
         * Dispatch mouse out to other
         */
        this.modalHandler.modal.onMouseOut.add(() => {this.onMouseOutHandled.dispatch()}, this);

        /**
         * Create a material sprite at cursor on container (material modal) drag
         * @param modalBg
         */
        this.modalHandler.modal.onMouseDown.add((modalBg) => {

            if (!this.game.controlsEnabled) return;

            if (this.game.input.activePointer.isDown) {

                let entity = new MaterialSprite(
                    this.game,
                    modalBg.items.bg.world.x,
                    modalBg.items.bg.world.y,
                    'atlas',
                    modalBg.items.bg._frame.name
                );

                this.entities.push(entity);

                /**
                 * destroy the entity on drag stop on container (material modal)
                 */
                entity.onDragStop.add((entity) => {
                    //décommenter pour récupérer la position d'un matérial
                    //console.log(entity.world.x / this.game.SCALE + ", " + entity.world.y / this.game.SCALE);

                    //try to drop the material sprite entity on a floor container
                    entity.drop();
                    if (entity.currentDepot != null) { //if success
                        this.onDropped.dispatch(entity.currentDepot);
                    } else { //else destroy the sprite entity
                        entity.destroy();
                        MyArray.remove(this.entities, entity);
                    }
                }, this);

                /**
                 * When a material is dropped on protectable container
                 */
                entity.onDroppedHandled.add((entity) => {
                    if (entity.currentDepot != null && Config.depotProtects[entity.currentDepot.name].indexOf(this.type) >= 0) {
                        entity.finish();
                        entity.currentDepot.isProtected = true;
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
};