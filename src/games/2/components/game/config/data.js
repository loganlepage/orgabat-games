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
            {name: "2nd", prop: {name: "3e étage"}},
            {name: "1st", prop: {name: "1er étage"}},
            {name: "rdc", prop: {name: "Rez-de-chaussée"}},
            {name: "ext", prop: {name: "Extérieur"}},
        ],
        materials: [
            {name: "passerelle_garde_corps", prop: {name: "Passerelle avec garde corps"}, part: 2},
            {name: "garde_corps_tremie", prop: {name: "Garde corps de trémi"}, part: 2},
            {name: "protection_baie_ouverte", prop: {name: "Protection des baies ouvertes"}, part: 2},
            {name: "barriere_de_protection", prop: {name: "Barrière de protection"}, part: 2},
            {name: "panneau_peinture_fraiche", prop: {name: "Panneau peinture fraîche"}, part: 2},
            {name: "panneau_danger", prop: {name: "Panneau de danger"}, part: 1},
        ]
    },
    containerIndex: {
        "trou": 0,
        "soubassement": 1,
        "baie_ouverte": 2,
        "tremie": 3,
        "peinture": 4,
    },
    containers: [
        {
            name: "trou", floor: "ext", x: 1032, y: 1377, isProtected: false, current: null, tested: false,
            protects: ["barriere_de_protection", "panneau_danger"],
            protectsSwitchable: ["panneau_danger"],
            area: {
                "passerelle_garde_corps": {
                    from: {x: 1030, y: 1433, radius: 100}, to: {x: 1030, y: 1433}
                },
                "garde_corps_tremie": {
                    from: {x: 1007, y: 1400, radius: 90}, to: {x: 1007, y: 1400}
                },
                "protection_baie_ouverte": {
                    from: {x: 1036, y: 1462, radius: 140}, to: {x: 1087, y: 1421}
                },
                "barriere_de_protection": {
                    from: {x: 1036, y: 1373, radius: 70}, to: {x: 1036, y: 1373}
                },
                "panneau_danger": {
                    from: {x: 1036, y: 1462, radius: 180}, to: {x: 955, y: 1506}
                },
                "panneau_peinture_fraiche": {
                    from: {x: 1036, y: 1462, radius: 180}, to: {x: 955, y: 1506}
                }
            }
        },
        {
            name: "soubassement", floor: "rdc", x: 331, y: 1374, isProtected: false, current: null, tested: false,
            protects: ["passerelle_garde_corps", "panneau_danger"],
            protectsSwitchable: ["panneau_danger"],
            area: {
                "passerelle_garde_corps": {
                    from: {x: 350, y: 1400, radius: 90}, to: {x: 360, y: 1386}
                },
                "garde_corps_tremie": {
                    from: {x: 310, y: 1434, radius: 170}, to: {x: 347, y: 1373}
                },
                "protection_baie_ouverte": {
                    from: {x: 310, y: 1434, radius: 170}, to: {x: 329, y: 1405}
                },
                "barriere_de_protection": {
                    from: {x: 310, y: 1434, radius: 170}, to: {x: 254, y: 1404}
                },
                "panneau_danger": {
                    from: {x: 310, y: 1434, radius: 170}, to: {x: 376, y: 1340}
                },
                "panneau_peinture_fraiche": {
                    from: {x: 310, y: 1434, radius: 170}, to: {x: 376, y: 1340}
                }
            }
        },
        {
            name: "baie_ouverte", floor: "rdc", x: 341, y: 1115, isProtected: false, current: null, tested: false,
            protects: ["protection_baie_ouverte", "panneau_danger"],
            protectsSwitchable: ["panneau_danger"],
            area: {
                "passerelle_garde_corps": {
                    from: {x: 373, y: 1192, radius: 100}, to: {x: 373, y: 1192}
                },
                "garde_corps_tremie": {
                    from: {x: 386, y: 1176, radius: 100}, to: {x: 386, y: 1176}
                },
                "protection_baie_ouverte": {
                    from: {x: 341, y: 1116, radius: 60}, to: {x: 340, y: 1115}
                },
                "barriere_de_protection": {
                    from: {x: 383, y: 1176, radius: 100}, to: {x: 383, y: 1176}
                },
                "panneau_danger": {
                    from: {x: 359, y: 1199, radius: 100}, to: {x: 359, y: 1199}
                },
                "panneau_peinture_fraiche": {
                    from: {x: 359, y: 1199, radius: 100}, to: {x: 359, y: 1199}
                }
            }
        },
        {
            name: "tremie", floor: "1st", x: 600, y: 1025, isProtected: false, current: null, tested: false,
            protects: ["garde_corps_tremie", "panneau_danger"],
            protectsSwitchable: ["panneau_danger"],
            area: {
                "passerelle_garde_corps": {
                    from: {x: 598, y: 1059, radius: 80}, to: {x: 598, y: 1059}
                },
                "garde_corps_tremie": {
                    from: {x: 603, y: 1020, radius: 60}, to: {x: 603, y: 1020}
                },
                "protection_baie_ouverte": {
                    from: {x: 549, y: 966, radius: 80}, to: {x: 549, y: 966}
                },
                "barriere_de_protection": {
                    from: {x: 629, y: 978, radius: 80}, to: {x: 629, y: 978}
                },
                "panneau_danger": {
                    from: {x: 595, y: 1034, radius: 125}, to: {x: 542, y: 1010}
                },
                "panneau_peinture_fraiche": {
                    from: {x: 595, y: 1034, radius: 125}, to: {x: 542, y: 1010}
                }
            }
        },
        {
            name: "peinture", floor: "2nd", x: 593, y: 650, isProtected: false, current: null, tested: false,
            protects: ["panneau_peinture_fraiche", "panneau_danger"],
            protectsSwitchable: ["panneau_danger"],
            area: {
                "passerelle_garde_corps": {
                    from: {x: 606, y: 611, radius: 300}, to: {x: 508, y: 523}
                },
                "garde_corps_tremie": {
                    from: {x: 606, y: 611, radius: 300}, to: {x: 877, y: 529}
                },
                "protection_baie_ouverte": {
                    from: {x: 606, y: 611, radius: 300}, to: {x: 338, y: 588}
                },
                "barriere_de_protection": {
                    from: {x: 606, y: 611, radius: 300}, to: {x: 511, y: 511}
                },
                "panneau_danger": {
                    from: {x: 606, y: 611, radius: 300}, to: {x: 462, y: 591}
                },
                "panneau_peinture_fraiche": {
                    from: {x: 606, y: 611, radius: 300}, to: {x: 462, y: 591}
                }
            }
        },
    ]
}