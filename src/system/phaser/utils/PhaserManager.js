'use strict';
import Type from '../../utils/Type';

/** Collection of Phaser Canvas objects. */
export default class PhaserManager {
    static _canvas = {};
    static get(name) {
        if(Type.isExist(this._canvas[name]))
            return this._canvas[name];
    }
    static add(name, canvas) {
        if(!Type.isExist(this._canvas[name]))
            this._canvas[name] = canvas;
    }
    static del(name) {
        if(Type.isExist(this._canvas[name]))
            delete this._canvas[name];
    }
};