import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class RescueQuest extends Quest {

    _name = "Choisir les bonnes actions à tenir après l'examen";
    _key = 'rescue_quest';
    _help = 'Choisir les bonnes actions en cliquant dessus';

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
