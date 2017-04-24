/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "jeu3",
    entities: {
        wastes: [
            {name: "huile", x: 200, y: 200, prop: {}},
            {name: "palettes", x: 100, y: 100, prop: {}}
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
            palettes: {
                title: "Palettes",
                epi: ["protection_des_mains"],
                action: ["remettre_camion", "dechets_inertes", "enfouir"],
                description: "La palette est un plateau de chargement qui permet de rassembler des emballages et de " +
                "constituer une unité de chargement. C'est une plateforme de stockage, de manutention et de transport."
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