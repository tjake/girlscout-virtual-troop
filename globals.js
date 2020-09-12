
let s = require('./secrets.js');

module.exports = {
    STATE: null,
    ASTRA_AUTH_TOKEN: s.ASTRA_AUTH_TOKEN,
    ASTRA_REST_URL: 'https://' + s.ASTRA_CLUSTER_ID + '-' + s.ASTRA_CLUSTER_REGION + '.apps.astra.datastax.com/api/rest/v2/namespaces/' + s.ASTRA_KEYSPACE,
    KEY_PROFILE: '@Profile'
};