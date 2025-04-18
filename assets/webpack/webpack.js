const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: './src/index',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'bundle.js'
    },
    externals: [
        '@minecraft/server',
        '@minecraft/server-ui',
        '@minecraft/server-net',
        '@minecraft/server-admin',
        '@minecraft/server-gametest'
    ].map(module => ({
        [module]: module
    })),
    resolve: {
        extensions: ['.js'],
    },
    experiments: {
        outputModule: true
    }
};