"use strict";

import Config from '../../config/data';
import {Signal} from 'phaser';
import QcmModalHandler from "./QcmModalHandler";
import AbstractObject from "system/phaser/AbstractObject";

/** Qcm Object (include sprite and modals) */
export default class Qcm extends AbstractObject {

    ready = false;
    onFinished = new Signal();
    _previous = null;
    _answer = null;

    get answer() {
        return this._answer;
    }

    set previous(previous) {
        if(previous !== null) {
            previous.onFinished.add(this.modalHandler.show, this.modalHandler)
        }
        this._previous = previous;
    }

    get previous() {
        return this._previous;
    }

    /**
     * Constructor for a new Qcm form
     * @param game
     * @param key
     * @param properties
     */
    constructor(game, key, properties) {
        super(game);
        this.key = key;
        this.properties = properties;
        this.addModalHandler(new QcmModalHandler(properties, this, game));
        this.ready = true;
    }

    continue(answer) { //called by qcmModalHandler
        this._answer = answer;
        Config.questions_part_1[this.properties.id].prop["user-answer"] = answer;
        this.onFinished.dispatch(answer);
    }
};