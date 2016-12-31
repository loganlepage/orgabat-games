'use strict';
var Utils = Utils || {};
Utils.Dom = class Dom {

    /**
     * Remove a class
     * @param dom
     * @param value
     */
    static removeClass(dom, value) {
        dom.className = dom.className.replace(new RegExp('(?:^|\\s)'+ value + '(?:\\s|$)'), ' ');
    }
};