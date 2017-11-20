/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu8",
    screenOne: {
        response1 : {key: "pratiquer", file: "responses", position: null},
        response2 : {key: "appeller", file: "responses", position: null},
        response3 : {key: "transporter", file: "responses", position: null}
    },
    screenTwo: {
        response1 : {key: "oui", file: "responses", position: null},
        response2 : {key: "non", file: "responses", position: null}
    },
    screenThree: {
        response1 : {key: "secourir", file: "steps", position: 4},
        response2 : {key: "alerter", file: "steps", position: 3},
        response3 : {key: "examiner", file: "steps", position: 2},
        response4 : {key: "proteger", file: "steps", position: 1}
    },
    screenFour: {
        response1 : {key: "cpam", file: "people", position: 4},
        response2 : {key: "employeur", file: "people", position: 3},
        response3 : {key: "medecin", file: "people", position: 2},
        response4 : {key: "salarie", file: "people", position: 1}
    },
    screenFive: {
        response1 : {key: "police", file: "numbers", position: 3},
        response2 : {key: "pompiers", file: "numbers", position: 2},
        response3 : {key: "samu", file: "numbers", position: 1},
        response4 : {key: "unique", file: "numbers", position: 4}
    }
}