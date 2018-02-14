import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class TruckQuest extends Quest {

    _name = "Ajouter 30L de peinture, 1 aspirateur, 1 ponceuse, 1 caisse à outils, 6 sacs d'enduit de rebouchage";
    _key = 'truck_quest';
    _help = "Glisser les matériels et matériaux dans le camion";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
