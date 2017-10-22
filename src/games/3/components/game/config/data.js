/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "jeu3",
    entities: {
        wastes: [
            {name: "huile", x: 30, y: 130, prop: {}},
            {name: "palettes", x: 100, y: 170, prop: {}},
            {name: "bois", x: 250, y: 160, prop: {}},
            {name: "bois_traite", x: 440, y: 170, prop: {}},
            {name: "brosses_et_chiffons_souilles", x: 190, y: 90, prop: {}},
            {name: "cartouches_dangereuses", x: 160, y: 210, prop: {}},
            {name: "cartouches_non_dangereuses", x: 310, y: 70, prop: {}},
            {name: "dechets_dangereux", x: 0, y: 230, prop: {}},
            {name: "emballages_souilles", x: 230, y: 30, prop: {}},
            {name: "inertes", x: 420, y: 20, prop: {}},
            {name: "inertes_platre", x: 460, y: 260, prop: {}},
            {name: "isolants", x: 230, y: 240, prop: {}},
            {name: "peinture_dangereuse", x: 340, y: 220, prop: {}},
            {name: "peinture_non_dangereuse", x: 360, y: 130, prop: {}},
            {name: "polystyrene", x: 440, y: 80, prop: {}},
            {name: "verre", x: 110, y: 100, prop: {}},
            {name: "terre_non_polluee", x: 280, y: 280, prop: {}},
        ],
        actions: [
            {name: "remettre_camion", info: "Remettre dans le camion"},
            {name: "bruler", info: "Bruler"},
            {name: "enfouir", info: "Enfouir"},
            {name: "dechets_inertes", info: "Déchets inertes"},
            {name: "dechets_industriels_banals", info: "Déchets industriels banals"},
            {name: "dechets_industriels_speciaux", info: "Déchets industriels spéciaux"}
        ],
        epi: [
            {name: "anti_chute", info: "Harnais antichute"},
            {name: "protection_auditive", info: "Casque antibruit"},
            {name: "protection_des_mains", info: "Gants de protection"},
            {name: "protection_des_pieds", info: "Chaussures de sécurité"},
            {name: "protection_des_voies", info: "Masque anti poussière"},
            {name: "protection_des_yeux", info: "Lunettes de protection"},
            {name: "protection_du_casque", info: "Casque de sécurité"},
            {name: "protection_du_corps", info: "Combinaison de protection"},
            {name: "protection_du_visage", info: "Visière de protection"},
            {name: "protection_pour_pieton", info: "Protection pour pieton"},
        ]
    },
    infos: {
        wastes: {
            huile: {
                title: "Huile",
                epi: ["protection_des_mains", "protection_des_yeux", "protection_du_corps"],
                action: ["dechets_industriels_speciaux"],
                description: "Une huile est un corps gras qui est à l'état liquide à température ambiante et qui ne se " +
                "mélange pas à l'eau. Les huiles sont des liquides gras, visqueux, d'origine animale, végétale, minérale ou synthétique."
            },
            terre_non_polluee: {
                title: "Terre non polluée",
                epi: ["protection_des_mains", "protection_des_yeux", "protection_du_corps"],
                action: ["dechets_industriels_speciaux"],
                description: "Description manquante"
            },
            palettes: {
                title: "Palettes",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "La palette est un plateau de chargement qui permet de rassembler des emballages et de " +
                "constituer une unité de chargement. C'est une plateforme de stockage, de manutention et de transport."
            },
            bois: {
                title: "Bois",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            bois_traite: {
                title: "Bois traité",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            brosses_et_chiffons_souilles: {
                title: "Brosses et chiffons souillés",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            cartouches_dangereuses: {
                title: "Cartouches dangereuses",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            cartouches_non_dangereuses: {
                title: "Cartouches non dangereuses",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            dechets_dangereux: {
                title: "Déchets dangereux",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            emballages_souilles: {
                title: "Emballages souillés",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            inertes: {
                title: "Inertes",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            inertes_platre: {
                title: "Inertes platre",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            isolants: {
                title: "Isolants",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            peinture_dangereuse: {
                title: "Peinture dangereuse",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            peinture_non_dangereuse: {
                title: "Peinture non dangereuse",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            polystyrene: {
                title: "Polystyrene",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
            verre: {
                title: "Verre",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "description manquante"
            },
        },
        actions: {
            remettre_camion: {
                fail: "Ce déchet ne doit pas être remis dans le camion !",
                success: "Vous avez mis le déchet dans le camion."
            },
            bruler: {
                fail: "Ce déchet ne doit pas être brulé !",
                success: "Vous avez brulé le déchet."
            },
            enfouir: {
                fail: "Ce déchet ne doit pas être enfoui !",
                success: "Vous avez enfoui le déchet."
            },
            dechets_inertes: {
                fail: "Ce déchet n'est pas inerte !",
                success: "Vous avez jeté le déchet."
            },
            dechets_industriels_banals: {
                fail: "Ce déchet n'est pas industriel.",
                success: "Vous avez jeté le déchet."
            },
            dechets_industriels_speciaux: {
                fail: "Ce déchet n'est pas spécial ou dangereux.",
                success: "Vous avez jeté le déchet."
            }
        }
    }
}