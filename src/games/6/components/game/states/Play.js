/** State when we start the game */
"use strict";
import Phaser, {State, Easing} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager, Stack} from 'system/phaser/Modal';

import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';
import Truck from "../objects/Truck/Truck";
import Shelf from "../objects/Shelf/Shelf";
import Button from "../objects/Button/Button";
import ItemFactory from "../objects/Item/ItemFactory";
import StepFactory from "../objects/Step/StepFactory";
import MapStepFactory from "../objects/MapStep/MapStepFactory";
import Config from "../config/data";

import TruckQuest from "../quests/TruckQuest";
import StepsQuest from "../quests/StepsQuest";

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
        this.game.stage.backgroundColor = '#DADAD5';

        this.initUI();
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

    /** Called by Phaser to render */
    render() {
        /*if(Config.developer.debug) {
            this.game.time.advancedTiming = true; //SEE FPS
            this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        }*/
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

class PartOne {

    finish = new Phaser.Signal();

    clickedSteps = 0;

    constructor(gameProcess) {
        this.game = gameProcess.game;
        this.gameProcess = gameProcess;
    }

    start() {
        this.gameProcess.quests.add(new StepsQuest(this.gameProcess.game));
        this.gameProcess.questsCleaned.addOnce(this.onQuestsCleaned, this);
        this.stepText = this.game.add.text(10, 10, `Étapes séléctionnées: ${this.clickedSteps}/8`, {fill: '#ffffff'});
        this.addSteps();
        // this.addButton();
        // this.onQuestsCleaned(); // To go to the end
    }

    addSteps() {
        let healthMax = 4;
        this.stepGroup = new StepFactory(this.game, Config.steps);
        this.stepGroup.forEach((step) => {
            step.text1.inputEnabled = true;
            step.text1.input.useHandCursor = true;
            step.text1.events.onInputDown.add(function(){
                if (!step.clicked) {
                    if (step.check()){
                        this.clickedSteps++;
                        if (this.clickedSteps >= 8) {
                            this.addButton();
                        }
                    } else if (healthMax > 0){
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                        healthMax--;
                    }
                    this.stepText.text = `Étapes séléctionnées: ${this.clickedSteps}/8`;
                }
            }, this);
        });
    }

    addButton() {
        this.partOneButton = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.partOneButton.sprite.events.onInputDown.add(this.onClickAction, this);
        this.gameProcess.quests._quests.steps_quest.done();
    }

    onClickAction() {
        this.onQuestsCleaned();
    }

    onQuestsCleaned() {
        this.removeElements();
        this.finish.dispatch();
    }

    removeElements() {
        this.removeText();
        this.removeButton();
    }

    removeText() {
        this.stepGroup.forEach((step) => {step.removeText()}, this);
        this.stepText.destroy();
        this.stepGroup = null;
    }

    removeButton() {
        this.partOneButton.destroy();
    }

}

class PartTwo {

    paintCapacity = 0;
    materialCapacity = 0;
    mapCapacity = 0;

    firstMap = true;

    finish = new Phaser.Signal();

    constructor(gameProcess) {
        this.gameProcess = gameProcess;
        this.game = gameProcess.game;
    }

    start() {
        this.paintText = this.game.add.text(10, 10, `Quantité de peinture : ${this.paintCapacity}/30`, {fill: '#ffffff'});
        this.suppliesText = this.game.add.text(10, 40, `Matériels : ${this.materialCapacity}/3`, {fill: '#ffffff'});
        this.coatText = this.game.add.text(10, 70, `Enduits : ${this.mapCapacity}/6`, {fill: '#ffffff'});
        this.game.layer.zDepth0.addChild(this.paintText);
        this.game.layer.zDepth0.addChild(this.suppliesText);
        this.game.layer.zDepth0.addChild(this.coatText);
        this.addTruck();
        this.addShelf();
        this.addItems();
        this.gameProcess.quests.add(new TruckQuest(this.gameProcess.game));
        this.gameProcess.questsCleaned.addOnce(this.onQuestsCleaned, this);
        // this.mapSteps(); // To go to the end
        // this.addButton(); // To go to the end
    }

    onQuestsCleaned() {
        this.finish.dispatch();
    }

    addTruck() {
        this.truck = new Truck({
            game: this.game,
            x: 20,
            y: 400
        });
        // this.truck.sprite.anchor.set(1, 0.95);
        this.game.layer.zDepth0.addChild(this.truck.sprite);
    }

    addShelf() {
        this.shelf = new Shelf({
            game: this.game,
            x: this.game.world.width - 400,
            y: 0
        });
        this.shelf.sprite.anchor.setTo(0, 0);
        // this.shelf.sprite.anchor.setTo(-0.2, 0);
        this.game.layer.zDepth0.addChild(this.shelf.sprite);
    }

    addItems() {
        Canvas.get('gabator').modal.showHelp(
            "Il faut: un aspirateur, une ponceuse, une caisse à outils, 30L de peinture et 6 sacs d'enduit"
        );
        this.game.itemGroup = new ItemFactory(this.game, Config.items);
        // this.shelf.sprite.addChild(this.game.itemGroup);
        this.game.layer.zDepth1.addChild(this.game.itemGroup);
        this.addItemsAction();
    }

    addItemsAction() {
        this.game.itemGroup.forEach((item) => {
            item.inputEnabled = true;
            item.input.useHandCursor = true;
            item.events.onDragStop.add(function (currentSprite) {
                let name = currentSprite.frameName;
                if (name === "jeu6/peinture15l" && this.paintCapacity < 30) {
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                } else if (name === "jeu6/peinture5l" && this.paintCapacity < 30) {
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                } else if ((name === "jeu6/peinture15l" || name === "jeu6/peinture5l") && this.paintCapacity >= 30) {
                    Canvas.get('gabator').modal.showHelp(
                        "La totalité de la peinture a déjà été chargée"
                    );
                    currentSprite.position.copyFrom(currentSprite.originalPosition);
                } else if (name === "jeu6/map" && this.mapCapacity < 6) {
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                } else if (name === "jeu6/map" && this.mapCapacity >= 6) {
                    Canvas.get('gabator').modal.showHelp(
                        "La totalité des enduits a déjà été chargée"
                    );
                    currentSprite.position.copyFrom(currentSprite.originalPosition);
                } else if ((name === "jeu6/aspirateur" || name === "jeu6/ponceuse" || name === "jeu6/caisse") && this.materialCapacity < 3) {
                    item.obj.checkOverlap(currentSprite, this.truck.sprite);
                } else {
                    Canvas.get('gabator').modal.showHelp(
                        "L'élément n'est pas correct"
                    );
                    currentSprite.position.copyFrom(currentSprite.originalPosition);
                }
            }, this);
            item.obj.onDropped.add(this.updateQuantity, this);
        });
    }

    updateQuantity(currentSprite) {
        // TODO: ajouter les messages à Gabator
        // TODO: Attention aux échelles, pb de déplacement
        let name = currentSprite.frameName;

        if (currentSprite.obj.check()) {
            if (name === "jeu6/peinture15l") {
                console.log("15L");
                console.log(this.paintCapacity);
                if (this.paintCapacity <= 15) {
                    this.paintCapacity += 15;
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.state.health - 1,
                    });
                    Canvas.get('gabator').modal.showHelp(
                        "Attention, ces pots de peinture sont trop lourds"
                    );
                }
            } else if (name === "jeu6/peinture5l") {
                if (this.paintCapacity <= 25) {
                    this.paintCapacity += 5;
                }
            } else if (name === "jeu6/aspirateur" || name === "jeu6/ponceuse" || name === "jeu6/caisse") {
                if (this.materialCapacity < 3) {
                    this.materialCapacity++;
                }
            } else if (name === "jeu6/map") {
                if (this.firstMap) {
                    this.firstMap = false;
                    this.mapSteps();
                }
                if (this.mapCapacity <= 5) {
                    this.mapCapacity++;
                }
            }
            this.paintText.text = `Quantité de peinture : ${this.paintCapacity}/30`;
            this.suppliesText.text = `Matériels : ${this.materialCapacity}/3`;
            this.coatText.text = `Enduits : ${this.mapCapacity}/6`;
            if (this.paintCapacity === 30 && this.materialCapacity === 3 && this.mapCapacity === 6) {
                this.addButton();
            }
        }
    }

    addButton() {
        this.gameProcess.quests._quests.truck_quest.done();
        this.button = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.button.sprite.events.onInputDown.add(this.onClickAction, this);
    }

    onClickAction() {
        this.onQuestsCleaned();
    }

    mapSteps() {
        // Draw a rectangle
        this.graphics = this.game.add.graphics(0, 0);
        this.game.layer.zDepth1.addChild(this.graphics);
        this.graphics.lineStyle(0, "balck", 0);
        this.graphics.beginFill("black", 0.5);
        this.graphics.drawRect(0, 0, this.game.world.width, this.game.world.height);
        this.graphics.lineStyle(1, "balck", 0);
        this.addMapSteps();
    }

    addMapSteps() {
        this.mapStepGroup = new MapStepFactory(this.game, Config.mapSteps);
        this.addMapStepActions();
    }

    addMapStepActions() {
        this.disableControls();

        let currentPosition = 1;
        let finished = false;

        this.mapStepText = this.game.add.text(200, 100, `Schéma pour l'étape numéro : ${currentPosition}/3`, {fill: '#ffffff'});

        this.mapStepGroup.forEach((mapStep) => {
            mapStep.sprite.input.useHandCursor = true;
            mapStep.sprite.events.onInputDown.add(function(){
                if (!mapStep.validated) {
                    if (mapStep.check(currentPosition) && !finished){
                        currentPosition++;
                        this.mapStepText.text = `Schéma pour l'étape numéro : ${currentPosition}/3`;
                        mapStep.validate();
                    } else if (!mapStep.check(currentPosition) || !finished){
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                        Canvas.get('gabator').modal.showHelp(
                            "Mauvaise étape sélectionnée"
                        );
                    }
                    if (currentPosition >= 4 && !finished) {
                        this.mapStepText.text = `Toutes les étapes ont été validées`;
                        finished = true;
                        this.addMapStepsButton();
                    }
                }
            }, this);
            this.game.layer.zDepthOverAll.addChild(mapStep.sprite);
        });
    }

    addMapStepsButton() {
        this.mapButton = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.mapButton.sprite.events.onInputDown.add(this.removeMapSteps, this);
        this.game.layer.zDepth1.addChild(this.mapButton.sprite);
    }

    removeMapSteps() {
        this.addItemsAction();
        this.mapButton.destroy();
        this.mapStepText.destroy();
        this.graphics.destroy();
        this.mapStepGroup.forEach((mapStep) => {mapStep.destroy()}, this);
        this.mapStepGroup.destroy();
        this.mapStepGroup = null;
    }

    disableControls() {
        this.game.itemGroup.forEach((item) => {
            item.inputEnabled = false;
            item.input.useHandCursor = false;
        });
    }

}

class GameProcess {

    questsCleaned = new Phaser.Signal();

    constructor(playState) {
        this.play = playState;
        this.game = playState.game;
        this.game.camera.y = this.game.camera.height;

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new DomQuestList(this.quests);

        this.partOne = new PartOne(this);
        this.partTwo = new PartTwo(this);
    }

    init() {
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

        this._initParts();

        //Evenements de progression du jeu ici (voir jeu 1 ou jeu 2)

        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.game.controlsEnabled = true;

        this._timeStart = this.game.time.now;
    }

    _initParts() {
        //When ready, lets init parts.
        this.partOne.finish.addOnce(this.partTwo.start, this.partTwo);
        this.partTwo.finish.addOnce(this._onFinish, this);
        this.partOne.start();
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
        let healthLevel = PhaserManager.get('gabator').stats.state.health;
        let healthLevelMax = PhaserManager.get('gabator').stats.healthMax;
        endInfoModal.toggle(true, {}, {
            star1: this.quests.get('steps_quest').isDone,
            star2: this.quests.get('truck_quest').isDone,
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