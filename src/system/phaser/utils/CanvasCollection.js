'use strict';
import Type from '../../utils/Type';

/** Collection of Phaser Canvas objects. */
export default class CanvasCollection {
    static getCanvas(name) {
        console.log(this._canvas, name);
        if(Type.isExist(this._canvas[name]))
            return this._canvas[name];
    }
    static addCanvas(name, canvas) {
        if(!Type.isExist(this._canvas[name]))
            this._canvas[name] = canvas;
    }
    static delCanvas(name) {
        if(Type.isExist(this._canvas[name]))
            delete this._canvas[name];
    }
};

/** Static properties */
Object.assign(CanvasCollection, {
    _canvas: {}
});