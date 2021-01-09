const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

console.log(`--- Webpack mode:${process.env.NODE_ENV} ---`);

const mode = process.env.NODE_ENV;
const config = {
  mode,
  entry: './src/client.js',
  output: { filename: 'client-bundle.js' },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index-template.html' }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/client-bundle/]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          // 'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
};

module.exports = config;
