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
            x: -190,
            y: 267,
            answers: ["analyse1"] // dangerous event
        },
        {
            key:"shape1",
            x: 190,
            y: 80,
            answers: ["analyse2"] // danger
        },
        {
            key:"shape1",
            x: 10,
            y: -173,
            answers: ["analyse3"] // damage
        },
        {
            key:"shape1",
            x: 196,
            y: 255,
            answers: ["analyse4"] // dangerous situation
        },
        {
            key:"shape1",
            x: -165,
            y: 80,
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
            x: 207,
            y: 172,
            answers: ["mesures3"] // Orange ones
        },
        {
            x: 207,
            y: 60,
            answers: ["mesures1"]
        },
        {
            x: 207,
            y: -49,
            answers: ["mesures4"]
        },
        {
            x: 207,
            y: -161,
            answers: ["mesures2"]
        },
        {
            x: -319,
            y: 171,
            answers: ["mesures5"] // Blue ones
        },
        {
            x: -319,
            y: 62,
            answers: ["mesures8"]
        },
        {
            x: -319,
            y: -49,
            answers: ["mesures7"]
        },
        {
            x: -319,
            y: -162,
            answers: ["mesures6"]
        },
        ] // end shapes
    }, // end step
    {
        title: "Choisir la meilleure mesure de prévention parmi les 4 proposées et indiquer son niveau d'importance",
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
            x: 124,
            y: 256,
            answers: [""]
        },
        {
            x: 124,
            y: 92,
            answers: [""]
        },
        {
            x: 124,
            y: -80,
            answers: ["situation2"]
        },
        {
            x: 124,
            y: -256,
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
        // {
        //     key:"preventions4",
        //     isUsed: true
        // },
        // {
        //     key:"preventions5",
        //     isUsed: false
        // },
        {
            key:"preventions6",
            isUsed: true
        },
        {
            key:"preventions7",
            isUsed: true
        },
        // {
        //     key:"preventions8",
        //     isUsed: false
        // },
        // {
        //     key:"preventions9",
        //     isUsed: false
        // },
        {
            key:"preventions10",
            isUsed: true
        }
        ], // end responses
        shapes: [
        { // top left
            x: 305,
            y: 72,
            answers: ["preventions6"]
        },
        {
            x: 305,
            y: -25,
            answers: [""]
        },
        {
            x: 305,
            y: -137,
            answers: [""]
        },
        { // top right
            x: 0,
            y: 72,
            answers: ["preventions"]
        },
        {
            x: 0,
            y: -25,
            answers: ["preventions7"]
        },
        {
            x: 0,
            y: -137,
            answers: ["preventions2"]
        },
        { // bottom left
            x: -305,
            y: 72,
            answers: ["preventions10"]
        },
        {
            x: -305,
            y: -25,
            answers: [""]
        },
        {
            x: -305,
            y: -137,
            answers: [""]
        },
        // { // bottom right
        //     x: -120,
        //     y: -102,
        //     answers: ["preventions4"]
        // },
        // {
        //     x: -120,
        //     y: -194,
        //     answers: ["preventions4"]
        // },
        // {
        //     x: -120,
        //     y: -286,
        //     answers: ["preventions4"]
        // }
        ]
    }, // end step
    {
        title: "Suite à votre examen, la victime est au sol, inconsciente et respire. Parmi les gestes de secours proposés, cocher celui qui correspond à la situation",
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