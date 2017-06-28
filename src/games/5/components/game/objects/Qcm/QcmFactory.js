'use strict';
import GameFactory from "system/phaser/GameFactory";
import Qcm from "./Qcm";

/** Qcm Group Factory (called by play state) */
export default class QcmFactory extends GameFactory {

    _obj = [];

    /**
     * Constructor for a new material group
     * @param game
     * @param qcms
     */
    constructor(game, questions) {
        super(game);
        let previous = null;
        for (const data of questions) {
            const qcm = new Qcm(this.game, data.key, data.prop);
            qcm.previous = previous;
            previous = qcm;
            this._obj.push(qcm);
        }
    }

    start() {
        this._obj[0].modalHandler.show();
    }

    forEach(cb=()=>{}) {
        for(const qcm of this._obj) {
            cb(qcm);
        }
    }
};

