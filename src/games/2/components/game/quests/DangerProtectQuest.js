import {Quest} from "system/phaser/utils/Quest";
import Config from "../config/data";

export default class DangerProtectQuest extends Quest {

    _name = 'Informer les zones de danger';
    _key = 'danger_protect';
    _help = "Avec votre souris, \nprendre et déposer des panneaux de danger.";

    constructor(game) {
        super(game);
        game.materialGroup.forEach((material) => {
            //peu importe le matériel
            material.onProtect.add(() => {
                this.onProtect(material)
            }, this);
        });
        if (Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.dangerProtect = this;
        }
    }

    onProtect(material) {
        material.onProtect.remove(this.onProtect, this);
        let allAreProtected = true;
        for (const container of Config.containers) {
            if (!container.isProtected) {
                allAreProtected = false;
            }
        }
        if (allAreProtected) {
            this.done();
        }
    }
}
