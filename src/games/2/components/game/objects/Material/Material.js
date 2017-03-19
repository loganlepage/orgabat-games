"use strict";

import MaterialModalHandler from './MaterialModalHandler';
import AbstractObject from 'system/phaser/AbstractObject';


/** Material Object (include sprite and modals) */
export default class Material extends AbstractObject {

    ready = false;

    /**
     * Constructor for a new Material object
     * @param game
     * @param type
     * @param properties
     */
    constructor(game, type, properties) {
        super(game);
        this.configure(properties);
        this.type = type;
        this.addModalHandler(new MaterialModalHandler(properties, this, game));
        this.modalHandler.modal.onMouseOver.add(this.onMouseOver, this);
        this.modalHandler.modal.onMouseOut.add(this.onMouseOut, this);
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
};