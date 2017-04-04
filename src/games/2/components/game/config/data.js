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
            {name: "passerelle_garde_corps", prop: {name: "Passerelle avec garde corps"}},
            {name: "garde_corps_tremie", prop: {name: "Garde corps de trémi"}},
            {name: "protection_baie_ouverte", prop: {name: "Protection des baies ouvertes"}},
            {name: "barriere_de_protection", prop: {name: "Barrière de protection"}},
            {name: "panneau_peinture_fraiche", prop: {name: "Panneau peinture fraîche"}},
        ]
    },
    depot: [
        {name: "soubassement", x: 270, y: 748, isProtected: false, current: null, tested: false},
        {name: "baie_ouverte", x: 150, y: 622, isProtected: false, current: null, tested: false},
        {name: "baie_ouverte", x: 478, y: 622, isProtected: false, current: null, tested: false},
        {name: "tremie", x: 390, y: 560, isProtected: false, current: null, tested: false},
        {name: "tremie", x: 390, y: 425, isProtected: false, current: null, tested: false},
        {name: "peinture", x: 280, y: 250, isProtected: false, current: null, tested: false}
    ],
    depotProtects: {
        "soubassement": ["passerelle_garde_corps"],
        "baie_ouverte": ["protection_baie_ouverte"],
        "tremie": ["garde_corps_tremie"],
        "peinture": ["panneau_peinture_fraiche"]
    }
}