import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class LoadTruck extends Quest {

    _name = 'Charger le camion';
    _key = 'load_truck';
    _help = "Fais glisser les éléments dans le camion. 30 éléments maximum, en regroupant les matériaux, les matériels et les équipements.";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
