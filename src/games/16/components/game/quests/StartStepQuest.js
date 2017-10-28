import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class StartStepQuest extends Quest {

    _name = "Remettre dans l’ordre les quatre étapes principales à effectuer";
    _key = 'start_step_quest';
    _help = 'Déposer chaque étape correcte dans le bon ordre';

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
