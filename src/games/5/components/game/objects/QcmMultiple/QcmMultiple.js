"use strict";

import Config from '../../config/data';
import {Signal} from 'phaser';
import QcmMultipleModalHandler from "./QcmMultipleModalHandler";
import AbstractObject from "system/phaser/AbstractObject";

/** Qcm Object (include sprite and modals) */
export default class QcmMultiple extends AbstractObject {

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
     * @param keys
     * @param properties
     */
    constructor(game, keys, properties) {
        super(game);
        this.keys = keys;
        this.properties = properties;
        this.addModalHandler(new QcmMultipleModalHandler(properties, this, game));
        this.ready = true;
    }

    continue(answer) { //called by qcmModalHandler
        this._answer = answer;
        Config.questions_part_2[this.properties.id].prop["user-answer"] = answer;
        this.onFinished.dispatch(answer);
    }
};