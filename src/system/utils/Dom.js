'use strict';

/** Manipulate the DOM */
export default class Dom {

    /**
     * Remove a class
     * @param dom
     * @param value
     */
    static removeClass(dom, value) {
        dom.className = dom.className.replace(new RegExp('(?:^|\\s)'+ value + '(?:\\s|$)'), ' ');
    }
};