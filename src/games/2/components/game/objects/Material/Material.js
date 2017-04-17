"use strict";

import {Signal} from "phaser";
import Config from "../../config/data";
import MaterialModalHandler from "./MaterialModalHandler";
import AbstractObject from "system/phaser/AbstractObject";
import MaterialSprite from "./MaterialSprite";
import MyArray from "system/utils/MyArray";

/** Material Object (include sprite and modals) */
export default class Material extends AbstractObject {

    /** @return {number} */
    static get MAX_ENTITIES() {
        return 3
    };

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
        this.modalHandler.modal.onMouseOver.add(() => this.modalHandler.showTooltip, this);

        /**
         * Dispatch mouse out to other
         */
        this.modalHandler.modal.onMouseOut.add(() => this.onMouseOutHandled.dispatch, this);

        /**
         * Create a material sprite at cursor on container (material modal) drag
         * @param modalBg
         */
        this.modalHandler.modal.onMouseDown.add((modalBg) => {
            if (!this.game.controlsEnabled || Material.MAX_ENTITIES - this.entities.length <= 0) return;

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
                    if (entity.overlap(this.modalHandler.modal.items.bg)) {
                        entity.destroy();
                        MyArray.remove(this.entities, entity);
                        this.modalHandler.modal.count = Material.MAX_ENTITIES - this.entities.length;
                    } else {
                        //décommenter pour récupérer la position d'un matérial
                        //console.log(entity.world.x / this.game.SCALE + ", " + entity.world.y / this.game.SCALE);
                        //commenter les lignes suivantes pour empêcher le dépôt
                        entity.onDropped(this);
                        if (entity.currentDepot != null) {
                            this.onDropped.dispatch(entity.currentDepot);
                        }
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
                this.modalHandler.modal.count = Material.MAX_ENTITIES - this.entities.length;
            }
        }, this);

        this.modalHandler.materialModal();
        this.ready = true;
    }
};