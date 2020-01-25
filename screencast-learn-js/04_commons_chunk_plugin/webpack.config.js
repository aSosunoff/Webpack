'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const MODE = 'development';
const NODE_ENV = process.env.NODE_ENV || MODE;

module.exports = {
    mode: NODE_ENV,

    context: path.resolve(__dirname, 'frontend'),
    
    entry: {
        home: './home',
        about: './about',
        //welcome: './welcome',
    },

    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js',
        library: '[name]'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                //exclude: /(node_modules|bower_components)/,
                include: [
                    path.resolve(__dirname, 'frontend')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
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

    devtool: NODE_ENV == MODE ? 'none' : false,

    plugins: [
        //TODO: new webpack.NoEmitOnErrorsPlugin(), [or optimization.noEmitOnErrors = true]

        //new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru'],
        }),
    ],

    optimization: {
        noEmitOnErrors: true,
        runtimeChunk: {
            name: 'webpack_head'//entrypoint => `runtime~${entrypoint.name}`
        },
        splitChunks: {
            chunks: 'all',
            minSize: 1,
            minChunks: 2,
            name: 'common',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            },
        }
    }
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