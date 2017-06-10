var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: './src/index.ts',
    node: {
        __dirname: false,
        __filename: true,
    },
    target: 'node',
    output: {
        filename: 'oyo_server.bundle.js',
        path: __dirname + '/dist',
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.ts?$/, 						  // All ts and tsx files will be process by
                use: [
                    {loader: 'babel-loader'},
                    {loader: 'ts-loader'}
                ], // first babel-loader, then ts-loader                exclude: /node_modules/                   // ignore node_modules
            }, {
                test: /\.js?$/,                          // all js and jsx files will be processed by
                use: 'babel-loader',                   // babel-loader
                exclude: /node_modules/                  // ignore node_modules
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist'], {
                verbose: true
            }
        )
    ]
};