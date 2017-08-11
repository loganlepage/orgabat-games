import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class CommunicationQuest extends Quest {

    _name = "Trouve ls bonnes réponses pour chaque QCM";
    _key = 'communication_quest';
    _help = "Sélectionne une ou plusieurs réponses puis valide tes choix our chaque QCM";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
