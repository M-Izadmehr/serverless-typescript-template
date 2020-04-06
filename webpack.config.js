const path = require('path')
const slsWebpack = require('serverless-webpack')
const webpack = require('webpack')

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: slsWebpack.lib.entries,
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    target: 'node',
    mode: slsWebpack.lib.webpack.isLocal ? 'development' : 'production',
    optimization: {
        minimize: false,
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: ['cache-loader', { loader: 'ts-loader', options: { transpileOnly: true } }],
            },
        ],
    },
    devtool: slsWebpack.lib.webpack.isLocal ? 'eval-source-map' : 'source-map',
    externals: [
        (context, request, callback) => {
            if (/^(\.|lodash)/.test(request)) {
                return callback()
            }

            return callback(null, `commonjs ${request}`)
        },
    ],
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "require('source-map-support').install();\n",
            raw: true,
        }),
    ],
}
