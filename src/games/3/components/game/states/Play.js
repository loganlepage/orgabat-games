"use strict";
import Phaser, {State, Easing, Signal} from "phaser";
import PhaserManager from "system/phaser/utils/PhaserManager";
import StartInfoModal from "../modals/StartInfoModal";
import EndInfoModal from "../modals/EndInfoModal";
import {DefaultManager, StackManager} from "system/phaser/Modal";
import QuestManager, {DomQuestList} from "system/phaser/utils/Quest";
import WasteFactory from "../objects/Waste/WasteFactory";
import Inventary from "../objects/Inventary/Inventary";
import Config from "../config/data";
import Feedback from "system/phaser/modals/Feedback";
import OuvrirBoiteEpiQuest from "../quests/OuvrirBoiteEpiQuest";
import MettreUnEquipementQuest from "../quests/MettreUnEquipementQuest";
import EnleverUnEquipementQuest from "../quests/EnleverUnEquipementQuest";
import JeterUnDechetQuest from "../quests/JeterUnDechetQuest";

/** State when we start the game */
export default class Play extends State {

    /** Constructor for a new play state */
    constructor() {
        super();
    }

    /**
     * Called when the state must be created
     * init all the game (scale, physics, gameobjects...)
     */
    create() {
        this.game.controlsEnabled = false;
        this.game.stage.backgroundColor = '#f5f0d6';
        this.initMap();
        this.initUI();
        this.addInventary();
        this.addWastes();

        PhaserManager.ready('game', 'play');

        this.start();

        this.addWastesEvents();
    }

    /** Called by create to init the map */
    initMap() {
        this.map = this.game.add.sprite(0, 0, "atlas", "jeu3/map");
        this.map.scale.set(this.game.SCALE);
        this.map.alignIn(this.game.world.bounds, Phaser.CENTER);
    }

    /** Called by create to add UI Layers */
    initUI() {
        this.game.layer = {
            zDepth0: this.add.group(),
            zDepth1: this.add.group(),
            zDepth2: this.add.group(),
            zDepth3: this.add.group(),
            zDepthOverAll: this.add.group()
        };
    }

    addInventary() {
        this.game.inventary = new Inventary(this.game, 5, 5);
    }

    addWastes() {
        this.game.wasteGroup = new WasteFactory(this.game, Config.entities.wastes);
        this.map.addChild(this.game.wasteGroup);
    }

    addWastesEvents() {
        this.game.wasteCountTotal = 0;
        this.game.wasteCount = 0;
        this.game.wasteGroup.forEach((waste) => {
            this.game.wasteCountTotal++;
        });

        this.game.wasteText = this.game.add.text(
            this.game.world.centerX, 
            15 * this.game.SCALE, 
            `Déchets traités: ${this.game.wasteCount}/${this.game.wasteCountTotal}`, 
            {
                fill: '#2a2a2a', 
                fontSize: 15 * this.game.SCALE,
                align: 'center'
            }
        );
        this.game.wasteText.anchor.setTo(0.5);

        // this.game.gameProcess._onFinish();

        this.game.gameProcess.game.custom_events.dropAWaste.add(function(){
            this.game.wasteCount++;
            this.game.wasteText.text = `Déchets traités: ${this.game.wasteCount}/${this.game.wasteCountTotal}`;
            if (this.game.wasteCount >= this.game.wasteCountTotal) {
                this.game.gameProcess._onFinish();
            }
        }, this);
    }

    /** Called by Phaser to update */
    update() {
    }

    /** Called by Phaser to render */
    render() {
        //if(Config.developer.debug) {
        /*this.game.time.advancedTiming = true; //SEE FPS
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");*/
        // }
    }

    /**
     * Called after create, to start the state
     * this.game Rules
     */
    start() {
        this.game.gameProcess = new GameProcess(this);
        this.game.gameProcess.init();
    }
};

class GameProcess {
    constructor(playState) {
        this.play = playState;
        this.game = playState.game;
        this.game.custom_events = {};
        this.game.custom_events.dropAWaste = new Signal();
        this.game.camera.y = this.game.camera.height;

        //Animation de la caméra
        //On ajuste sa durée par rapport au mouvement à effectuer (peut être égal à 0)
        this.bootTweenTime = (this.game.world.height - this.game.camera.height) * 4.5;
        this.bootTween = this.game.add.tween(this.game.camera).to({
            y: this.game.canvas.height
        }, this.bootTweenTime, Easing.Quadratic.InOut, false, 600);

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new DomQuestList(this.quests);
        this.quests.add(new OuvrirBoiteEpiQuest(this.game));
        this.quests.add(new MettreUnEquipementQuest(this.game));
        this.quests.add(new EnleverUnEquipementQuest(this.game));
        this.quests.add(new JeterUnDechetQuest(this.game));
    }

    init() {
        if (this.bootTweenTime > 0) this.bootTween.start().onComplete.add(() => this._onAnimationEnd());
        else this._onAnimationEnd();
    }

    _onAnimationEnd() {
        //On affiche la modale d'information du début
        const startInfoModal = new StartInfoModal({}, DefaultManager, this.game);
        const startTheGame = () => {
            startInfoModal.toggle(false);
            this._onStart();
        };

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(startTheGame, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(startTheGame, this);
        startInfoModal.items.close.items.iconA.events.onInputDown.add(startTheGame, this);
        startInfoModal.items.close.items.textA.events.onInputDown.add(startTheGame, this);
        startInfoModal.onDeleted.addOnce(() => {
            this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.removeAll(this);
            this.game.keys.addKey(Phaser.Keyboard.A).onDown.removeAll(this);
        }, this);
        startInfoModal.toggle(true);
    }

    _onStart() {
        //On active Gabator
        if (PhaserManager.get('gabator').state.current == "play")
            PhaserManager.get('gabator').state.getCurrentState().start();

        //events
        let isNotValidModalUsable = true;
        const feedbackModal = (fail_info) => {
            if (!isNotValidModalUsable) return;
            isNotValidModalUsable = false;
            const dropped = new Feedback({}, StackManager, this.game);
            dropped.setInfo(fail_info);
            dropped.toggle(true, {stack: 'BOTTOM_RIGHT'});
            setTimeout(() => {
                dropped.toggle(false, {stack: 'BOTTOM_RIGHT'});
                isNotValidModalUsable = true;
            }, 2000);
        };

        this.game.wasteGroup.forEach((waste) => {
            waste.obj.onActionClick.add((action, waste) => {
                if (Config.infos.wastes[waste.obj.type]) {

                    //Action validation
                    let isValidAction = Config.infos.wastes[waste.obj.type].action.indexOf(action.data.name) > -1;
                    let isAllEpiSetted = true;
                    Config.infos.wastes[waste.obj.type].epi.forEach((epi) => {
                        if (this.game.inventary.equipped.map((e) => e.data.name).indexOf(epi) === -1) {
                            isAllEpiSetted = false;
                        }
                    });
                    let isTooMuchEpi = false;
                    this.game.inventary.equipped.forEach((epi) => {
                        if (Config.infos.wastes[waste.obj.type].epi.indexOf(epi.data.name) === -1) {
                            isTooMuchEpi = true;
                        }
                    });

                    //Do something after the validation
                    waste.toggle(false);
                    if (Config.infos.actions[action.data.name]) {
                        let doAction = false;
                        if (!isValidAction) {
                            if(!waste.obj.properties.isFail) {
                                // waste.obj.properties.isFail = true;
                                feedbackModal(Config.infos.actions[action.data.name].fail);
                                PhaserManager.get('gabator').stats.changeValues({
                                    organization: PhaserManager.get('gabator').stats.state.organization - 1,
                                    enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1,
                                });
                            }
                        } else if (!isAllEpiSetted) {
                            if(!waste.obj.properties.isNotEquipped) {
                                // waste.obj.properties.isNotEquipped = true;
                                feedbackModal("Vous n'êtes pas équipé pour déplacer ce déchet.");
                                PhaserManager.get('gabator').stats.changeValues({
                                    organization: PhaserManager.get('gabator').stats.state.organization - 1,
                                    health: PhaserManager.get('gabator').stats.state.health - 1,
                                });
                            }
                        } else if (isTooMuchEpi) {
                            feedbackModal("Vous êtes trop équipé, mais vous traitez le déchet.");
                            PhaserManager.get('gabator').stats.changeValues({
                                organization: PhaserManager.get('gabator').stats.state.organization - 1,
                            });
                            doAction = true;
                        } else {
                            feedbackModal(Config.infos.actions[action.data.name].success);
                            doAction = true;
                        }
                        if (doAction) {
                            waste.obj.sprite.destroy();
                            this.game.custom_events.dropAWaste.dispatch();
                        }
                    }
                }
            });
        });

        this.game.controlsEnabled = true;
        this._timeStart = this.game.time.now;
    }

    _onFinish() {
        this.game.controlsEnabled = false;
        this._timeEnd = this.game.time.now;

        //On affiche la modale de fin
        const endInfoModal = new EndInfoModal({}, DefaultManager, this.game, {
            healthMax: PhaserManager.get('gabator').stats.healthMax,
            organizationMax: PhaserManager.get('gabator').stats.organizationMax,
            enterpriseMax: PhaserManager.get('gabator').stats.enterpriseMax
        });

        endInfoModal.onExit.addOnce(() => window.parent.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);

        // Stars:
        let healthLevel = PhaserManager.get('gabator').stats.state.health,
            healthLevelMax = PhaserManager.get('gabator').stats.healthMax,

            organizationLevel = PhaserManager.get('gabator').stats.state.organization,
            organizationLevelMax = PhaserManager.get('gabator').stats.organizationMax,

            enterpriseLevel = PhaserManager.get('gabator').stats.state.enterprise,
            enterpriseLevelMax = PhaserManager.get('gabator').stats.enterpriseMax,

            maxLevel = healthLevel + organizationLevel + enterpriseLevel,
            max = healthLevelMax + organizationLevelMax + enterpriseLevelMax;

        endInfoModal.toggle(true, {}, {
            star1: true,
            star2: maxLevel >= max / 2 ? true : false,
            star3: maxLevel == max ? true : false
        }, {
            health: PhaserManager.get('gabator').stats.state.health,
            organization: PhaserManager.get('gabator').stats.state.organization,
            enterprise: PhaserManager.get('gabator').stats.state.enterprise,
        });

        //Et on envoie le score à l'API
        window.api.sendScore({
            exerciseId: game_id,
            time: Math.round((this._timeEnd - this._timeStart) / 1000),
            health: PhaserManager.get('gabator').stats.state.health,
            organization: PhaserManager.get('gabator').stats.state.organization,
            business: PhaserManager.get('gabator').stats.state.enterprise
        }, () => {
        });
    }
}