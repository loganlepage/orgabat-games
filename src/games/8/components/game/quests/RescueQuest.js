import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class RescueQuest extends Quest {

    _name = 'Aider Paul';
    _key = 'rescue_quest';
    _help = "Choisir les bonnes étapes pour aider Paul pendant et après son accident de travail";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
