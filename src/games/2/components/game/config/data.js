import {Keyboard} from 'phaser';

/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "jeu2",
    defaultWidth: 1280, //house width
    defaultHeight: 767 /*ext*/ + 875 /*rdc*/ + 801 /*1st*/ + 801 /*2nd*/ + 899 /*3rd*/, //house height
    offsetHeight: 533,
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
        {name: "trou", floor: "ext", x: 1032, y: 1643, isProtected: false, current: null, tested: false},
        {name: "soubassement", floor: "rdc", x: 331, y: 1640, isProtected: false, current: null, tested: false},
        {name: "baie_ouverte", floor: "rdc", x: 341, y: 1381, isProtected: false, current: null, tested: false},
        {name: "baie_ouverte", floor: "rdc", x: 541, y: 1278, isProtected: false, current: null, tested: false},
        {name: "tremie", floor: "1st", x: 600, y: 1291, isProtected: false, current: null, tested: false},
        {name: "tremie", floor: "2nd", x: 600, y: 1025, isProtected: false, current: null, tested: false},
        {name: "peinture", floor: "3rd", x: 593, y: 650, isProtected: false, current: null, tested: false}
    ],
    depotProtects: {
        "soubassement": ["passerelle_garde_corps"],
        "baie_ouverte": ["protection_baie_ouverte"],
        "tremie": ["garde_corps_tremie"],
        "peinture": ["panneau_peinture_fraiche"],
        "trou": ["barriere_de_protection"]
    }
}