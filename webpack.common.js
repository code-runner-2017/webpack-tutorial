const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const devMode = process.env.NODE_ENV !== 'production';

/*
console.log("NODE ENV:" );
console.log(process.env.NODE_ENV);
console.log("DEV MODE: " + devMode);
console.log('--------------------------');
*/

module.exports = {
    entry: {
        app: './src/index.js'
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        runtimeChunk: 'single',
        moduleIds: 'hashed',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            // filename: '[name].css',
            //chunkFilename: '[id].css',
            filename: (process.env.NODE_ENV !== 'production' ? '[name].css' : '[name].[hash].css'),
            chunkFilename: (process.env.NODE_ENV !== 'production' ? '[id].css' : '[id].[hash].css'),
            // filename: '[name].[hash].css',
            // chunkFilename: '[id].[hash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new ManifestPlugin(),
    ],
    output: {
        // filename: 'ouput.bundle.js',
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    externals: {

    },

    module: {

        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [ 'file-loader' ],

            }
        ],
    }
};
