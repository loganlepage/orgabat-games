'use strict';

export default class Type {

    /**
     * deep merge two json
     * @param target
     * @param source
     * @returns {*} jsonObject
     */
    static deepMerge(target, source) {
        if (Type.isObject(target) && Type.isObject(source)) {
            for(const key in source) {
                if(Type.isObject(source[key])) {
                    if(!Type.isExist(target[key]))
                        target[key] = {};
                    Type.deepMerge(target[key], source[key]);
                }
                else target[key] = source[key];
            }
        }
        return target;
    };

    /**
     * Count words in str
     * @param str
     * @param word
     * @returns {number}
     */
    static nbChar(str, word) {
        let nb = 0;
        str = str.split(""); // cette ligne n'est pas nécessaire pour firefox ni chrome
        for(let i in str) nb += str[i] == word;
        return nb;
    }

    /**
     * Is not null and not undefined
     * @param prop
     * @param debug
     * @returns {boolean}
     */
    static isExist(prop, debug) {
        debug = (debug !== undefined && debug !== null) ? debug : false;
        let isExist = prop !== undefined && prop !== null;
        if(!isExist && debug) throw new Error(`Property is missing (${prop})`);
        return isExist;
    }

    /**
     * Is an object
     * @param obj
     * @param debug
     * @returns {boolean}
     */
    static isObject(obj, debug) {
        debug = Type.isExist(debug) ? debug : false;
        let isObject = Type.isExist(obj) && typeof obj === 'object' && !Array.isArray(obj);
        if(!isObject && debug) throw new Error(`${obj} is not an object`);
        return isObject;
    };

    /**
     * Is a number
     * @param n
     * @param debug
     * @returns {boolean}
     */
    static isNumber(n, debug) {
        debug = Type.isExist(debug) ? debug : false;
        let isNumber = Type.isExist(n) && typeof n === 'number';
        if(!isNumber && debug) throw new Error(`${n} is not a number`);
        return isNumber;
    }

    /**
     * Is a string
     * @param str
     * @param debug
     * @returns {boolean}
     */
    static isString(str, debug) {
        debug = Type.isExist(debug) ? debug : false;
        let isString = Type.isExist(str) && typeof str === 'string';
        if(!isString && debug) throw new Error(`${str} is not a string`);
        return isString;
    }

    /**
     * Is a boolean
     * @param b
     * @param debug
     * @returns {boolean}
     */
    static isBoolean(b, debug) {
        debug = Type.isExist(debug) ? debug : false;
        let isBoolean = Type.isExist(b) && typeof b === 'boolean';
        if(!isBoolean && debug) throw new Error(`${b} is not a boolean`);
        return isBoolean;
    }

    /**
     * Is instanceof a type
     * @param o
     * @param type
     * @param debug
     * @returns {boolean}
     */
    static isInstanceOf(o, type, debug) {
        debug = Type.isExist(debug) ? debug : false;
        let isInstanceOf = Type.isExist(o) && Type.isExist(type) && o instanceof type;
        if(!isInstanceOf && debug) throw new Error(`${o} is not an instance of ${type}`);
        return isInstanceOf;
    }
}