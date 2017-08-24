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
            titleText: "Suite à un arrêt de travail de longue durée. Vous allez reprendre votre activité professionnelle. \nQui vous en donnera l’autorisation ?",
            infoText: "Le médecin de santé au travail a un rôle exclusivement préventif, dont le rôle est d’éviter toute dégradation \nde la santé des salariés, du fait de leur travail."
        },
        {
            correctAnswer: "chsct",
            titleText: "Votre poste de travail ne vous semble pas adapté. Vous souhaitez le faire analysé par un représentant du \npersonnel formé en matière de prévention afin que vos conditions de travail s’améliorent. \nVers qui pouvez-vous vous orienter ?",
            infoText: "Le comité d’hygiène, de sécurité et des conditions de travail est l’instance représentative spécialisée \nen matière de prévention des risques professionnels. Un CHSCT est présent dans les entreprises \nde plus de 50 salariés."
        },
        {
            correctAnswer: "oppbtp",
            titleText: "Votre patron souhaite apporter des changements au sein de son entreprise afin de faciliter le travail des \nses salariés. Il souhaite notamment investir dans du nouveau matériel. Il veut se faire conseiller. \nQui peut le conseiller ?",
            infoText: "L’OPPBTP accompagne les professionnels du bâtiment et des travaux publics à améliorer leur conditions de \ntravail pour prévenir des accidents du travail et des maladies à caractère professionnel."
        },
        {
            correctAnswer: "inspection",
            titleText: "Vous et votre employeur avez des interrogations concernant vos droits et vos obligations. \nVers qui pouvez-vous vous orienter ?",
            infoText: "L’inspection du travail contrôle le respect de la règlementation du travail. Elle réalise des missions de \nconseil et assure des enquêtes sur les conditions de travail."
        },
        {
            correctAnswer: "employeur",
            titleText: "Vous remarquez un dysfonctionnement au sein de votre entreprise: matériel défectueux, manque d’EPI... \nVers qui, en priorité, allez-vous vous orienter ?",
            infoText: "L’employeur est celui qui met en œuvre la démarche de prévention . Il est en e et responsable de la santé \net de la sécurité de ses salariés. Il coordonne ses di érentes équipes et attribue les moyens \nnécessaires à la préserva- tion de la santé physique et mentale de tous ses salariés."
        },
        {
            correctAnswer: "carsat",
            titleText: "Votre employeur a vu ses cotisations accident du travail et maladie professionnelle augmentées. \nIl souhaite se renseigner... \nVers quel instance de prévention peut-il s’orienter ?",
            infoText: "La CARSAT détermine chaque année la cotisation accident du travail et maladie professionnelle. Elle est \nversée par l’entreprise pour assurer ses salariés contre les risques professionnelles. Elle a \négalement de nom- breuses autres missions."
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