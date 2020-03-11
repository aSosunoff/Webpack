'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    mode: 'development',

    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),   
    },

    resolve: {
        alias:{
            '@model': path.resolve(__dirname, 'src/model'),
            '@style': path.resolve(__dirname, 'src/styles'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@': path.resolve(__dirname, 'src'),
        }
    },

    devServer: {
        port: 3000
    },

    optimization: {
        // noEmitOnErrors: true,
        // runtimeChunk: {
        //     name: 'webpack_head'//entrypoint => `runtime~${entrypoint.name}`
        // },
        splitChunks: {
            chunks: 'all',
            // minSize: 1,
            // minChunks: 2,
            // name: 'common',
            // cacheGroups: {
            //     vendor: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name: 'vendors',
            //         chunks: 'all'
            //     }
            // },
        }
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.png'), 
                to: path.resolve(__dirname, 'dist')
            }
        ])
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                use: ['file-loader']
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/i,
                use: ['csv-loader']
            }
        ]
    }
};