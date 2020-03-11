'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV == 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
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
    };

    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }

    return config;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),

    mode: isDev ? 'development' : 'production',

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
        port: 3000,
        hot: isDev
    },

    optimization: optimization(),

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.png'), 
                to: path.resolve(__dirname, 'dist')
            }
        ]),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    },
                }, 'css-loader']
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