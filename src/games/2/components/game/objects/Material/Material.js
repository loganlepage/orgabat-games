"use strict";

import {Signal} from 'phaser';
import Config from '../../config/data';
import MaterialModalHandler from "./MaterialModalHandler";
import AbstractObject from "system/phaser/AbstractObject";
import MaterialSprite from "./MaterialSprite";
import MyArray from "system/utils/MyArray";

/** Material Object (include sprite and modals) */
export default class Material extends AbstractObject {

    /** @return {number} */
    static get MAX_ENTITIES() { return 3 };
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
        this.configure(properties);
        this.type = type;
        this.addModalHandler(new MaterialModalHandler(properties, this, game));
        this.modalHandler.modal.onMouseOver.add(this.onMouseOver, this);
        this.modalHandler.modal.onMouseOut.add(this.onMouseOut, this);
        this.modalHandler.modal.onMouseDown.add(this.onMouseDown, this);
        this.modalHandler.materialModal();
        this.ready = true;
    }

    /** Config & initialize */
    configure(properties) {
        this.properties = properties;
    }

    onMouseOver() {
        this.modalHandler.showTooltip();
    }

    onMouseOut() {
        this.onMouseOutHandled.dispatch();
    }

    /**
     * Create a material sprite at cursor on container (material modal) drag
     * @param modalBg
     */
    onMouseDown(modalBg) {
        if(!this.game.controlsEnabled || Material.MAX_ENTITIES - this.entities.length <= 0) return;
        let entity = new MaterialSprite(this.game, modalBg.items.bg.world.x, modalBg.items.bg.world.y, 'atlas', modalBg.items.bg._frame.name);
        if (this.game.input.activePointer.isDown) {
            this.entities.push(entity);
            entity.onDragStop.add(this.onDragStop, this);
            entity.onDroppedHandled.add(this.onDroppedHandled, this);
            entity.x = this.game.input.x + this.game.camera.x;
            entity.y = this.game.input.y + this.game.camera.y;
            entity.input.startDrag(this.game.input.activePointer);
            this.modalHandler.modal.count = Material.MAX_ENTITIES - this.entities.length;
        }
        else {
            entity.destroy();
        }
    }

    /**
     * destroy the entity on drag stop on container (material modal)
     * @param entity
     */
    onDragStop(entity) {
        if (entity.overlap(this.modalHandler.modal.items.bg)) {
            entity.destroy();
            MyArray.remove(this.entities, entity);
            this.modalHandler.modal.count = Material.MAX_ENTITIES - this.entities.length;
        } else {
            //décommenter pour récupérer la position d'un matérial
            //console.log(entity.world.x / this.game.SCALE + ", " + entity.world.y / this.game.SCALE);
            entity.onDropped(this);
            if(entity.currentDepot != null) {
                this.onDropped.dispatch(entity.currentDepot);
            }
        }
    }

    /**
     * When a material is dropped on protectable container
     * @param entity
     */
    onDroppedHandled(entity) {
        if(entity.currentDepot != null && Config.depotProtects[entity.currentDepot.name].indexOf(this.type) >= 0) {
            entity.finish();
            entity.currentDepot.isProtected = true;
            this.onProtect.dispatch();
        }
    }
};