const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js', // Entry point for your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the output directory before emit
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
  devServer: {
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
    }),
  ],
};
