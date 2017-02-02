'use strict';

export class DoOnce {
    constructor(callback, condition = () => true) {
        this.done = false;
        this.callback = callback; //méthode à exécuter
        this.condition = condition; //méthode qui retourne un booléen
    }
    call(args = {}) {
        if((!this.done) && this.condition(args)) {
            this.done = true;
            this.callback(args);
        }
    }
}