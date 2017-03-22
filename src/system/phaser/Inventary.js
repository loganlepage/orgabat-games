'use strict';
import Type from '../utils/Type';

/** An inventary system */
export default class Inventary {
    /**
     * Constructor for a new inventary
     * @param containerSize
     * @param data
     * @param items
     */
    constructor(containerSize, data, items = []) {
        this.materialsData = data;
        this.size = (containerSize === undefined) ? null : containerSize;
        this.items = items;
    }

    /**
     * Return true if the material {name} exist in the config
     * @param name
     * @returns {boolean}
     */
    isMaterialExist(name) {
        let founded = false;
        for(let key in this.materialsData) {
            if(this.materialsData[key].name === name) founded = true
        } return founded;
    }

    /**
     * Add an item
     * @param name
     * @param amount
     */
    addItem(name, amount = 1) {
        if(!this.isMaterialExist(name)) throw new Error(`Material "${name}" inexistant.`);
        if(amount === 0) return;
        if(!Type.isExist(this.items[name])) this.items[name] = {amount: 0};
        if(this.getSizeLeft() >= amount)
            this.items[name].amount += amount;
        else
            throw new Error('Inventaire plein.');
    }

    /**
     * Remove item
     * @param name
     * @param amount
     */
    delItem(name, amount = 1) {
        if(amount === 0) return;
        if(this.items[name] !== undefined)
            this.items[name].amount -= amount;
    }

    /**
     * Return current amount for an item
     * @param name
     * @returns {*}
     */
    getSumOf(name) {
        return Type.isExist(this.items[name]) ? this.items[name].amount : 0;
    }

    /**
     * Return sum of all items with their amount
     * @returns {number}
     */
    getSizeUsed() {
        let sizeUsed = 0;
        for(let key in this.items)
            sizeUsed += this.items[key].amount;
        return sizeUsed;
    }

    /**
     * Return the size left
     * @returns {number}
     */
    getSizeLeft() {
        return (this.size - this.getSizeUsed());
    }

    /**
     * Return the last item
     * @returns {item}
     */
    getLast() {
        return this.items[this.getSizeUsed()];
    }
};