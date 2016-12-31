var Gabator = Gabator || {};
Gabator.Config = Gabator.Config || {};

/**
 * Configs for gabator
 * @type {{info: {elevateur: {permisMsg: string}}}}
 */
Gabator.Config.data = {
    stats: {
        health: {
            dom: "#gabator-panel-stats-health",
            maxValue: 7,
            value: 7
        },
        organization: {
            dom: "#gabator-panel-stats-organization",
            maxValue: 7,
            value: 7
        },
        enterprise: {
            dom: "#gabator-panel-stats-enterprise",
            maxValue: 7,
            value: 7
        }
    },
    info: {
        dom: "#gabator-panel-info",
        text: {
            dom: "#gabator-panel-info-text",
            value: "Attention: Vous n'avez pas de permis élévateur."
        }
    }
};