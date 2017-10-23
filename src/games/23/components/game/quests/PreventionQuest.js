import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class PreventionQuest extends Quest {

    _name = "Choisir la meilleur mesure de prévention pour notre situation";
    _key = 'prevention_quest';
    _help = "Choisir parmi les réponses possibles en indiquant le niveau de prévention";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
