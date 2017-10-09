import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class WorkspaceQuest extends Quest {

    _name = "Trouver les bonnes solutions pour chaque espace de travail";
    _key = 'workspace_quest';
    _help = "Choisis d'abord une image dans la rangée du haut pour trouver la solution adaptée dans la rangée du bas";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}
