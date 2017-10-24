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
            x: -215,
            y: 295,
            answers: ["analyse1"] // dangerous event
        },
        {
            key:"shape1",
            x: 205,
            y: 90,
            answers: ["analyse2"] // danger
        },
        {
            key:"shape1",
            x: 9,
            y: -196,
            answers: ["analyse3"] // damage
        },
        {
            key:"shape1",
            x: 223,
            y: 280,
            answers: ["analyse4"] // dangerous situation
        },
        {
            key:"shape1",
            x: -170,
            y: 90,
            answers: ["analyse5"] // operator
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
            x: 230,
            y: 192,
            answers: ["mesures3"] // Orange ones
        },
        {
            x: 230,
            y: 67,
            answers: ["mesures1"]
        },
        {
            x: 230,
            y: -55,
            answers: ["mesures4"]
        },
        {
            x: 230,
            y: -179,
            answers: ["mesures2"]
        },
        {
            x: -355,
            y: 191,
            answers: ["mesures5"] // Blue ones
        },
        {
            x: -355,
            y: 69,
            answers: ["mesures8"]
        },
        {
            x: -355,
            y: -55,
            answers: ["mesures7"]
        },
        {
            x: -355,
            y: -180,
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
            x: 138,
            y: 285,
            answers: [""]
        },
        {
            x: 138,
            y: 103,
            answers: [""]
        },
        {
            x: 138,
            y: -89,
            answers: ["situation2"]
        },
        {
            x: 138,
            y: -285,
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
        { // top left
            x: 135,
            y: 255,
            answers: ["preventions6"]
        },
        {
            x: 135,
            y: 151,
            answers: ["preventions6"]
        },
        {
            x: 135,
            y: 49,
            answers: ["preventions6"]
        },
        { // top right
            x: -137,
            y: 255,
            answers: ["preventions", "preventions7", "preventions2"]
        },
        {
            x: -137,
            y: 151,
            answers: ["preventions", "preventions7", "preventions2"]
        },
        {
            x: -137,
            y: 49,
            answers: ["preventions", "preventions7", "preventions2"]
        },
        { // bottom left
            x: 137,
            y: -114,
            answers: ["preventions10"]
        },
        {
            x: 137,
            y: -216,
            answers: ["preventions10"]
        },
        {
            x: 137,
            y: -318,
            answers: ["preventions10"]
        },
        { // bottom right
            x: -133,
            y: -114,
            answers: ["preventions4"]
        },
        {
            x: -133,
            y: -216,
            answers: ["preventions4"]
        },
        {
            x: -133,
            y: -318,
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