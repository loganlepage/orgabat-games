"use strict";
import Phaser from 'phaser';
import {DefaultManager, StackManager, Stack} from 'system/phaser/Modal';
import QuestLayout, {TitleLayout} from "system/phaser/modals/Quest";
import Type from "system/utils/Type";

export class Quest {
    constructor(game) {
        this._done = false;
        this._key = 'default';
        this.onDone = new Phaser.Signal();
    }
    get isDone() {
        return this._done;
    }
    get name() {
        return this._name;
    }
    get key() {
        return this._key;
    }
    done() {
        this._done = true;
        this.onDone.dispatch();
    }
}

export default class QuestManager {
    constructor() {
        this.quests = {};
        this.onAdd = new Phaser.Signal();
        this.onDelete = new Phaser.Signal();
    }
    add(quest) {
        if(Type.isExist(this.get(quest.key) && this.get(quest.key) !== quest))
            throw `An other quest with key '${quest.key}' already exist`;

        this.quests[quest.key] = quest;
        this.onAdd.dispatch(quest);
    }
    del(quest) {
        this.onDelete.dispatch(quest);
        delete this.quests[quest.key];
    }
    get(key) {
        return this.quests[key];
    }
}

export class GuiQuestList {
    constructor(x, y, questManager, game) {
        this.qm = questManager;
        this.quests = {};
        this.game = game;
        this.stack = new Stack(
            x, y, game, {
                axe: Stack.VERTICAL, direction: Stack.BOTTOM,
                offsetX: 10, offsetY: 15, anchorX: 1, sort: Stack.ASC
            }
        );
        const title = new TitleLayout({}, StackManager, game);
        title.toggle(true, {stack: this.stack});
        questManager.onAdd.add(this.add, this);
        this._sync();
    }
    _sync() {
        for(const key in this.qm.quests)
            if(!Type.isExist(this.get(key)))
                this.add(this.qm.get(key));
    }
    add(quest) {
        if(Type.isExist(this.get(quest.key)) && this.get(quest.key) !== quest)
            throw `An other quest with key '${quest.key}' already exist`;

        this.quests[quest.key] = {
            quest: quest,
            gui: new QuestLayout({items: {text: { text: quest.name}}}, StackManager, this.game)
        };
        quest.onDone.addOnce(this.get(quest.key).gui.setFinish, this.get(quest.key).gui);
        this.show(quest);
    }

    /** display methods */
    show(quest) { this.toggle(quest, true) }
    showAll() {
        for(const key in this.qm.quests)
            this.show(this.qm.get(key))
    }
    hide(quest) { this.toggle(quest, false) }
    hideAll() {
        for(const key in this.qm.quests)
            this.hide(this.qm.get(key))
    }
    toggle(quest, bool) { this.get(quest.key).gui.toggle(bool, {stack: this.stack}) }
    get(key) {
        return this.quests[key];
    }
}