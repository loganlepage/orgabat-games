import {Keyboard} from 'phaser';

/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "jeu2",
    defaultWidth: 1920, //house width
    defaultHeight: 960 /*ext*/ + 1312 /*rdc*/ + 1202 /*1st*/ + 1202 /*2nd*/ + 1349 /*3rd*/, //house height
    offsetHeight: 795,
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
            {name: "panneau_peinture_fraiche", prop: {name: "Panneau peinture fraîche"}}
        ]
    },
    depot: [
        {name: "trou", floor: "ext", x: 1545, y: 2480, isProtected: false, current: null, tested: false},
        {name: "soubassement", floor: "rdc", x: 514, y: 2480, isProtected: false, current: null, tested: false},
        {name: "baie_ouverte", floor: "rdc", x: 512, y: 2085, isProtected: false, current: null, tested: false},
        {name: "baie_ouverte", floor: "rdc", x: 812, y: 1935, isProtected: false, current: null, tested: false},
        {name: "tremie", floor: "1st", x: 900, y: 1946, isProtected: false, current: null, tested: false},
        {name: "tremie", floor: "2nd", x: 900, y: 1540, isProtected: false, current: null, tested: false},
        {name: "peinture", floor: "3rd", x: 850, y: 880, isProtected: false, current: null, tested: false}
    ],
    depotProtects: {
        "soubassement": ["passerelle_garde_corps"],
        "baie_ouverte": ["protection_baie_ouverte"],
        "tremie": ["garde_corps_tremie"],
        "peinture": ["panneau_peinture_fraiche"],
        "trou": ["barriere_de_protection"]
    }
}