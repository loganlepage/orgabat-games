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
        this.modalHandler.modal.onDragStart.add(this.onDragStart, this);
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

    onDragStart(modalBg, pointer) {
        if(!this.game.controlsEnabled) return;
        modalBg.items.bg.input.stopDrag(pointer);
        if(Material.MAX_ENTITIES - this.entities.length == 0) return; //Plus d'entitée disponible
        const entity = new MaterialSprite(this.game, modalBg.items.bg.world.x, modalBg.items.bg.world.y, 'atlas', modalBg.items.bg._frame.name);
        entity.input.startDrag(pointer);
        this.entities.push(entity);
        entity.onDragStop.add(this.onDragStop, this);
        entity.onDroppedHandled.add(this.onDroppedHandled, this);
        this.modalHandler.modal.count = Material.MAX_ENTITIES - this.entities.length;
    }

    onDragStop(entity) {
        if (entity.overlap(this.modalHandler.modal.items.bg)) {
            entity.destroy();
            MyArray.remove(this.entities, entity);
            this.modalHandler.modal.count = Material.MAX_ENTITIES - this.entities.length;
        } else {
            entity.onDropped();
        }
    }

    onDroppedHandled(entity) {
        if(entity.currentDepot != null && Config.depotProtects[entity.currentDepot.name].indexOf(this.type) >= 0) {
            entity.finish();
            entity.currentDepot.isProtected = true;
            this.onProtect.dispatch();
        }
    }
};