import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class ChargeTruck extends Quest {

    _name = 'Charger le camion avec 30 éléments';
    _key = 'charge_truck';
    _help = "Terminer la discussion avec Gabator.";

    constructor(game) {
        super(game);
        game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
