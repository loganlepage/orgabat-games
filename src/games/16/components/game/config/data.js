/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu16",
    steps:[
    {
        title: "L'intervention se déroule chez un particulier. Cliquer sur le personnage qui permet de rentrer chez le client",
        quest: "player_quest",
        repo: "A/",
        // blockStep: false,
        // point: "enterprise",
        images:[
        {
            key:"1",
            correct: false
        },
        {
            key:"2",
            correct: false
        },
        {
            key:"3",
            correct: false
        },
        {
            key:"4",
            correct: true
        }
        ]
    },
    {
        title: "L'intervention se déroule à l'étage et le propriétaire vous demande de retirer vos chaussures. Cliquer sur la bonne conduite à prendre",
        quest: "enter_quest",
        repo: "B/",
        // blockStep: false,
        // point: "enterprise",
        background: "escaliers",
        qcm:[
        {
            title:"Non, Monsieur",
            correct: false
        },
        {
            title:"Oui, bien sûr",
            correct: false
        },
        {
            title:"Non Monsieur, mais ne vous inquiétez pas, je protège l’accès",
            correct: true
        }
        ]
    },
    {
        title: "Remettre dans l’ordre les quatre étapes principales à effectuer avant de commencer le chantier",
        quest: "start_step_quest",
        repo: "C/",
        // blockStep: true,
        // point: "enterprise",
        background: "etapes",
        responses:[
        {
            key:"mettre_protection",
            isUsed: true
        },
        {
            key:"decharger",
            isUsed: true
        },
        {
            key:"bruler",
            isUsed: false
        },
        {
            key:"vider",
            isUsed: true
        },
        {
            key:"evaluer",
            isUsed: false
        },
        {
            key:"mettre_epi",
            isUsed: true
        },
        {
            key:"mettre_ambiance",
            isUsed: false
        },
        ],
        shapes: [
        {
            x: -599,
            y: 259,
            answers: ["mettre_epi"]
        },
        {
            x: -599,
            y: 130,
            answers: ["vider"]
        },
        {
            x: -599,
            y: 0,
            answers: ["mettre_protection"]
        },
        {
            x: -599,
            y: -129,
            answers: ["decharger"]
        }
        ]
    },
    {
        title: "Vous avez besoin de vous laver les mains, que faites-vous ?",
        quest: "",
        repo: "D/",
        // blockStep: false,
        background: "mains",
        // point: "enterprise",
        qcm:[
        {
            title:"Je ne demande jamais, je fais.",
            correct: false
        },
        {
            title:"Je demande la permission au client",
            correct: false
        },
        {
            title:"Je demande la permission au client et je fais attention de laisser propre le lavabo",
            correct: true
        }
        ]
    },
    {
        title: "La bonne attitude avec le tabac/le vapotage",
        quest: "",
        repo: "D/",
        // blockStep: false,
        // point: "health",
        background: "fumeur",
        qcm:[
        {
            title:"Je fume avec le client",
            correct: false
        },
        {
            title:"Je fume sur le chantier",
            correct: false
        },
        {
            title:"Je fume à l’extérieur du chantier",
            correct: false
        },
        {
            title:"Je fume dans le camion",
            correct: false
        },
        {
            title:"Je suis non-fumeur",
            correct: true
        }
        ]
    },
    {
        title: "Pour éviter les odeurs de solvants et autres produits, vous ouvrez les fenêtres. A quoi devez-vous penser ?",
        quest: "",
        repo: "D/",
        // blockStep: false,
        // point: "enterprise",
        background: "danger",
        qcm:[
        {
            title:"É́teindre la lumière",
            correct: false
        },
        {
            title:"Fermer la porte",
            correct: true
        },
        {
            title:"Éteindre les radiateurs",
            correct: true
        },
        {
            title:"Fermer la fenêtre avant de quitter le chantier",
            correct: true
        }
        ]
    },
    {
        title: "Un peu de musique pour travailler",
        quest: "qcm_quest",
        repo: "D/",
        // blockStep: false,
        // point: "enterprise",
        background: "musique",
        qcm:[
        {
            title:"Jamais ce n’est pas professionnel devant le client",
            correct: false
        },
        {
            title:"J’allume à faible volume",
            correct: false
        },
        {
            title:"Fermer la porte",
            correct: false
        },
        {
            title:"Je demande la permission au client, qui se trouve deux étages plus bas",
            correct: true
        }
        ]
    },
    {
        title: "L’intervention chez le client est terminée. Remettre dans l’ordre les étapes à effectuer",
        quest: "end_step_quest",
        repo: "E/",
        // blockStep: true,
        // point: "organization",
        background: "etapes",
        responses:[
        {
            key:"dire",
            isUsed: true
        },
        {
            key:"laver",
            isUsed: true
        },
        {
            key:"retirer",
            isUsed: true
        },
        {
            key:"enlever",
            isUsed: true
        },
        {
            key:"charger",
            isUsed: true
        },
        {
            key:"nettoyer",
            isUsed: true
        },
        ],
        shapes: [
        {
            x: -599,
            y: 321,
            answers: ["charger"]
        },
        {
            x: -599,
            y: 211,
            answers: ["retirer"]
        },
        {
            x: -599,
            y: 95,
            answers: ["nettoyer"]
        },
        {
            x: -599,
            y: -17,
            answers: ["enlever"]
        },
        {
            x: -599,
            y: -128,
            answers: ["laver"]
        },
        {
            x: -599,
            y: -243,
            answers: ["dire"]
        }
        ]
    },
    ]
}