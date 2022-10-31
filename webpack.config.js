const HTMLPlugin = require('html-webpack-plugin')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const PostCSSPreset = require('postcss-preset-env')

const path = require("path");

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development' ? true : false
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = {
    mode,
    target,
    devtool,

    devServer: {
        open: true,
        hot: false
    },

    entry: './src/index.ts',

    output: {
        path: path.resolve(__dirname, 'build'),
        clean: true,
        filename: 'index.[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]'
    },

    plugins: [
        new HTMLPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),

        new CSSExtractPlugin({
            filename: 'index.[contenthash].css'
        })
    ],

    module: {
        rules: [
            {
                test: /\.html/i,
                use: 'html-loader'
            },

            {
                test: /\.(c|sc)ss$/i,
                use: [
                    devMode ? 'style-loader' : CSSExtractPlugin.loader,
                    'css-loader',

                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [ PostCSSPreset ]
                            }
                        }
                    },

                    'sass-loader'
                ]
            },

            {
                test: /\.ts/i,
                use: 'ts-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(png|jpg|gif|ico|svg)/i,

                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                              progressive: true,
                            },

                            optipng: {
                              enabled: false,
                            },

                            pngquant: {
                              quality: [0.65, 0.90],
                              speed: 4
                            },

                            gifsicle: {
                              interlaced: false,
                            },

                            webp: {
                              quality: 75
                            }
                          }
                    }
                ],

                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js'],
    }
}