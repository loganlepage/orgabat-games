import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class CommunicationQuest extends Quest {

    _name = "Trouve les erreurs de livraison";
    _key = 'communication_quest';
    _help = "Clique sur les éléments livrés pour avoir leurs caractéristiques, et clique sur le + pour valider ou non les éléments livrés";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
