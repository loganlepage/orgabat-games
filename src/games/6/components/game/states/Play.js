/** State when we start the game */
"use strict";
import Phaser, {State, Easing} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager} from 'system/phaser/Modal';

import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';
import Truck from "../objects/Truck/Truck";
import Shelf from "../objects/Shelf/Shelf";
import Button from "../objects/Button/Button";
import ChargeTruck from "../quests/ChargeTruck";
import ItemFactory from "../objects/Item/ItemFactory";
import Config from "../config/data";

export default class Play extends State {
    paintCapacity = 0;
    materialCapacity = 0;
    mapCapacity = 0;

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
        this.game.stage.backgroundColor = '#DADAD5';
        this.paintText = this.game.add.text(10, 10, `Quantité de peinture : ${this.paintCapacity}/30`, {fill: '#ffffff'});
        this.suppliesText = this.game.add.text(10, 40, `Matériels : ${this.materialCapacity}/3`, {fill: '#ffffff'});
        this.coatText = this.game.add.text(10, 70, `Enduits : ${this.mapCapacity}/6`, {fill: '#ffffff'});

        this.initUI();
        this.addShelf();
        this.addTruck();
        this.addItems();
        PhaserManager.ready('game', 'play');

        this.start();
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

    addShelf() {
        this.shelf = new Shelf({
            game: this.game
        });
        this.shelf.sprite.anchor.setTo(-0.2, 0);
        this.game.layer.zDepth0.addChild(this.shelf.sprite);
    }

    addTruck() {
        this.truck = new Truck({
            game: this.game,
            y: this.game.world.height
        });
        this.truck.sprite.anchor.set(1, 0.95);
    }

    addItems() {
        this.game.itemGroup = new ItemFactory(this.game, Config.items);
        this.game.itemGroup.forEach((item) => {
            item.inputEnabled = true;
            item.input.useHandCursor = true;
            item.events.onDragStop.add(function (currentSprite) {
                let name = currentSprite.frameName;
                if (name === "jeu6/peinture15l" && this.paintCapacity < 30) {
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                } else if (name === "jeu6/peinture5l" && this.paintCapacity < 30) {
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                } else if (name === "jeu6/map" && this.mapCapacity < 6) {
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                } else if ((name === "jeu6/aspirateur" || name === "jeu6/ponceuse" || name === "jeu6/caisse") && this.materialCapacity < 3) {
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                } else {
                    currentSprite.position.copyFrom(currentSprite.originalPosition);
                }
            }, this);
            item.obj.onDropped.add(this.updateQuantity, this);
        });
        this.shelf.sprite.addChild(this.game.itemGroup);
    }

    /** Called by Phaser to update */
    update() {
    }

    /** Called by Phaser to render */
    render() {
        if(Config.developer.debug) {
            this.game.time.advancedTiming = true; //SEE FPS
            this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        }
    }

    /**
     * Called after create, to start the state
     * this.game Rules
     */
    start() {
        this.game.gameProcess = new GameProcess(this);
        this.game.gameProcess.init();
    }

    addButton() {
        this.button = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.button.sprite.events.onInputDown.add(this.onClickAction, this);
    }

    onClickAction() {
        console.log("OK");
    }

    updateQuantity(currentSprite) {
        // TODO: ajouter les messages à Gabator
        // TODO: Attention aux échelles, pb de déplacement
        let name = currentSprite.frameName;
        if (name === "jeu6/peinture15l") {
            if (this.paintCapacity <= 15) {
                this.paintCapacity += 15;
            } else {
                if(Config.developer.debug) {
                    console.log('Trop de peinture');
                }
            }
        }
        if (name === "jeu6/peinture5l") {
            if (this.paintCapacity <= 25) {
                this.paintCapacity += 5;
            } else {
                if(Config.developer.debug) {
                    console.log('Trop de peinture');
                }
            }
        }
        if (name === "jeu6/aspirateur" || name === "jeu6/ponceuse" || name === "jeu6/caisse") {
            if (this.materialCapacity < 3) {
                this.materialCapacity++;
            } else {
                if(Config.developer.debug) {
                    console.log('Trop de matériel');
                }
            }
        }
        if (name === "jeu6/map") {
            if (this.mapCapacity <= 5) {
                this.mapCapacity++;
            } else {
                if(Config.developer.debug) {
                    console.log('Trop de map');
                }
            }
        }
        this.paintText.text = `Quantité de peinture : ${this.paintCapacity}/30`;
        this.suppliesText.text = `Matériels : ${this.materialCapacity}/3`;
        this.coatText.text = `Enduits : ${this.mapCapacity}/6`;
        if (this.paintCapacity === 30 && this.materialCapacity === 3 && this.mapCapacity === 6) {
            this.addButton();
        }
    }
};

class GameProcess {

    constructor(playState) {
        this.play = playState;
        this.game = playState.game;
        this.game.camera.y = this.game.camera.height;

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new DomQuestList(this.quests);
        this.quests.add(new ChargeTruck(this.game));
    }

    init() {
        if (this.bootTweenTime > 0) this.bootTween.start().onComplete.add(() => this._onAnimationEnd());
        else this._onAnimationEnd();
    }

    _onAnimationEnd() {
        //On affiche la modale d'information du début
        this.startInfoModal = new StartInfoModal({}, DefaultManager, this.game);
        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(this._onStartInfoClose, this);
        this.startInfoModal.items.close.items.iconA.events.onInputDown.add(this._onStartInfoClose, this);
        this.startInfoModal.items.close.items.textA.events.onInputDown.add(this._onStartInfoClose, this);
        this.startInfoModal.onDeleted.addOnce(() => {
            delete this.startInfoModal
        }, this);
        this.startInfoModal.toggle(true);
    }

    _onStartInfoClose() {
        //On active Gabator
        if (PhaserManager.get('gabator').state.current == "play") {
            PhaserManager.get('gabator').state.getCurrentState().start();
            Canvas.get('gabator').modal.showHelp(
                "Attention à l'intégrité physique"
            );
        }

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onStartInfoClose, this);


        //Evenements de progression du jeu ici (voir jeu 1 ou jeu 2)

        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
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
        endInfoModal.onExit.addOnce(() => window.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);
        endInfoModal.toggle(true, {}, {
            star1: false,
            star2: false,
            star3: false
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