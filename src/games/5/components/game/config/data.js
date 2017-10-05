/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: "jeu5",
    questions_part_1: [
        {key: 1, prop: {id: 0, "user-answer": null, "good-answer": true}},
        {key: 2, prop: {id: 1, "user-answer": null, "good-answer": false}},
        {key: 3, prop: {id: 2, "user-answer": null, "good-answer": false}},
        {key: 4, prop: {id: 3, "user-answer": null, "good-answer": true}},
        {key: 5, prop: {id: 4, "user-answer": null, "good-answer": true}},
        {key: 6, prop: {id: 5, "user-answer": null, "good-answer": false}}
    ],
    questions_part_2: [
        {keys: [1, 2, 3], prop: {id: 0, "user-answer": null, "good-answer": 1}},
        {keys: [4, 5, 6], prop: {id: 1, "user-answer": null, "good-answer": 6}},
        {keys: [1, 3, 5], prop: {id: 2, "user-answer": null, "good-answer": 3}},
        {keys: [2, 4, 6], prop: {id: 3, "user-answer": null, "good-answer": 2}},
    ]
}