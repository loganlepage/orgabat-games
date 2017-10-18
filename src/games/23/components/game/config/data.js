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
            // x: 200,
            // y: 200
        },
        {
            key:"analyse2",
            // x: 200,
            // y: 300
        },
        {
            key:"analyse3",
            // x: 200,
            // y: 400
        },
        {
            key:"analyse4",
            // x: 200,
            // y: 500
        },
        {
            key:"analyse5",
            // x: 200,
            // y: 600
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
    ]
}