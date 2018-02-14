import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class CommunicationQuest extends Quest {

    _name = "Sécuriser toutes les zones du chantier";
    _key = 'security_quest';
    _help = "Pour choisir le bon chemin, clique sur l’un des trois choix pour chaque étape.";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
