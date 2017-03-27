'use strict';
import Material from './Material';

/** material Group Factory (called by play state) */
export default class MaterialFactory {

    _obj = [];

    /**
     * Constructor for a new material group
     * @param game
     * @param materials
     */
    constructor(game, materials) {
        for(let i in materials) {
            this._obj.push(new Material(game, materials[i].name, materials[i].prop));
        }
    }

    forEach(cb=()=>{}) {
        for(const i in this._obj) {
            cb(this._obj[i]);
        }
    }
};

