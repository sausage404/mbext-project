const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: './src/index',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'bundle.js',
        module: true,
        library: {
            type: 'module'
        }
    },
    resolve: {
        extensions: ['.js', '.ts'],
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
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    experiments: {
        outputModule: true
    }
};