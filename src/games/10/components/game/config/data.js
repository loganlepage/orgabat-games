/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu10",
    qcm: [ // All exercises
        { // First exercise
            // title: "Après avoir vu l'extrait vidéo, répond aux différentes questions:",
            title: "Premier QCM",
            questions: [ // All questions
                { // First question
                    questionTitle: "Comment se nomme l’apprenti ?",
                    questionAnswers: [
                        "Dimitri",
                        "Victor",
                        "Luigi"
                    ],
                    questionSolutions: ["Dimitri", "Victor"],
                },
                { // Second question
                    questionTitle: "L’apprenti porte ses chaussures de sécurité ?",
                    questionAnswers: [
                        "Vrai",
                        "Faux"
                    ],
                    questionSolutions: ["Vrai"],
                },
                { // Third question
                    questionTitle: "Quel temps fait-il ?",
                    questionAnswers: [
                        "Il pleut",
                        "Il fait beau",
                        "Il y a du vent"
                    ],
                    questionSolutions: ["Il pleut"],
                },
                { // Fourth question
                    questionTitle: "L’apprenti a-t-il déjà monté une panne fuitrére sur un toit ?",
                    questionAnswers: [
                        "Oui",
                        "Non, c'est la première fois"
                    ],
                    questionSolutions: ["Oui"],
                },
                { // Fifth question
                    questionTitle: "Par quoi, l’apprenti est-il déséquilibré ?",
                    questionAnswers: [
                        "À cause du vent",
                        "À cause d'une glissade",
                        "À cause d'un collègue"
                    ],
                    questionSolutions: ["À cause du vent"],
                },
                { // Sixth question
                    questionTitle: "Pourquoi l’employeur décide-t-il de faire monter l’apprenti en hauteur ?",
                    questionAnswers: [
                        "Pour tester l’apprenti",
                        "Car il risque de pleuvoir",
                        "Car l’ouvrier est en retard"
                    ],
                    questionSolutions: ["Pour tester l’apprenti"],
                },
            ] // End questions
        } // End first exercise
    ]
}