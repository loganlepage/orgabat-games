"use strict";

import InventaryModalHandler from "./InventaryModalHandler";
import BasicGameObject from "system/phaser/BasicGameObject";
import InventarySprite from "./InventarySprite";
import {Signal} from "phaser";

/** Inventary Object (include sprite and modals) */
export default class Inventary extends BasicGameObject {

    static get MAX_EQUIPPED_SIZE() { return 4};

    ready = false;
    equipped = [];
    onStuffAdd = new Signal();
    onStuffDel = new Signal();
    onOpen = new Signal();

    /**
     * Constructor for a new Inventary object
     * @param game
     * @param x
     * @param y
     */
    constructor(game, x, y) {
        super(game);
        this.addSprite(new InventarySprite(this.game, x, y, this));
        this.modalHandler = new InventaryModalHandler(this, game);

        //events
        this.modalHandler.onInventaryClick.add((stuff) => {
            if(this.indexOf(stuff) === -1 && this.equipped.length < Inventary.MAX_EQUIPPED_SIZE) {
                this.equipped.push(stuff);
                this.onStuffAdd.dispatch(stuff);
            }
        }, this);
        this.modalHandler.onEquippedClick.add((stuff) => {
            const index = this.indexOf(stuff);
            if(index > -1) {
                this.equipped.splice(index, 1);
                this.onStuffDel.dispatch(stuff);
            }
        }, this);

        //init ui
        this.modalHandler.showEquipped();

        this.ready = true;
    }

    indexOf(stuff) {
        for(let i = 0; i < this.equipped.length; ++i) {
            if(this.equipped[i].data.name === stuff.data.name) return i;
        }
        return -1;
    }

    onMouseDown() {
        this.modalHandler.showActions();
        this.onOpen.dispatch();
    }
    onMouseOut() {
        this.onMouseOutHandled.dispatch();
    }
};