const path = require('path');
const { constant } = require('@mbext/common');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: './src/index',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'bundle.js'
    },
    externals: constant.dependencies.modules.map(module => ({
        [module]: module
    })),
    resolve: {
        extensions: ['.js'],
    },
    experiments: {
        outputModule: true
    }
};