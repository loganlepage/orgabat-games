import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class BaieOuverteProtectQuest extends Quest {

    _name = 'Protéger les baies';
    _key = 'baie_ouverte_protect';
    _help = "Avec votre souris, \nprendre et déposer des outils \npour protéger les baies ouvertes.";

    constructor(game) {
        super(game);
        game.materialGroup.forEach((material) => {
            for(let i = 0; i < Config.depotProtects['baie_ouverte'].length; ++i) {
                if(material.type === Config.depotProtects['baie_ouverte'][i]) {

                    //dès qu'un matériel compatible va protéger une trémie
                    material.onProtect.add(()=>{this.onProtect(material)}, this);
                }
            }
        });
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.baieOuverteProtect = this;
        }
    }

    onProtect(material) {
        let isFinished = true;
        for(let i = 0; i < Config.depot.length; ++i)
            if(Config.depot[i].name == "baie_ouverte" && Config.depot[i].isProtected == false)
                isFinished = false;
        if(isFinished) {
            material.onProtect.remove(this.onProtect, this);
            this.done();
        }
    }
}
