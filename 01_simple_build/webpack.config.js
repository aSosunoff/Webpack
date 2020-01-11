'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MODE = 'development';
const NODE_ENV = process.env.NODE_ENV || MODE;

module.exports = {
    mode: NODE_ENV,
    
    entry: {
        'app': path.resolve(__dirname, 'src/main'),
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'main'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                //exclude: /(node_modules|bower_components)/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        //plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    //watch: NODE_ENV == MODE,

    // watchOptions: {
    //     aggregateTimeout: 300
    // },

    devtool: NODE_ENV == MODE ? 'eval' : false,

    plugins: [
        //new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
    ],
}

if(NODE_ENV == 'production'){
    module.exports.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    warnings: false,
                    output: {
                        comments: false,
                    },
                    compress: {
                        drop_console: true,
                    },
                }
            })
        ],
    }
}