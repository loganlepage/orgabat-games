'use strict';

export default class Networking {

    /**
     * Constructor to initialize networking
     * @param url
     */
    constructor(url) {
        this.url = url;
    }

    sendScore(data) {
        data = data || {};
        if (typeof data.id !== 'number',
            typeof data.time !== 'number',
            typeof data.health !== 'number',
            typeof data.organization !== 'number',
            typeof data.business !== 'number') {
            return false;
        }

        // Envoi des données
        const api = new Api(api_score_url);
        api.sendScore({id:1, time:10, health: 3, organization: 4, business: 2});
    }
};