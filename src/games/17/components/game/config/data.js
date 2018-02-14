/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu17",
    title: "Proposer des mesures de prévention adaptées à chaque situation et en lien avec les principes généraux de prévention",
    principes: {
        title: "Les principes généraux de prévention",
        preventions: [
        "- Éviter les risques, c'est supprimer le danger ou l'exposition au danger",
        "- Évaluer les risques, c'est apprécier l'exposition au danger et l'importance du risque afin de prioriser les actions d eprévention à mener",
        "- Combattre les risques à la source, c'est intégrer la prévention le plus en amont possible, notamment dès la conception des lieux de travail, des équipements ou des modes opératoires",
        "- Adapter le travail à l'Homme en tenant compte des différences individuelles, dans le but de réduire les effets du travail sur la santé",
        "- Tenir compte de l'évolution de la technique, c'est adapter la prévention aux évolutions techniques et organisationnelles",
        "- Remplacer ce qui est dangereux par ce qui l'est moins, c'est éviter l'utilisation de procédés ou de produits dangereux lorsqu'un même résultat peut être obtenu avec une méthode présentant des dangers moindres",
        "- Planifier la prévention en intégrant technique, organisation et conditions de travail, relations sociales et environnement",
        "- Donner la priorité aux mesures de protection collectives et n'utiliser les équipements de protection individuelles qu'en complément des protections collectives si elles se révèlent insuffisantes",
        "- Donner les instructions appropriées aux salariés, c'est former et informer les salariés afin qu'ils connaissent les risques et les mesures de prévention"
        ]
    },
    situations:[
    {
        title: "Principe de prévention: Eviter les risques, c’est supprimer le danger ou l’exposition au danger",
        image: "electricite",
        responses: [
        {
            title: "Couper le courant",
            correct: true
        },
        {
            title: "Avoir suivi une formation d'électricien",
            correct: false
        },
        {
            title: "Utiliser des outils adaptés",
            correct: false
        },
        {
            title: "Porter les EPI",
            correct: false
        },
        {
            title: "Baliser les zones de danger",
            correct: false
        }
        ]
    },
    {
        title: "Principe de prévention: Combattre les risques à la source, c'est intégrer la prévention le plus en amont possible, notamment dès la conception des lieux de travail, des équipements ou des modes opératoires",
        image: "perceuse",
        responses: [
        {
            title: "Poids: 6,2 Kg \nDécibels: 100 DB \nValeur d'émission vibratoire: 16 m/s²",
            correct: false
        },
        {
            title: "Poids: 4,9 Kg \nDécibels: 100 DB \nValeur d'émission vibratoire: 12 m/s²",
            correct: true
        },
        {
            title: "Poids: 5,8 Kg \nDécibels: 120 DB \nValeur d'émission vibratoire: 12 m/s²",
            correct: false
        }
        ]
    },
    {
        title: "Principe de prévention: Adapter le travail à l'Homme en tenant compte des différences individuelles, dans le but de réduire les effets du travail sur la santé",
        image: "plan",
        responses: [
        {
            title: "Travailler sur un établi réglable en hauteur",
            correct: true
        },
        {
            title: "Utiliser une scie égoïne",
            correct: false
        },
        {
            title: "Porter des EPI",
            correct: false
        },
        {
            title: "Effectuer des rotations au poste de travail",
            correct: true
        }
        ]
    },
    {
        title: "Principe de prévention: Remplacer ce qui est dangereux par ce qui l'est moins, c'est éviter l'utilisation de procédés ou de produits dangereux lorsqu'un même résultat peut être obtenu avec une méthode présentant des dangers moindres",
        image: "peinture",
        responses: [
        {
            title: "AFNOR: NF T 36-005 - Famille I - Classe 7b2 \nComposants Organique Volatils: 130 g/l max",
            correct: false
        },
        {
            title: "AFNOR: NF T 36-005 - Famille I - Classe 7b2 6a \nComposants Organique Volatils: 130 g/l max \nÉmissions dans l'air intérieur: Catégorie A+",
            correct: false
        },
        {
            title: "AFNOR: NF T 36-005 - Famille I - Classe 7a2 \nComposants Organique Volatils: 2 g/l max \nÉmissions dans l'air intérieur: Catégorie A+",
            correct: true
        }
        ]
    },
    {
        title: "Principe de prévention: Donner la priorité aux mesures de protection collectives et n'utiliser les équipements de protection individuelles qu'en complément des protections collectives si elles se révèlent insuffisantes",
        image: "couverture",
        responses: [
        {
            title: "Harnais",
            image: "couverture2",
            correct: false
        },
        {
            title: "Filet de protection",
            image: "couverture1",
            correct: true
        },
        {
            title: "Échelle de toit fixée sur crochet",
            image: "couverture3",
            correct: false
        }
        ]
    },
    {
        title: "Principe de prévention: Donner les instructions appropriées aux salariés, c'est former et informer les salarisé afin qu'ils connaissent les risques et les mesures de prévention",
        image: "prevention",
        responses: [
        {
            title: "Formation R408 travail en hauteur",
            correct: true
        },
        {
            title: "Formation SST",
            correct: false
        },
        {
            title: "Prévention des risques électriques",
            correct: false
        },
        {
            title: "Prévention des risques liés à l'activité physique",
            correct: false
        },
        {
            title: "Affichages sur le chantier concernant le port de l'EPI",
            correct: false
        }
        ]
    },
    {
        title: "Principe de prévention: Tenir compte de l'évolution de la technique, c'est adapter la prévention aux évolutions techniques et organisationnelles",
        image: "approvisionnement",
        responses: [
        {
            title: "Monte-charge sur rails",
            image: "approvisionnement1",
            correct: true
        },
        {
            title: "Monte-charge téléscopique",
            image: "approvisionnement2",
            correct: true
        },
        {
            title: "Lancé",
            image: "approvisionnement3",
            correct: false
        }
        ]
    }
    ]
}