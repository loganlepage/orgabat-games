import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class SafetyQuest extends Quest {

    _name = "Choisir les bonnes conduites à tenir en cas d'incident";
    _key = 'safety_quest';
    _help = "Déplacer les conduites à avoir en respectant l'ordre d'intervention";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
