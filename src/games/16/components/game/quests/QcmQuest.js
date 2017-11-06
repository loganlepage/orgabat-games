import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class QcmQuest extends Quest {

    _name = 'Choisir la bonne réponse pour chaque situation';
    _key = 'qcm_quest';
    _help = 'Cliquer sur la bonne réponse pour chaque situation';

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
