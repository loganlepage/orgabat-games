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
                {
                    questionTitle: "Comment se nomme l’apprenti ?",
                    questionAnswers: [
                        "Dimitri",
                        "Victor",
                        "Luigi"
                    ],
                    questionSolutions: ["Dimitri"],
                },
                {
                    questionTitle: "L’apprenti porte ses chaussures de sécurité ?",
                    questionAnswers: [
                        "Vrai",
                        "Faux"
                    ],
                    questionSolutions: ["Faux"],
                },
                {
                    questionTitle: "Quel temps fait-il ?",
                    questionAnswers: [
                        "Il pleut",
                        "Il fait beau",
                        "Il y a du vent"
                    ],
                    questionSolutions: ["Il y a du vent"],
                },
                { 
                    questionTitle: "L’apprenti a-t-il déjà monté une panne fuitrére sur un toit ?",
                    questionAnswers: [
                        "Oui",
                        "Non, c'est la première fois"
                    ],
                    questionSolutions: ["Non, c'est la première fois"],
                },
                {
                    questionTitle: "Par quoi, l’apprenti est-il déséquilibré ?",
                    questionAnswers: [
                        "À cause du vent",
                        "À cause d'une glissade",
                        "À cause d'un collègue"
                    ],
                    questionSolutions: ["À cause d'un collègue"],
                },
                {
                    questionTitle: "Pourquoi l’employeur décide-t-il de faire monter l’apprenti en hauteur ?",
                    questionAnswers: [
                        "Pour tester l’apprenti",
                        "Car il risque de pleuvoir",
                        "Car l’ouvrier est en retard"
                    ],
                    questionSolutions: ["Car l’ouvrier est en retard"],
                },
            ] // End questions
        }, // End first exercise
        {
            // title: "Après avoir vu l'extrait vidéo, répond aux différentes questions:",
            title: "Deuxième QCM",
            questions: [
                {
                    questionTitle: "Si tu veux prendre rendez-vous avec le patron:",
                    questionAnswers: [
                        "Tu vas voir la secrétaire Sylvianne",
                        "Tu vas voir la Sylvie",
                        "Tu demandes à ton collègue"
                    ],
                    questionSolutions: ["Tu vas voir la Sylvie"],
                },
                {
                    questionTitle: "Le patron de l'entreprise s'appelle:",
                    questionAnswers: [
                        "Mr Dupont",
                        "Mr Durand",
                        "Mr Marie"
                    ],
                    questionSolutions: ["Mr Dupont"],
                },
                {
                    questionTitle: "Mr Pierre Jacquin est:",
                    questionAnswers: [
                        "Membre du CHSCT",
                        "Délégué du personnel",
                        "Conducteur de travaux"
                    ],
                    questionSolutions: ["Délégué du personnel"],
                },
                {
                    questionTitle: "CHSCT signifie:",
                    questionAnswers: [
                        "Comité d'Harmonisation de la Santé, des Chanters et Travaux",
                        "Comité d'Hygiène de Sécurité et des Conditions de Travail",
                        "Comité d'Hygiène, de Santé et des Conditions de Travail"
                    ],
                    questionSolutions: ["Comité d'Hygiène de Sécurité et des Conditions de Travail"],
                },
                {
                    questionTitle: "Le conducteur de travaux sera remplacé par:",
                    questionAnswers: [
                        "Hervé Bigort",
                        "Francis Weber",
                        "Antoine Passa"
                    ],
                    questionSolutions: ["Francis Weber"],
                }
            ]
        },
        {
            // title: "Après avoir vu l'extrait vidéo, répond aux différentes questions:",
            title: "Troisième QCM",
            questions: [
                {
                    questionTitle: "Il faut fournir le plan en détail de la salle à manger:",
                    questionAnswers: [
                        "Vrai",
                        "Faux"
                    ],
                    questionSolutions: ["Faux"],
                },
                {
                    questionTitle: "L’électricien doit valider les appareils de chau age proposés sur la documentation:",
                    questionAnswers: [
                        "Vrai",
                        "Faux"
                    ],
                    questionSolutions: ["Vrai"],
                },
                {
                    questionTitle: "Prévoir une applique murale:",
                    questionAnswers: [
                        "Côté cuisine",
                        "Côté congélateur",
                    ],
                    questionSolutions: ["Côté congélateur"],
                },
                {
                    questionTitle: "Ne pas exécuter la première marche en 1⁄2 rond, mais en marche classique:",
                    questionAnswers: [
                        "Vrai",
                        "Faux"
                    ],
                    questionSolutions: ["Vrai"],
                },
                {
                    questionTitle: "Fournir les revêtements de sol:",
                    questionAnswers: [
                        "Vrai",
                        "Faux"
                    ],
                    questionSolutions: ["Faux"],
                }
            ]
        }
    ]
}