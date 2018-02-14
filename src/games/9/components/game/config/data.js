/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu9",
    steps: [
        {
            correctAnswer: "medecin",
            titleText: "Suite à un arrêt de travail de longue duréé (supérieur à 30 jours), vous allez reprendre votre activité professionnelle. Qui jugera de votre aptitude à reprendre votre activité?",
            infoText: "Le médecin de santé au travail a un rôle exclusivement préventif. Il permet d’éviter toute dégradation de la santé des salariés, du fait de leur travail."
        },
        {
            correctAnswer: "chsct",
            titleText: "Votre poste de travail ne vous semble pas adapté. Vous souhaitez le faire analysé par un représentant du personnel formé en matière de prévention afin que vos conditions de travail s’améliorent. Qui peut faire cette analyse de poste ?",
            infoText: "Le comité d’hygiène, de sécurité et des conditions de travail est l’instance représentative spécialisée en matière de prévention des risques professionnels. Un CHSCT est présent dans les entreprises de plus de 50 salariés."
        },
        {
            correctAnswer: "oppbtp",
            titleText: "Votre patron souhaite apporter des améliorations techniques au sein de son entreprise afin de faciliter le travail de ses salariés. Il souhaite notamment investir dans du nouveau matériel (ex : matériel anti vibratile) Qui peut le conseiller ?",
            infoText: "L’OPPBTP accompagne les professionnels du bâtiment et des travaux publics pour améliorer leur conditions de travail pour prévenir des accidents du travail et des maladies à caractère professionnel."
        },
        {
            correctAnswer: "inspection",
            titleText: "Vous et votre employeur avez des interrogations concernant vos droits et vos obligations. Qui peut vous répondre ?",
            infoText: "L’inspection du travail contrôle le respect de la règlementation du travail. Elle réalise des missions de conseil et assure des enquêtes sur les conditions de travail."
        },
        {
            correctAnswer: "employeur",
            titleText: "Vous remarquez un dysfonctionnement au sein de votre entreprise: matériel défectueux, manque d’EPI... A qui remontez-vous l’information en priorité ?",
            infoText: "L’employeur est celui qui met en œuvre la démarche de prévention . Il est en effet responsable de la santé et de la sécurité de ses salariés. Il coordonne ses différentes équipes et attribue les moyens nécessaires à la préservation de la santé physique et mentale de tous ses salariés."
        },
        {
            correctAnswer: "carsat",
            titleText: "Votre employeur a vu ses cotisations accident du travail et maladie professionnelle augmentées. Il souhaite se renseigner... Qui peut le renseigner ?",
            infoText: "La CARSAT détermine chaque année la cotisation accident du travail et maladie professionnelle. Elle est versée par l’entreprise pour assurer ses salariés contre les risques professionnelles. Elle a également de nombreuses autres missions."
        }
    ],
    responses: {
        medecin: {key: "medecin", file: "people"},
        carsat: {key: "carsat", file: "people"},
        employeur: {key: "employeur", file: "people"},
        oppbtp: {key: "oppbtp", file: "people"},
        chsct: {key: "chsct", file: "people"},
        inspection: {key: "inspection", file: "people"}
    },
    player: {
        key: "player",
        file: "player"
    }
}