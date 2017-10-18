/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu23",
    steps:[
    {
        title: "Analyser la situation de travail et évaluer le risque d’accident",
        quest: "analyze_quest",
        repo: "analyse/",
        background: "analyse",
        responses:[
        {
            key:"analyse1",
        },
        {
            key:"analyse2",
        },
        {
            key:"analyse3",
        },
        {
            key:"analyse4",
        },
        {
            key:"analyse5",
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
        },
        {
            key:"mesures2",
        },
        {
            key:"mesures3",
        },
        {
            key:"mesures4",
        },
        {
            key:"mesures5",
        },
        {
            key:"mesures6",
        },
        {
            key:"mesures7",
        },
        {
            key:"mesures8",
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
    ]
}