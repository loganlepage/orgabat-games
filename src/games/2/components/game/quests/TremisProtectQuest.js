import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class TremisProtectQuest extends Quest {

    _name = 'Protéger les trémis';
    _key = 'tremis_protect';
    _help = "Avec votre souris, \nprendre et déposer des outils \npour protéger les trémis.";

    constructor(game) {
        super(game);
        game.materialGroup.forEach((material) => {
            for(let i = 0; i < Config.depotProtects['tremie'].length; ++i) {
                if(material.type === Config.depotProtects['tremie'][i]) {

                    //dès qu'un matériel compatible va protéger une trémie
                    material.onProtect.add(()=>{this.onProtect(material)}, this);
                }
            }
        });
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.tremisProtect = this;
        }
    }

    onProtect(material) {
        let isFinished = true;
        for(let i = 0; i < Config.depot.length; ++i)
            if(Config.depot[i].name == "tremie" && Config.depot[i].isProtected == false)
                isFinished = false;
        if(isFinished) {
            material.onProtect.remove(this.onProtect, this);
            this.done();
        }
    }
}
