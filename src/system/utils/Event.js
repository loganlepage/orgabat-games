'use strict';

export default class Event {

    static simulateMouseEvent(type) {
        try {
            document.dispatchEvent(
                new MouseEvent(type, {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                })
            );
        } catch(err) {
            console.log(err);
        }
    }

    /**
     * @returns {boolean}
     */
    static mouse(type, params = { bubbles: false, cancelable: false }) {
        var evt = new MouseEvent("mouse", {
            bubbles: true,
            cancelable: true,
            view: window,
        });
    }

}