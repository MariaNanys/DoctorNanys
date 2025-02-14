const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/index.js', // Entry point for your application
    output: {
        filename: '[name].[contenthash].js', // Unikalna nazwa pliku
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Usuwa stare pliki przed nowym buildem
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // Injects styles into DOM
                    'css-loader',   // Translates CSS into CommonJS
                    'sass-loader'   // Compiles Sass to CSS
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader', // Transpiles JavaScript
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false, // Usuwa komentarze
            terserOptions: {
                compress: {
                    drop_console: true, // Usuwa `console.log`
                    drop_debugger: true,
                },
            },
        })],
        splitChunks: {
            chunks: "all", // Dzieli kod na osobne pliki
            minSize: 30 * 1024, // Minimalny rozmiar pliku (30KB)
            maxSize: 200 * 1024, // Maksymalny rozmiar pliku (200KB)
        },
    },

    devServer: {
        compress: true,
        static: {
            directory: path.join(__dirname, 'dist'), // Serve content from 'dist' directory
        },
        watchFiles: ['src/**/*'], // Watch files in 'src' directory for changes
        hot: true, // Enable Hot Module Replacement
        port: 3000, // Specify the port
        open: true, // Open the browser after server has been started
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Path to your HTML template
            scriptLoading: 'defer', // Wczytuje skrypty po załadowaniu HTML
            inject: 'body', // Default: injects at the end of the body
            injectPosition: 'webpack-inject', // Custom position in your template
            cache: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: "src/images", to: "images"}, // Kopiuje folder `images` do `build/images`
            ],
        }),
        new CompressionPlugin({
            algorithm: "gzip", // Możesz zmienić na "brotliCompress"
            test: /\.(js|css|html|svg)$/, // Kompresujemy JS, CSS, HTML i SVG
            threshold: 10240, // Minimalny rozmiar pliku do kompresji (10KB)
            minRatio: 0.8, // Kompresuj tylko, jeśli oszczędności są większe niż 20%
        }),
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },

};
