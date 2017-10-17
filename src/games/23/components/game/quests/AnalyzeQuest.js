import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class AnalyzeQuest extends Quest {

    _name = 'Analyser la situation de travail et évaluer le risque d’accident';
    _key = 'analyze_quest';
    _help = "Remplir le schéma d’apparition du dommage en faisant glisser la réponse sur les différentes bulles";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
