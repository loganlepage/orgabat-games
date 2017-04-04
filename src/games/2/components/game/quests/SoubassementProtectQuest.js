import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class TremisProtectQuest extends Quest {

    _name = 'Protéger les soubassements';
    _key = 'soubassement_protect';
    _help = "Avec votre souris, \nprendre et déposer des outils \npour protéger les soubassements.";

    constructor(game) {
        super(game);
        game.materialGroup.forEach((material) => {
            for(let i = 0; i < Config.depotProtects['soubassement'].length; ++i) {
                if(material.type === Config.depotProtects['soubassement'][i]) {

                    //dès qu'un matériel compatible va protéger une trémie
                    material.onProtect.add(()=>{this.onProtect(material)}, this);
                }
            }
        });
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.soubassementProtect = this;
        }
    }

    onProtect(material) {
        let isFinished = true;
        for(let i = 0; i < Config.depot.length; ++i)
            if(Config.depot[i].name == "soubassement" && Config.depot[i].isProtected == false)
                isFinished = false;
        if(isFinished) {
            material.onProtect.remove(this.onProtect, this);
            this.done();
        }
    }
}
