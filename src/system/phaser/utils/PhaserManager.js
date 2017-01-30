'use strict';
import Type from '../../utils/Type';
import {Signal} from "phaser";

/** Collection of Phaser Canvas objects. */
export default class PhaserManager {
    static _canvas = {};
    static onAdd = new Signal();
    static onReady = new Signal();
    static get(name) {
        if(Type.isExist(this._canvas[name]))
            return this._canvas[name];
    }
    static add(name, canvas) {
        if(!Type.isExist(this._canvas[name])) {
            this._canvas[name] = canvas;
            PhaserManager.onAdd.dispatch(name);
        }
    }
    static ready(name, state) {
        if(Type.isExist(this._canvas[name])) {
            PhaserManager.onReady.dispatch(name, state);
        }
    }
    static del(name) {
        if(Type.isExist(this._canvas[name]))
            delete this._canvas[name];
    }
    static isExist(name) {
        return Type.isExist(this._canvas[name]);
    }
};