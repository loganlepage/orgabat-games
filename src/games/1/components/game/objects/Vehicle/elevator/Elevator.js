"use strict";
import {Signal} from 'phaser';
import Position from 'system/phaser/utils/Position';
import Vehicle from '../Vehicle';
import ElevatorSprite from './ElevatorSprite';
import {Keyboard} from 'phaser';
import Canvas from 'system/phaser/utils/PhaserManager';
import Type from 'system/utils/Type';

/** Vehicle Object (include sprite and modals) */
export default class Elevator extends Vehicle {

    confirmed = false;

    /**
     * Constructor for a new elevator vehicle object
     * @param game
     * @param layer
     * @param name
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, layer, type, properties, x, y) {
        super(game, layer, type, properties, x, y,
            new ElevatorSprite(game, Position.getPixelAt(x), Position.getPixelAt(y), type));
        this.sprite.setContext(this);
    }

    /** Start an elevator */
    startBy(player){
        if(super.stopProcess) return;
        const start = () => {
            this.confirmed = true;
            if(Type.isExist(this.objectInCollision))
                super.startBy(player);
        };
        if(!this.confirmed)
            Canvas.get('gabator').modal.showConfirm(
                "Élévateur",
                "Pour conduire un élévateur, vous avez besoin d'un permis adapté.\n" +
                "Êtes vous sûr d'avoir votre permis élévateur ?",
                start,
            );
        else start();
    }
};