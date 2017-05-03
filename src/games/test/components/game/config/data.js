import {Keyboard} from 'phaser';

/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "test",
    entities: {
        enemies: [
            {name: "ghost", x: 100, y: 30, prop: {}},
            {name: "ghost", x: 300, y: 30, prop: {}},
            {name: "ghost", x: 500, y: 30, prop: {}},
            {name: "ghost", x: 700, y: 30, prop: {}}
        ]
    }
}