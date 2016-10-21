'use strict';
var Game = Game || {};
Game.System = Game.System || {};

Game.System.Inventary = class Inventary {
    constructor(containerSize, items) {
        this.size = (containerSize === undefined) ? null : containerSize;
        this.items = (items === undefined) ? [] : items;
    }

    isMaterialExist(name) {
        let founded = false;
        for(let key in Game.Config.data.entities.materials) {
            if(Game.Config.data.entities.materials[key].name === name) founded = true
        } return founded;
    }

    addItem(name, amount) {
        if(!this.isMaterialExist(name)) throw new Error(`Material "${name}" inexistant.`);
        if(amount === undefined) amount = 1;
        if(amount === 0) return;
        if(this.items[name] === undefined) this.items[name] = {'amount': 0};
        if(this.getSizeLeft() >= amount)
            this.items[name].amount += amount;
        else
            throw new Error('Inventaire plein.');
    }

    delItem(name, amount) {
        if(amount === undefined) amount = 1;
        if(amount === 0) return;
        if(this.items[name] !== undefined)
            this.items[name].amount -= amount;
    }

    getSumOf(name) {
        return this.items[name] !== undefined ? this.items[name].amount : 0;
    }

    getSizeUsed() {
        let sizeUsed = 0;
        for(let key in this.items)
            sizeUsed += this.items[key].amount;
        return sizeUsed;
    }

    getSizeLeft() {
        return (this.size - this.getSizeUsed());
    }
};