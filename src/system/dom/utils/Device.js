'use strict';

export default class Device {

    constructor(app) {
        this.app = app;
    }

    init() {
        if(Device.isMobile()) {
            this.isVertical = !(window.orientation == 90 || window.orientation == -90);
            window.addEventListener('orientationchange', () => {
                this.isVertical = !(window.orientation == 90 || window.orientation == -90);
            }, false);
            window.addEventListener("resize", () => {
                this.setState({width: window.innerWidth, height: window.innerHeight});
            }, false);
        } else
            this.isVertical = false;
    }

    /**
     * @returns {boolean}
     */
    static isMobile() {
        try{ document.createEvent("TouchEvent"); return true; }
        catch(e){ return false; }
    }

    static get vertical() {
        return this._vertical;
    }
}