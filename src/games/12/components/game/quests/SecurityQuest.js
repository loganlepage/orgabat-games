import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class CommunicationQuest extends Quest {

    _name = "Retrouver le nom des équipements d'arrimage";
    _key = 'security_quest';
    _help = "Déplace le numéro des réponses sur les zones de l'image pour attribuer le nom correspondant à l'équipement";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
