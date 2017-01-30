"use strict";
import Phaser from 'phaser';
import {DefaultManager, StackManager, Stack} from 'system/phaser/Modal';
import QuestLayout, {TitleLayout} from "system/phaser/modals/Quest";
import Type from "system/utils/Type";

export class Quest {

    _name = 'default_name';
    _key = 'default_key';
    _help = 'default_help';

    constructor(game) {
        this._done = false;
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
    get help() {
        return this._help;
    }
    done() {
        if(this._done) return;
        this._done = true;
        this.onDone.dispatch();
    }
}

export default class QuestManager {

    _quests = {};
    _nbQuestsDone = 0;

    constructor() {
        this.onAdd = new Phaser.Signal();
        this.onDelete = new Phaser.Signal();
        this.onNbQuestsDoneChange = new Phaser.Signal();
    }
    set nbQuestsDone(value) {
        this._nbQuestsDone += value;
        this.onNbQuestsDoneChange.dispatch(this._nbQuestsDone);
    }
    add(quest) {
        if(Type.isExist(this.get(quest.key) && this.get(quest.key) !== quest))
            throw `An other quest with key '${quest.key}' already exist`;

        this._quests[quest.key] = quest;
        this._quests[quest.key].onDone.addOnce(this.isDone, this);
        this.nbQuestsDone = +1;
        this.onAdd.dispatch(quest);
    }
    del(quest) {
        this.onDelete.dispatch(quest);
        delete this._quests[quest.key];
    }
    get(key) {
        return this._quests[key];
    }
    isDone() {
        this.nbQuestsDone = -1;
    }
    getFirstNotDone() {
        let quest = null, founded = false;
        const keys = Object.keys(this._quests).reverse();
        for(let i = 0; i < keys.length; ++i)
            if(!this._quests[keys[i]].isDone && !founded)
                quest = this._quests[keys[i]];
        return quest;
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