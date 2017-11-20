/** State when we start the game */
"use strict";
import Phaser, {State, Easing} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager, Stack} from 'system/phaser/Modal';

import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';
import Config from "../config/data";

import CommunicationQuest from "../quests/CommunicationQuest";

import Button from '../objects/Button/Button';
import ItemFactory from "../objects/Items/ItemFactory";
import ElementFactory from "../objects/List/ElementFactory";

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
        this.game.stage.backgroundColor = '#FFFFFF';

        this.tileSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, "atlas");
        this.tileSprite.tileScale.set(this.game.SCALE * 1.5);
        this.tileSprite.alpha = 0.15;

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

class Engine {

    finish = new Phaser.Signal();

    game;
    itemName;
    title;
    items;
    validate;
    order;
    answersCorrection = [];

    constructor(gameProcess) {
        this.gameProcess = gameProcess;

        this.gameProcess.quests.add(new CommunicationQuest(this.gameProcess.game));
        this.gameProcess.questsCleaned.addOnce(function(){
            this.finish.dispatch();
        }, this);

        // Fonts size
        let bigFont = 24 * this.gameProcess.game.SCALE,
            mediumFont = 20 * this.gameProcess.game.SCALE;

        // Title
        this.title = this.gameProcess.game.add.text(
            this.gameProcess.game.world.centerX, 
            40 * this.gameProcess.game.SCALE, 
            "Réceptionner la livraison", 
            {font: 'Arial', fontSize: bigFont, fill: '#000000'}
        );
        this.title.anchor.setTo(0.5);
        this.gameProcess.game.layer.zDepth0.addChild(this.title);

        // Items
        this.items = new ItemFactory(
            this.gameProcess.game, 
            Config.items);
        this.items.forEach((item) => {
            item.scale.setTo(this.gameProcess.game.SCALE); // Propotionnal scale
            // Tooltip
            item.events.onInputOver.add(() => {
                this.itemName = item.obj.addTooltips(item);
                this.itemName.fontSize = mediumFont;
            }, this);
            item.events.onInputOut.add(() => {
                this.itemName.destroy();
            }, this);
            // Item modal
            item.obj.onClicked.add(function(){
                this.items.forEach((item2) => {
                    item2.obj.disableControls();
                });
                this.list.forEach((list2) => {
                    list2.disableControls();
                });
            }, this);
            item.obj.onClosed.add(function(){
                this.items.forEach((item2) => {
                    item2.obj.enableControls();
                });
                this.list.forEach((list2) => {
                    list2.enableControls();
                });
            }, this);
        });

        // List of items to check answers
        this.list = new ElementFactory(
            this.gameProcess.game, 
            Config.items, 
            Config.states
        );
        // Element modal
        this.list.forEach((item) => {
            item.onClicked.add(function(){
                this.items.forEach((item2) => {
                    item2.obj.disableControls();
                });
                this.list.forEach((list2) => {
                    list2.disableControls();
                });
            }, this);
            item.onClosed.add(function(){
                this.items.forEach((item2) => {
                    item2.obj.enableControls();
                });
                this.list.forEach((list2) => {
                    list2.enableControls();
                });
            }, this);
        });

        // // Validate button
        this.validate = new Button(
            this.gameProcess.game, 
            this.gameProcess.game.world.width - 120 * this.gameProcess.game.SCALE, 
            this.gameProcess.game.world.height - 60 * this.gameProcess.game.SCALE, 
            "valider"
        );

        this.validate.sprite.scale.setTo(this.gameProcess.game.SCALE); // Propotionnal scale
        this.validate.sprite.events.onInputDown.add(function(){
            // Check answers
            this.answersCorrection = [];
            this.list.forEach((element) => {
                // Add each element correction (true or false)
                this.answersCorrection.push(element.validateAnswer());
            });
            // If no incorrect responses, then it's done
            if (this.answersCorrection.includes(false) || this.answersCorrection == []) {
                PhaserManager.get('gabator').stats.changeValues({
                    health: PhaserManager.get('gabator').stats.state.health - 1,
                });
            } else {
                this.gameProcess.quests._quests.communication_quest.done();
                this.finish.dispatch();
            }
        }, this);

        // Order image button
        this.order = new Button(
            this.gameProcess.game, 
            120 * this.gameProcess.game.SCALE, 
            this.gameProcess.game.world.height - 60 * this.gameProcess.game.SCALE, 
            "order"
        );

        this.order.sprite.scale.setTo(this.gameProcess.game.SCALE); // Propotionnal scale
        this.order.sprite.events.onInputDown.add(function(){
            // Disable all controls
            this.items.forEach((item2) => {
                item2.obj.enableControls();
            });
            this.list.forEach((list2) => {
                list2.enableControls();
            });
            // Create black background
            this.blackBackground = this.gameProcess.game.add.graphics(0,0);
            this.gameProcess.game.layer.zDepth1.addChild(this.blackBackground);
            this.blackBackground.lineStyle(0, "balck", 0);
            this.blackBackground.beginFill("black", 0.5);
            this.blackBackground.drawRect(0, 0, this.gameProcess.game.world.width, this.gameProcess.game.world.height);
            this.blackBackground.inputEnabled = true;
            this.blackBackground.input.useHandCursor = true;
            // Display order image, not a button
            this.order = new Button(
                this.gameProcess.game, 
                this.gameProcess.game.world.centerX, 
                this.gameProcess.game.world.centerY, 
                "order_image"
            );
            this.order.sprite.inputEnabled = false;
            this.gameProcess.game.layer.zDepth1.addChild(this.order.sprite);
            this.blackBackground.events.onInputDown.add(function(){
                this.order.sprite.destroy();
                this.order = null;
                // Enable all controls
                this.items.forEach((item2) => {
                    item2.obj.enableControls();
                });
                this.list.forEach((list2) => {
                    list2.enableControls();
                });
                this.blackBackground.destroy();
            }, this);
        }, this);

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

        // Classes à utiliser
        this.engine = new Engine(this);
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
            // Canvas.get('gabator').modal.showHelp(
            //     "..."
            // );
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
        // this.engine.start();
        this.engine.finish.addOnce(this._onFinish, this);
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