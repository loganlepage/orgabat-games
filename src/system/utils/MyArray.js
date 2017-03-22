'use strict';

export default class MyArray {

    /**
     * Find and remove a value
     * @param array
     * @param value
     * @returns {*}
     */
    static remove(array, value) {
        const id = array.indexOf(value);
        if (id !== -1) {
            array.splice(id, 1);
        }
        return array;
    }
};