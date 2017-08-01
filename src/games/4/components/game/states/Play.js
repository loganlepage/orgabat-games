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
import LoadTruck from "../quests/LoadTruck";
import ItemFactory from "../objects/Item/ItemFactory";
import Config from "../config/data";

export default class Play extends State {
    capacity = 29;

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

        this.text = this.game.add.text(16, 16, `Eléments insérés : ${this.capacity}`, {fill: '#ffffff'});

        this.initUI();
        // this.addGrid();
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

    // Grille de 10x10 pour placer les éléments
    // addGrid() {
    //     this.grid = this.game.add.graphics(0,0);
    //     this.grid.lineStyle(1, 0xffffff, 1);
    //     console.log(this.game.world.width);
    //     console.log(this.game.world.height);
    //     for (let i = 0; i < this.game.world.width; i+=10) {
    //         // draw a line
    //         this.grid.moveTo(i,0);
    //         this.grid.lineTo(i,this.game.world.height);
    //     }
    //     for (let j = 0; j < this.game.world.height; j+=10) {
    //         // draw a line
    //         this.grid.moveTo(0,j);
    //         this.grid.lineTo(this.game.world.width,j);
    //     }
    // }

    addShelf() {
        this.shelf = new Shelf({
            game: this.game,
            x: this.game.world.width,
            y: 0,
            key: "other/background"
        });
        this.game.layer.zDepth0.addChild(this.shelf.sprite);
    }

    addTruck() {
        this.truck = new Truck({
            game: this.game,
            x: this.game.world.centerX + 250,
            y: this.game.world.centerY + 250,
            key: "other/truck"
        });
        this.game.layer.zDepth0.addChild(this.truck.sprite);
    }

    addItems() {
        this.game.itemGroup = new ItemFactory(this.game, Config.items);
        this.game.itemGroup.forEach((item) => {
            item.events.onDragStop.add(function (currentSprite) {
                item.obj.checkOverlap(currentSprite, this.truck.sprite)
            }, this);
            item.obj.onDropped.add(this.updateQuantity, this);
        });
    }

    /** Called by Phaser to update */
    update() {
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

    addButton() {
        this.button = new Button({
            game: this.game,
            x: this.game.world.width - 100, 
            y: this.game.world.height - 50, 
            key: "other/validate_button"
        });
    }

    updateQuantity(currentSprite) {
        this.capacity++;
        this.text.text = `Eléments insérés : ${this.capacity}`;
        if (this.capacity === 30) {
            this.addButton();
        }
    }

    removeAll() {
        this.shelf.destroy();
        this.truck.destroy();
        this.game.itemGroup.destroy();
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
            Canvas.get('gabator').modal.showHelp(
                `
            Rappel: Capacité maximale du camion: 30 éléments.
            `
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