// newrelic.js
'use strict';

/**
 * New Relic agent configuration.
 */
exports.config = {
    app_name: ['TestorchFENode'],
    license_key: process.env.NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY,
    logging: {
        level: 'info', // You can set this to 'trace' for debugging
    },
    distributed_tracing: {
        enabled: true
    },
};