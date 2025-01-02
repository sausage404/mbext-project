const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: './src/index',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    externals: [
        function ({ context, request }, callback) {
            if (/^@mbext\/common/.test(request)) {
                return callback(null, 'commonjs ' + request);
            }
            callback();
        }
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map'
};

