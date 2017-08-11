import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class CommunicationQuest extends Quest {

    _name = "Trouve les erreurs de livraison";
    _key = 'communication_quest';
    _help = "Parcours les éléments livrés pour avoir leurs caractéristiques, et voir s'il y a des erreurs par rapport à la commande";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
