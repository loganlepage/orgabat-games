import {Keyboard} from 'phaser';

/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "jeu2",
    defaultWidth: 600, //house width
    defaultHeight: 371 /*ext*/ + 409 /*rdc*/ + 371 /*1st*/ + 371 /*2nd*/ + 420 /*3rd*/, //house height
    offsetHeight: 240,
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
        {name: "soubassement", floor: "ext", x: 170, y: 830, isProtected: false, current: null, tested: false},
        {name: "baie_ouverte", floor: "rdc", x: 440, y: 622, isProtected: false, current: null, tested: false},
        {name: "baie_ouverte", floor: "rdc", x: 153, y: 669, isProtected: false, current: null, tested: false},
        {name: "tremie", floor: "1st", x: 282, y: 619, isProtected: false, current: null, tested: false},
        {name: "tremie", floor: "2nd", x: 282, y: 488, isProtected: false, current: null, tested: false},
        {name: "tremie", floor: "3rd", x: 282, y: 359, isProtected: false, current: null, tested: false},
        {name: "peinture", floor: "3rd", x: 188, y: 245, isProtected: false, current: null, tested: false}
    ],
    depotProtects: {
        "soubassement": ["passerelle_garde_corps"],
        "baie_ouverte": ["protection_baie_ouverte"],
        "tremie": ["garde_corps_tremie"],
        "peinture": ["panneau_peinture_fraiche"]
    }
}