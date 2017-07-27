import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class NumberQuest extends Quest {

    _name = 'Trouve rles bons numéros';
    _key = 'numbers_quest';
    _help = "Choisir les bons numéro de téléphone pour chaque type de secours";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
