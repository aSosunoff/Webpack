"use strict";

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV == "development";
const isProd = !isDev;

const optimization = () => {
	const config = {
		// noEmitOnErrors: true,
		// runtimeChunk: {
		//     name: 'webpack_head'//entrypoint => `runtime~${entrypoint.name}`
		// },
		splitChunks: {
			chunks: "all"
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

	if (isProd) {
		config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
	}

	return config;
};

const fileName = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        "css-loader"
    ];

    if(extra) {
        loaders.push(extra);
    }

    return loaders;
}

module.exports = {
	context: path.resolve(__dirname, "src"),

	mode: isDev ? "development" : "production",

	entry: {
		main: ["@babel/polyfill", "./index.js"],
		analytics: "./analytics.ts"
	},

	output: {
		filename: fileName('js'),
		path: path.resolve(__dirname, "dist")
	},

	resolve: {
		alias: {
			"@model": path.resolve(__dirname, "src/model"),
			"@style": path.resolve(__dirname, "src/styles"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@": path.resolve(__dirname, "src")
		}
	},

	devServer: {
		port: 3000,
		hot: isDev
	},

	optimization: optimization(),

	plugins: [
		new HTMLWebpackPlugin({
			template: "./index.html",
			minify: {
				collapseWhitespace: isProd
			}
		}),

		new CleanWebpackPlugin(),

		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "src/favicon.png"),
				to: path.resolve(__dirname, "dist")
			}
		]),

		new MiniCssExtractPlugin({
			filename: fileName('css')
		})
	],

	module: {
		rules: [
            {
				test: /\.s[ac]ss$/i,
				use: cssLoaders("sass-loader")
			},
			{
				test: /\.(png|jpg|svg|gif)$/i,
				use: ["file-loader"]
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/i,
				use: ["file-loader"]
			},
			{
				test: /\.xml$/i,
				use: ["xml-loader"]
			},
			{
				test: /\.csv$/i,
				use: ["csv-loader"]
			},
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: {
					loader: "babel-loader",
					options: {
						presets: [
							'@babel/preset-env'
						],
						plugins: [
							"@babel/plugin-proposal-class-properties"
						]
					}
				},
			},
			{ 
				test: /\.ts$/, 
				exclude: /node_modules/, 
				loader: {
					loader: "babel-loader",
					options: {
						presets: [
							'@babel/preset-env',
							"@babel/preset-typescript"
						],
						plugins: [
							"@babel/plugin-proposal-class-properties"
						]
					}
				},
			}
		]
	}
};
