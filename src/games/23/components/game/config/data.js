/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu23",
    tile: "bg",
    steps:[
    {
        title: "Analyser la situation de travail et évaluer le risque d’accident",
        quest: "analyze_quest",
        repo: "analyse/",
        background: "analyse",
        responses:[
        {
            key:"analyse1",
            isUsed: true
        },
        {
            key:"analyse2",
            isUsed: true
        },
        {
            key:"analyse3",
            isUsed: true
        },
        {
            key:"analyse4",
            isUsed: true
        },
        {
            key:"analyse5",
            isUsed: true
        },
        ], // end responses
        shapes: [
        {
            key:"shape1",
            x: 1060,
            y: 166,
            answers: ["analyse1"]
        },
        {
            key:"shape1",
            x: 629,
            y: 369,
            answers: ["analyse2"]
        },
        {
            key:"shape1",
            x: 830,
            y: 651,
            answers: ["analyse3"]
        },
        {
            key:"shape1",
            x: 625,
            y: 180,
            answers: ["analyse4"]
        },
        {
            key:"shape1",
            x: 1015,
            y: 369,
            answers: ["analyse5"]
        },
        ] // end shapes
    }, // end step
    {
        title: "Analyser la situation de travail et évaluer le risque d’accident",
        quest: "measure_quest",
        repo: "mesures/",
        background: "mesures",
        responses:[
        {
            key:"mesures1",
            isUsed: true
        },
        {
            key:"mesures2",
            isUsed: true
        },
        {
            key:"mesures3",
            isUsed: true
        },
        {
            key:"mesures4",
            isUsed: true
        },
        {
            key:"mesures5",
            isUsed: true
        },
        {
            key:"mesures6",
            isUsed: true
        },
        {
            key:"mesures7",
            isUsed: true
        },
        {
            key:"mesures8",
            isUsed: true
        },
        ], // end responses
        shapes: [
        {
            x: 610,
            y: 269,
            answers: ["mesures3"]
        },
        {
            x: 610,
            y: 393,
            answers: ["mesures1"]
        },
        {
            x: 610,
            y: 517,
            answers: ["mesures4"]
        },
        {
            x: 610,
            y: 641,
            answers: ["mesures2"]
        },
        {
            x: 1194,
            y: 270,
            answers: ["mesures5"]
        },
        {
            x: 1194,
            y: 393,
            answers: ["mesures8"]
        },
        {
            x: 1194,
            y: 518,
            answers: ["mesures7"]
        },
        {
            x: 1194,
            y: 642,
            answers: ["mesures6"]
        },
        ] // end shapes
    }, // end step
    {
        title: "Choisir la meilleure mesure de prévention et indiquer son niveau",
        quest: "prevention_quest",
        repo: "situations/",
        background: "situations",
        responses:[
        {
            key:"situation1",
            isUsed: false
        },
        {
            key:"situation2",
            isUsed: false
        },
        {
            key:"situation3",
            isUsed: true
        },
        {
            key:"situation4",
            isUsed: false
        }
        ], // end responses
        shapes: [
        {
            x: 701,
            y: 171,
            answers: [""]
        },
        {
            x: 701,
            y: 359,
            answers: [""]
        },
        {
            x: 701,
            y: 551,
            answers: ["situation2"]
        },
        {
            x: 701,
            y: 741,
            answers: [""]
        },
        ] // end shapes
    }, // end step
    {
        title: "Suite à sa chute, la victime est au sol. Vous êtes formé à la SST, que faîtes vous?",
        quest: "safety_quest",
        repo: "preventions/",
        background: "background",
        responses:[
        {
            key:"preventions",
            isUsed: true
        },
        {
            key:"preventions2",
            isUsed: true
        },
        {
            key:"preventions3",
            isUsed: false
        },
        {
            key:"preventions4",
            isUsed: true
        },
        {
            key:"preventions5",
            isUsed: false
        },
        {
            key:"preventions6",
            isUsed: true
        },
        {
            key:"preventions7",
            isUsed: true
        },
        {
            key:"preventions8",
            isUsed: false
        },
        {
            key:"preventions9",
            isUsed: false
        },
        {
            key:"preventions10",
            isUsed: true
        }
        ], // end responses
        shapes: [
        {
            x: 707,
            y: 205,
            answers: ["preventions6"]
        },
        {
            x: 707,
            y: 308,
            answers: ["preventions6"]
        },
        {
            x: 707,
            y: 409,
            answers: ["preventions6"]
        },
        {
            x: 969,
            y: 205,
            answers: ["preventions", "preventions7", "preventions2"]
        },
        {
            x: 969,
            y: 308,
            answers: ["preventions", "preventions7", "preventions2"]
        },
        {
            x: 969,
            y: 409,
            answers: ["preventions", "preventions7", "preventions2"]
        },
        {
            x: 705,
            y: 576,
            answers: ["preventions10"]
        },
        {
            x: 705,
            y: 679,
            answers: ["preventions10"]
        },
        {
            x: 705,
            y: 779,
            answers: ["preventions10"]
        },
        {
            x: 967,
            y: 576,
            answers: ["preventions4"]
        },
        {
            x: 967,
            y: 679,
            answers: ["preventions4"]
        },
        {
            x: 967,
            y: 779,
            answers: ["preventions4"]
        }
        ] // end shapes
    }, // end step
    {
        title: "Suite à votre examen, la victime est inconsciente et elle respire. Parmi les gestes de secours proposés, cocher celui qui correspond à la situation",
        quest: "",
        repo: "",
        qcm: [
            {
                title: "Je pratique une PLS (position latérale de sécurité)",
                correct: true
            },
            {
                title: "Je pratique une compression manuelle",
                correct: false
            },
            {
                title: "Je pratique la méthode d’Heimlich",
                correct: false
            },
            {
                title: "Je pratique une RCP (réanimation cardio-pulmonaire)",
                correct: false
            },
            {
                title: "Je la place en position demi-assise",
                correct: false
            },
            {
                title: "Je ne touche pas à la victime",
                correct: false
            },
            {
                title: "Je questionne la victime sur ses antécédents médicaux",
                correct: false
            },
        ]
    },
    {
        title: "Après avoir fait les gestes de secours, cocher les actions complémentaires à réaliser en attendant le SAMU",
        quest: "rescue_quest",
        repo: "",
        qcm: [
            {
                title: "Je me remet au travail rapidement car cette intervention m’a fait perdre du temps",
                correct: false
            },
            {
                title: "Je couvre la victime pour ne pas qu'elle se refroidisse",
                correct: true
            },
            {
                title: "Je surveille que la victime continue de respirer",
                correct: true
            },
            {
                title: "Je parle à la victime pour la rassurer",
                correct: true
            },
            {
                title: "Je déplace la victime pour la mettre à l’abri du froid",
                correct: false
            },
        ]
    }
    ]
}