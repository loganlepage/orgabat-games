/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu15",
    actions: [
        {
            title: "Vous devez poser un revêtement de sol",
            key: "revetement-sol",
            correctAnswer: [
            "genouilleres",
            "chaussures_de_securite",
            "pantalon"
            ]
        },
        {
            title: "Vous devez réaliser la mise en peinture\ndes murs d’une pièce",
            key: "peinture",
            correctAnswer: [
            "masque_anti_poussieres",
            "chaussures_de_securite",
            "pantalon"
            ]
        },
        {
            title: "Vous devez monter un échafaudage afin de\nréaliser un ravalement de façade",
            key: "echaffaudage",
            correctAnswer: [
            "harnais",
            "chaussures_de_securite",
            "pantalon",
            "gants"
            ]
        },
        {
            title: "Vous devez casser une dalle de béton avec\nun marteau piqueur",
            key: "marteau-piqueur",
            correctAnswer: [
            "gants",
            "chaussures_de_securite",
            "pantalon",
            "lunettes_de_protection",
            "masque_anti_poussieres"
            ]
        },
    ],
    responses: [
        {
            title: "Bottes de sécurité",
            key: "bottes_de_securite"
        },
        {
            title: "Casque anti-bruit",
            key: "casque_anti_bruit"
        },
        {
            title: "Casque de chantier",
            key: "casque_de_chantier"
        },
        {
            title: "Chaussures de sécurité",
            key: "chaussures_de_securite"
        },
        {
            title: "Gants",
            key: "gants"
        },
        {
            title: "Genouillères",
            key: "genouilleres"
        },
        {
            title: "Harnais",
            key: "harnais"
        },
        {
            title: "Lunettes de protection",
            key: "lunettes_de_protection"
        },
        {
            title: "Masque anti-poussieres",
            key: "masque_anti_poussieres"
        },
        {
            title: "Pantalon de travail",
            key: "pantalon"
        }
    ]
}