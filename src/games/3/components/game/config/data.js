/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "jeu3",
    entities: {
        wastes: [
            {name: "huile", x: 40, y: 120, prop: {}},
            {name: "palettes", x: 100, y: 170, prop: {}},
            {name: "bois", x: 270, y: 170, prop: {}},
            {name: "bois_traite", x: 450, y: 180, prop: {}},
            {name: "brosses_et_chiffons_souilles", x: 230, y: 100, prop: {}},
            {name: "cartouches_dangereuses", x: 160, y: 210, prop: {}},
            {name: "cartouches_non_dangereuses", x: 320, y: 80, prop: {}},
            {name: "dechets_dangereux", x: 0, y: 230, prop: {}},
            {name: "emballages_souilles", x: 240, y: 40, prop: {}},
            {name: "inertes", x: 420, y: 20, prop: {}},
            {name: "inertes_platre", x: 470, y: 260, prop: {}},
            {name: "isolants", x: 230, y: 240, prop: {}},
            {name: "peinture_dangereuse", x: 340, y: 220, prop: {}},
            {name: "peinture_non_dangereuse", x: 360, y: 130, prop: {}},
            {name: "polystyrene", x: 450, y: 100, prop: {}},
            {name: "verre", x: 130, y: 100, prop: {}},
            {name: "terre_non_polluee", x: 280, y: 280, prop: {}},
            {name: "amiante", x: 80, y: 280, prop: {}},
            {name: "amiante_ciment", x: 140, y: 280, prop: {}}
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
                epi: [],
                action: ["dechets_inertes"],
                description: "Terres de déblais ne contenant pas de substances dangereuses."
            },
            palettes: {
                title: "Palettes",
                epi: ["protection_des_mains"],
                action: ["dechets_industriels_banals"],
                description: "La palette est un plateau de chargement qui permet de rassembler des emballages et de " +
                "constituer une unité de chargement. C'est une plateforme de stockage, de manutention et de transport."
            },
            bois: {
                title: "Bois",
                epi: ["protection_des_mains"],
                action: ["dechets_industriels_banals"],
                description: "Ils concernent également les produits usagés et les emballages en bois (palettes, bois d'emballages, caisses, bois de démolition ou d'ameublement, …)."
            },
            bois_traite: {
                title: "Bois traité",
                epi: ["protection_des_mains"],
                action: ["dechets_industriels_speciaux"],
                description: "Bois ayant subi différents traitements chimiques."
            },
            brosses_et_chiffons_souilles: {
                title: "Brosses et chiffons souillés",
                epi: ["protection_des_mains"],
                action: ["dechets_industriels_speciaux"],
                description: "Ce sont des objets ayant contenus des matières ou déchets dangereux (absorbants, chiffons, EPI...)"
            },
            cartouches_dangereuses: {
                title: "Cartouches dangereuses",
                epi: ["protection_des_mains"],
                action: ["dechets_industriels_speciaux"],
                description: "Cartouche contenant des substances pouvant être néfastes pour l’homme et l’environnement. Exemples : Silicone sanitaire, cartouches de SIKA …)"
            },
            cartouches_non_dangereuses: {
                title: "Cartouches non dangereuses",
                epi: [],
                action: ["dechets_industriels_banals"],
                description: "Cartouche contenant des substances ne pouvant pas être néfastes pour l’homme et l’environnement."
            },
            dechets_dangereux: {
                title: "Déchets dangereux",
                epi: ["protection_des_mains"],
                action: ["dechets_industriels_speciaux"],
                description: "Un déchet est classé dangereux s'il présente une ou plusieurs propriétés de danger (explosif, comburant, nocif, cancérigène, etc.) qui peuvent générer des nuisances pour l'homme ou pour l'environnement."
            },
            emballages_souilles: {
                title: "Emballages souillés",
                epi: ["protection_des_mains"],
                action: ["dechets_industriels_speciaux"],
                description: "Ce sont des emballages ayant contenus des matières ou déchets dangereux"
            },
            inertes: {
                title: "Inertes",
                epi: [],
                action: ["dechets_inertes"],
                description: "Déchets qui ne subit aucune modification physique, chimique ou biologique importante, ne brule pas, ne se décompose pas, ne produit aucune réaction physique ou chimique, n’est pas biodégradable… "
            },
            inertes_platre: {
                title: "Inertes platre",
                epi: [],
                action: ["dechets_inertes"],
                description: "Déchets inertes avec faible quantité de plâtre."
            },
            isolants: {
                title: "Isolants",
                epi: [],
                action: ["dechets_industriels_banals"],
                description: "Un isolant est un matériau qui limite les échanges d'énergie entre deux systèmes. Ex :  les isolants phoniques ;  les isolants mécaniques. Le contraire d'un isolant est un conducteur (électricité et chaleur), ou transmetteur (mécanique et son)."
            },
            peinture_dangereuse: {
                title: "Peinture dangereuse",
                epi: ["protection_des_mains"],
                action: ["dechets_industriels_speciaux"],
                description: "Peinture composée de résines, solvants, pigments, charges et\n" +
                "additifs. Ces composées chimiques sont toxiques pour l’homme et l’environnement\n"
            },
            peinture_non_dangereuse: {
                title: "Peinture non dangereuse",
                epi: [],
                action: ["dechets_industriels_banals"],
                description: "Peinture ne présentant pas de risques pour la sante de l’homme et pour l’environnement."
            },
            polystyrene: {
                title: "Polystyrene",
                epi: [],
                action: ["dechets_industriels_banals"],
                description: "Matière plastique résultant de la polymérisation du styrène."
            },
            verre: {
                title: "Verre",
                epi: ["protection_des_mains"],
                action: ["dechets_inertes"],
                description: "Le verre est un matériau solide transparent, homogène et cassant. Il résiste bien au feu et au contact de pratiquement tous les liquides et solides connus."
            },
            amiante: {
                title: "Amiante",
                epi: ["protection_des_mains", "protection_des_voies"],
                action: ["dechets_industriels_speciaux"],
                description: "L'amiante est un silicate naturel hydraté de calcium et de magnésium à contexture fibreuse (variété de serpentine), résistant à l'action du feu. Il était utilisé pour fabriquer des matériaux, des tissus incombustibles"
            },
            amiante_ciment: {
                title: "Amiante",
                epi: ["protection_des_mains", "protection_des_voies"],
                action: ["dechets_industriels_speciaux"],
                description: "L'Amiante ciment est un matériau formé en présence d'eau, à partir d'un mélange intime d'amiante et de ciment comprimé puis séché après mise en forme. L'amiante ciment était utilisé pour la fabrication de plaques ondulées, ardoises, tuyaux et gaines..."
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