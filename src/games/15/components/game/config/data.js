/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu15",
    actions: [
        {
            title: "Vous devez casser une dalle de béton avec un marteau piqueur (niveau sonore 110 Décibels). Plusieurs casques antibruit sont rangés dans le camion. Vous souhaitez un équipement vous permettant de travailler en toute sécurité. Votre patron vous rappel que lorsque le niveau sonore est supérieur à 85 Décibels, vous devez vous protéger.",
            question: "Quelle protection auditive choisir ?",
            key: "marteau-piqueur",
            responses: [
            {
                title: "Casque B",
                info: "Niveau d’atténuation 22 dB (SNR).",
                key: "casque_anti_bruit"
            },
            {
                title: "Casque C",
                info: "Niveau d’atténuation 30 dB (SNR).",
                key: "casque_anti_bruit"
            },
            {
                title: "Casque A",
                info: "Niveau d’atténuation 15 dB (SNR).",
                key: "casque_anti_bruit"
            }
            ],
            correctAnswer: [
            "Casque C"
            ]
        },
        {
            title: "Vous meulez très régulièrement des pièces métalliques et souhaitez vous protéger les yeux. Vous voulez des lunettes qui protègent des projections latérales (protection sur les côtés).",
            question: "Quelle paire de lunette choisir ?",
            key: "meuleuse",
            responses: [
            {
                title: "",
                info: "Lunettes 3D",
                key: "lunettes_3d"
            },
            {
                title: "",
                info: "Lunettes de sport d'hiver",
                key: "lunettes_ski"
            },
            {
                title: "",
                info: "Lunettes de soleil",
                key: "lunettes_soleil"
            },
            {
                title: "",
                info: "Lunettes de vue",
                key: "lunettes_vue"
            },
            {
                title: "",
                info: "Lunettes de protection",
                key: "lunettes_protection"
            },
            {
                title: "",
                info: "Lunettes de plongée",
                key: "lunettes_plongee"
            }
            ],
            correctAnswer: [
            "lunettes_protection"
            ]
        },
        {
            title: "Vous devez réaliser l’isolation dans les combles d’un client avec de la laine de verre. Sur les chantiers, vous posez également de la laine de roche, vous travaillez le bois et poncer régulièrement des éléments métalliques. Votre patron vous demande d’acheter des masques jetables.",
            question: "Quelle classe de filtration choisir ?",
            key: "isolation",
            responses: [
            {
                title: "FFP3",
                info: "Conseillé contre fibres céramique, laine de roche, cadmium, chrome, chêne, hêtre, silice, plomb, amiante, légionelles. Possible contre coton, bois, ponçage de pièces métalliques, de résine, laine de verre, champignons, projections de béton humide, meulage.",
                key: "masque_anti_poussieres"
            },
            {
                title: "FFP1",
                info: "Conseillé contre coton, graphite, hydroxyde de sodium, foins",
                key: "masque_anti_poussieres"
            },
            {
                title: "FFP2",
                info: "Conseillé contre bois, ponçage de pièces métalliques, de résine, laine de verre, semences, champignons Possible contre coton, graphite, hydroxyde de sodium, foins",
                key: "masque_anti_poussieres"
            }
            ],
            correctAnswer: [
            "FFP3"
            ]
        },
        {
            title: "Vous êtes chef d’équipe et devez vérifier les ferraillages (ensemble des fers d'une construction en béton armé). Vous travaillez souvent dans un environnement boueux et humide. Vous avez un bon d’achat chez un fournisseur pour vous équiper d’une paire de chaussure de sécurité.",
            question: "Quelles chaussures de sécurité choisir ?",
            key: "ferraillage",
            responses: [
            {
                title: "EN 345 S1",
                info: "rassemble les chaussures de sécurité en cuir et autres matières - excepté le caoutchouc et tout autre polymère. Les chaussures de sécurité S1 répondent à des exigences fondamentales. Elles sont munies d’embouts de protection résistant au choc, à l’écrasement . Elles bénéficient de propriétés antistatiques (substance qui réduit son électricité statique) et de l’absorption de choc au niveau du talon.",
                key: "chaussures_de_securite"
            },
            {
                title: "EN 345 S2",
                info: "reprend les exigences des chaussures S1. Les chaussures S2 disposent également d’une tige résistant à la pénétration et l’absorption d’eau.",
                key: "chaussures_de_securite"
            },
            {
                title: "EN 345 S3",
                info: "dispose des exigences fondamentales des chaussures S2. De plus, les chaussures S3 bénéficient de semelles anti-perforation et à crampons.",
                key: "chaussures_de_securite"
            }
            ],
            correctAnswer: [
            "EN 345 S3"
            ]
        },
        {
            title: "Vous manutentionnez des agglos pour approvisionner le chantier.",
            question: "Quelles gants choisir ?",
            key: "agglos",
            responses: [
            {
                title: "Gants de vélo",
                info: "Gants de vélo",
                key: "gants_velo"
            },
            {
                title: "Gants de jardinage",
                info: "Gants de jardinage",
                key: "gants_jardin"
            },
            {
                title: "Gants de manutention",
                info: "Gants de manutention",
                key: "gants_manutention"
            },
            {
                title: "Gants de moto",
                info: "Gants de moto",
                key: "gants_moto"
            },
            {
                title: "Gants de chirurgie",
                info: "Gants de chirurgie",
                key: "gants_chirurgie"
            }
            ],
            correctAnswer: [
            "Gants de manutention"
            ]
        },
    ]
}