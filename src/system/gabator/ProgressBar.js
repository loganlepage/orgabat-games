'use strict';
import Type from '../utils/Type';
import Math from '../utils/Math';

/** GUI Progress Bar */
export default class ProgressBar {
    /**
     * Constructor for a new progress bar
     * @param data
     */
    constructor(data) {
        try {
            Type.isExist(data.health.dom , true);
            Type.isNumber(data.health.maxValue, true);
            Type.isNumber(data.health.value, true);

            Type.isExist(data.organization.dom , true);
            Type.isNumber(data.organization.maxValue, true);
            Type.isNumber(data.organization.value, true);

            Type.isExist(data.enterprise.dom , true);
            Type.isNumber(data.enterprise.maxValue, true);
            Type.isNumber(data.enterprise.value, true);
        } catch (e) {
            console.error(e.name + ": " + e.message);
        }

        this.health = document.querySelector(data.health.dom);
        this.organization = document.querySelector(data.organization.dom);
        this.enterprise = document.querySelector(data.enterprise.dom);

        this.setHealth(data.health.value, data.health.maxValue);
        this.setOrganization(data.organization.value, data.organization.maxValue);
        this.setEnterprise(data.enterprise.value, data.enterprise.maxValue);
    }

    /**
     * Apply a value to the health progress bar
     * @param value
     * @param max
     */
    setHealth(value, max) {
        if(!Math.validateMax(value, max)) return;
        if(!Math.validateMin(value, 0)) return;
        this.health.style.width = Math.calculatesPercent(value, max);
    }

    /**
     * Apply a value to the organization progress bar
     * @param value
     * @param max
     */
    setOrganization(value, max) {
        if(!Math.validateMax(value, max)) return;
        if(!Math.validateMin(value, 0)) return;
        this.organization.style.width = Math.calculatesPercent(value, max);
    }

    /**
     * Apply a value to the enterprise progress bar
     * @param value
     * @param max
     */
    setEnterprise(value, max) {
        if(!Math.validateMax(value, max)) return;
        if(!Math.validateMin(value, 0)) return;
        this.enterprise.style.width = Math.calculatesPercent(value, max);
    }
};