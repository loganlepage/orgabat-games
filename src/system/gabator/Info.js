'use strict';
import Dom from '../utils/Dom';

/** GUI Info */
export default class Info {
    /**
     * Constructor for a new Info
     * @param data
     */
    constructor(data) {
        if(!data || !data.dom || !data.text || !data.text.dom || !data.text.value)
            console.error('Des configurations de Gabator sont manquantes');
        this.data = data;
        this.panel = document.querySelector(data.dom);
        this.info = document.querySelector(data.text.dom);

        this.setInfo(data.text.value);
        Dom.removeClass(this.panel, 'disabled');
    }

    /**
     * Apply a text to info
     * @param text
     */
    setInfo(text) {
        this.info.innerText = text;
    }
};