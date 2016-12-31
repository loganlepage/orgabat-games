'use strict';
var Gabator = Gabator || {};

/**
 * GUI Progress Bar
 * @type {ProgressBar}
 */
Gabator.ProgressBar = class ProgressBar {
    /**
     * Constructor for a new progress bar
     * @param data
     */
    constructor(data) {
        try {
            Utils.Type.isExist(data.health.dom , true);
            Utils.Type.isNumber(data.health.maxValue, true);
            Utils.Type.isNumber(data.health.value, true);

            Utils.Type.isExist(data.organization.dom , true);
            Utils.Type.isNumber(data.organization.maxValue, true);
            Utils.Type.isNumber(data.organization.value, true);

            Utils.Type.isExist(data.enterprise.dom , true);
            Utils.Type.isNumber(data.enterprise.maxValue, true);
            Utils.Type.isNumber(data.enterprise.value, true);
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
        if(!Utils.Math.validateMax(value, max)) return;
        if(!Utils.Math.validateMin(value, 0)) return;
        this.health.style.width = Utils.Math.calculatesPercent(value, max);
    }

    /**
     * Apply a value to the organization progress bar
     * @param value
     * @param max
     */
    setOrganization(value, max) {
        if(!Utils.Math.validateMax(value, max)) return;
        if(!Utils.Math.validateMin(value, 0)) return;
        this.organization.style.width = Utils.Math.calculatesPercent(value, max);
    }

    /**
     * Apply a value to the enterprise progress bar
     * @param value
     * @param max
     */
    setEnterprise(value, max) {
        if(!Utils.Math.validateMax(value, max)) return;
        if(!Utils.Math.validateMin(value, 0)) return;
        this.enterprise.style.width = Utils.Math.calculatesPercent(value, max);
    }
};