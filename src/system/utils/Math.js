'use strict';

export default class Math {

    /**
     * Value is <= max ?
     * @param value
     * @param max
     * @param debug
     * @returns {boolean}
     */
    static validateMax(value, max, debug) {
        const isValid = value <= max;
        if(!isValid && debug)  throw new Error(`value(${value}) must be equal or less than max(${max})`);
        return isValid;
    }

    /**
     * Value is >= min ?
     * @param value
     * @param min
     * @param debug
     * @returns {boolean}
     */
    static validateMin(value, min, debug) {
        const isValid = value >= min;
        if(!isValid && debug) throw new Error(`value(${value}) must be equal or greater than min(0)`);
        return isValid;
    }

    /**
     * Get calculated percent
     * @param value
     * @param max
     * @returns {string} ex: 78%
     */
    static calculatesPercent(value, max) {
        return ( value / max ) * 100 + '%';
    }

    /**
     * Scale a value to a referer
     * @param referer
     * @param value
     * @returns {number}
     */
    static scale(referer, value) {
        return referer * value;
    }
};