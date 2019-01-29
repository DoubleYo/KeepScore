const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const config = {
    entry: {
        main: path.join(__dirname, 'src/main.jsx')
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader',
                ],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.ejs'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 5337
    }
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map'
        // config.plugins.push(new BundleAnalyzerPlugin())
    }

    if (argv.mode === 'production') {
        config.performance = {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        }
        config.plugins.push(new CleanWebpackPlugin(['dist']))
        // config.plugins.push(new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     openAnalyzer: false,
        //     generateStatsFile: true,
        // }))
    }

    return config
}