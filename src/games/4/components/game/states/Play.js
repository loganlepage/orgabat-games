/** State when we start the game */
"use strict";
import Phaser, {State, Easing} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import {DefaultManager} from 'system/phaser/Modal';
import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';

import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';
import Config from "../config/data";

import Truck from "../objects/Truck/Truck";
import Shelf from "../objects/Shelf/Shelf";
import Button from "../objects/Button/Button";
import LoadTruck from "../quests/LoadTruck";
import ItemFactory from "../objects/Item/ItemFactory";
import Modal from "../objects/Modal/Modal";

export default class Play extends State {

    capacity = 0;
    capacityMax = 0;
    attempt = 0;
    // attempt = 3; // Shortcut
    selectedItems = [];

    shelf;
    truck;
    itemGroup;

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
        this.game.stage.backgroundColor = '#c3dbb6'; //green background

        PhaserManager.ready('game', 'play');

        this.initUI();

        // Shelf:
        this.shelf = new Shelf({
            game: this.game,
            x: this.game.world.width,
            y: 0,
            key: "other/background"
        });
        this.shelf.sprite.scale.setTo(this.game.SCALE); // Propotionnal scale
        this.game.layer.zDepth0.addChild(this.shelf.sprite);

        // Truck:
        this.truck = new Truck({
            game: this.game,
            x: (this.game.world.centerX + (500 * this.game.SCALE)),
            y: (this.game.world.centerY + (250 * this.game.SCALE)),
            key: "other/truck"
        });
        this.truck.sprite.scale.setTo(this.game.SCALE); // Propotionnal scale
        this.game.layer.zDepth0.addChild(this.truck.sprite);

        // Items
        this.itemGroup = new ItemFactory(this.game, Config.items);
        this.addObjects();

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

    /** Called by Phaser to update */
    update() {
        //
    }

    /** Called by Phaser to render */
    render() {
        //
    }

    /**
     * Called after create, to start the state
     * this.game Rules
     */
     start() {
        this.game.gameProcess = new GameProcess(this);
        this.game.gameProcess.init();
    }

    addObjects() {

        // Items parameters:
        this.capacity = 0;
        // this.capacityMax = 23;
        this.capacityMax = 0;

        // Items:
        this.itemGroup.forEach((item) => {
            if (!item.obj.isCorrect) {
                item.obj.initialize();
                item.scale.setTo(0.7 * this.game.SCALE); // Propotionnal scale
                item.events.onDragStop.add(function (currentSprite) {
                    // Afficher la position pour aider le placement:
                    // console.log(currentSprite.obj.name);
                    // console.log("X: " + Math.round(currentSprite.position.x / this.game.SCALE));
                    // console.log("Y: " + Math.round(currentSprite.position.y / this.game.SCALE));
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                    item.obj.sprite.z = -50;
                }, this);
                item.obj.onDropped.add(this.updateQuantity, this);
                if (item.obj.isNeeded) {
                // this.selectedItems.push(item.obj); // Shortcut
                this.capacityMax++;
            }
        }
    });

        // this.attempt++; // Shortcut
        // this.proceedAttempt(); // Shortcut

        // Texts:
        this.questText = this.game.add.text(15, 15, `Réaliser un mur dagglo de 20 de retour`, {fill: '#ffffff', fontSize: 20});
        this.titleText = this.game.add.text(15, 40, `Éléments ajoutés : ${this.capacity} / ${this.capacityMax}`, {fill: '#ffffff', fontSize: 20});
        this.game.layer.zDepth0.addChild(this.questText);
        this.game.layer.zDepth0.addChild(this.titleText);

        let object = this.capacityMax > 1 ? "objets" : "objet";
        Canvas.get('gabator').modal.showHelp(
            `Il reste encore ${this.capacityMax} ${object}`
            );
    }

    removeControls(){
        this.itemGroup.forEach((item) => {
            item.removeControls();
        });
    }

    addControls(){
        this.itemGroup.forEach((item) => {
            item.addControls();
        });
    }

    addBlackBackground() {
        this.blackBackground = this.game.add.graphics(0,0);
        this.game.layer.zDepth1.addChild(this.blackBackground);
        this.blackBackground.lineStyle(0, "balck", 0);
        this.blackBackground.beginFill("black", 0.4);
        this.blackBackground.drawRect(0, 0, this.game.world.width, this.game.world.height);
    }

    updateQuantity(currentSprite) {
        this.capacity++;
        // Mise à jour de l'item: correct ou non
        if (currentSprite.obj.isNeeded) {
            currentSprite.obj.isCorrect = true;
        } else {
            currentSprite.obj.isCorrect = false;
        }
        // Ajout de l'item aux items séléctioonnés
        this.selectedItems.push(currentSprite.obj);
        this.titleText.text = `Eléments ajoutés : ${this.capacity} / ${this.capacityMax}`;
        if (this.capacity >= this.capacityMax) {
            this.removeControls();
            this.button = new Button({
                game: this.game,
                x: this.game.world.width - 100, 
                y: this.game.world.height - 50, 
                key: "other/validate_button"
            });
            this.button.sprite.events.onInputDown.add(function() {
                this.attempt++;
                this.addBlackBackground();
                this.proceedAttempt();
            }, this);
        }
    }

    proceedAttempt() {
        this.button.sprite.events.onInputDown.removeAll();
        this.button.sprite.destroy();
        this.itemListModal = new Modal({
            game: this.game, 
            x: this.game.world.centerX, 
            y: this.game.world.centerY, 
            key: "other/full_modal",
            title: "Validation du chargement",
            itemGroup: this.itemGroup,
            selectedItems: this.selectedItems,
            attempt: this.attempt
        });
        this.itemListModal.finish.add(function(){
            if(this.itemListModal.isCorrect){
                this.game.gameProcess.quests._quests.load_truck.done();
                this.game.gameProcess._onFinish();
            } else {
                this.removeAll();
                this.addObjects();
                PhaserManager.get('gabator').stats.changeValues({
                    health: PhaserManager.get('gabator').stats.state.health - 1,
                });
            }
        }, this);
    }

    removeAll() {
        this.titleText.destroy();
        this.questText.destroy();
        this.blackBackground.destroy();
        this.itemListModal.destroy();
        this.button.destroy();
        for (let item in this.selectedItems) {
            let tmp = this.selectedItems;
            this.selectedItems = [];
            for (let item2 in tmp) {
                if (tmp[item2].isCorrect) {
                    this.selectedItems.push(tmp[item2]);
                }
            }
        }
    }
};

class GameProcess {

    constructor(playState) {
        this.play = playState;
        this.game = playState.game;
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
        this.quests.add(new LoadTruck(this.game));
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
        endInfoModal.onExit.addOnce(() => window.parent.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);
        // endInfoModal.toggle(true, {}, {
        //     star1: false,
        //     star2: false,
        //     star3: false
        // }, {
        //     health: PhaserManager.get('gabator').stats.state.health,
        //     organization: PhaserManager.get('gabator').stats.state.organization,
        //     enterprise: PhaserManager.get('gabator').stats.state.enterprise,
        // });

        // Étoiles:
        let healthLevel = PhaserManager.get('gabator').stats.state.health;
        let healthLevelMax = PhaserManager.get('gabator').stats.healthMax;

        endInfoModal.toggle(true, {}, {
            star1: healthLevel >= healthLevelMax / 2 ? true : false,
            star2: healthLevel >= (2 * healthLevelMax) / 3 ? true : false,
            star3: healthLevel == healthLevelMax ? true : false
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