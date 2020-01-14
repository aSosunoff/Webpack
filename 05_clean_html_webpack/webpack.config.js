'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MODE = 'development';
const NODE_ENV = process.env.NODE_ENV || MODE;

const contextEntry = (file) => {
	return path.resolve(__dirname, `frontend/js/${file}`);
};

const contextHtmlWebpackPlugin = (file) => {
	return path.resolve(__dirname, `frontend/view/${file}`);
};

module.exports = {
    mode: NODE_ENV,

    //context: path.resolve(__dirname, 'frontend/js'),
    
    entry: {
        home: contextEntry('home'),
        about: contextEntry('about'),
        //welcome: './welcome',
    },

    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].js',
        library: '[name]'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                //exclude: /(node_modules|bower_components)/,
                include: [
                    path.resolve(__dirname, 'frontend/js')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
			},
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
		
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'public')]
		}),

		new HtmlWebpackPlugin({
			title: 'My Webpack Index',
			filename: '../view/index.html',
			template: contextHtmlWebpackPlugin('index.html'),
			inject: false
		}),

		new HtmlWebpackPlugin({
			title: 'My Webpack Home',
			filename: '../view/home.html',
			template: contextHtmlWebpackPlugin('home.html'),
			inject: false
		}),

		new HtmlWebpackPlugin({
			title: 'My Webpack About',
			filename: '../view/about.html',
			template: contextHtmlWebpackPlugin('about.html'),
			inject: false
		})
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