const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(`--- Webpack mode:${process.env.NODE_ENV} ---`);

const mode = process.env.NODE_ENV;
const config = {
  mode,
  entry: './src/client.js',
  plugins: [new HtmlWebpackPlugin({ title: 'Test Project', hash: true })],
  // plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.sass$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
};

module.exports = config;
