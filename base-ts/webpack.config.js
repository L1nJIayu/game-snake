const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist'),
        environment: {  // 兼容
            arrowFunction: false,
            const: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'tcs',
            template: './src/public/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}