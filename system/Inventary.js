'use strict';
var Game = Game || {};
Game.System = Game.System || {};

Game.System.Inventary = class Inventary {
    constructor(containerSize, items) {
        this.size = (containerSize === undefined) ? null : containerSize;
        this.items = (items === undefined) ? [] : items;
    }

    addItem(name, amount, callback) {
        if(!this.isMaterialExist(name)) throw new Error(`Material "${name}" inexistant.`);
        if(amount === undefined) amount = 1;
        if(this.items[name] === undefined) this.items[name] = {'amount': 0};
        if(this.getSizeLeft() >= amount)
            this.items[name].amount += amount;
        else
            throw new Error('Inventaire plein.');
    }

    isMaterialExist(name) {
        let founded = false;
        for(let key in Game.Config.data.entities.materials) {
            if(Game.Config.data.entities.materials[key].name === name) founded = true
        } return founded;
    }

    getSizeLeft() {
        let sizeUsed = 0;
        for(let key in this.items) {
            sizeUsed += this.items[key].amount;
        }
        return (this.size - sizeUsed);
    }
};