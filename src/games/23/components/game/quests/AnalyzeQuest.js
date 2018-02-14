import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class AnalyzeQuest extends Quest {

    _name = 'Analyser la situation de travail et évaluer le risque d’accident';
    _key = 'analyze_quest';
    _help = "Rappel de la situation: Vous devez remplacer quelques mètres carrés d’ardoises avec votre patron. En se penchant pour atteindre une ardoise, l’échelle glisse. Votre patron chute de 7 mètres. ";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
