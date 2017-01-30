"use strict";
import {Signal} from 'phaser';
import Vehicle from '../Vehicle';
import {Keyboard} from 'phaser';
import Canvas from 'system/phaser/utils/PhaserManager';

/** Vehicle Object (include sprite and modals) */
export default class Elevator extends Vehicle {

    /**
     * Constructor for a new elevator vehicle object
     * @param game
     * @param layer
     * @param name
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, layer, name, properties, x, y) {
        super(game, layer, name, properties, x, y);
    }

    /** Start an elevator */
    startBy(player){
        if(super.stopProcess) return;
        console.log("ici on peut interdire des choses");
        Canvas.get('gabator').modal.showConfirm(
            "Élévateur",
            "Pour conduire un élévateur, vous avez besoin d'un permis adapté.\n" +
            "Êtes vous sûr d'avoir votre permis élévateur ?",
            () => {
                super.startBy(player);
            }
        );
    }
};