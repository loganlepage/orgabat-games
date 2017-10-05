'use strict';
import GameFactory from "system/phaser/GameFactory";
import QcmMultiple from "./QcmMultiple";

/** Qcm Group Factory (called by play state) */
export default class QcmMultipleFactory extends GameFactory {

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
            const qcm = new QcmMultiple(this.game, data.keys, data.prop);
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

