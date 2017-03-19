import {Keyboard} from 'phaser';

/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "jeu2",
    defaultWidth: 600, //house width
    defaultHeight: 172 /*ext*/ + 132 /*rdc*/ + 140 /*1st*/ + 304 /*2nd*/, //house height
    entities: {
        floors: [
            {name: "3rd", prop: {name: "3e étage"}},
            {name: "2nd", prop: {name: "2e étage"}},
            {name: "1st", prop: {name: "1er étage"}},
            {name: "rdc", prop: {name: "Rez-de-chaussée"}},
            {name: "ext", prop: {name: "Extérieur"}},
        ],
        materials: [
            {name: "passerelle", prop: {name: "Passerelle avec garde corps"}},
            {name: "tremi", prop: {name: "Garde corps de trémi"}},
            {name: "baie_ouverte", prop: {name: "Protection des baies ouvertes"}},
            {name: "barriere", prop: {name: "Barrière de protection"}},
            {name: "peinture", prop: {name: "Panneau peinture fraîche"}}
        ]
    }
}