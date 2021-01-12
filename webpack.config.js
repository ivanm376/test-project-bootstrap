const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const { HtmlWebpackSkipAssetsPlugin } = require('html-webpack-skip-assets-plugin')

console.log(`--- Webpack mode:${process.env.NODE_ENV} ---`)

const mode = process.env.NODE_ENV
const config = {
  mode,
  entry: ['./src/style.sass', './src/client.js'],
  output: { filename: 'client-bundle.js' },
  performance: { maxEntrypointSize: 512000, maxAssetSize: 512000 }, // disable size limit warnings
  plugins: [new HtmlWebpackPlugin({ template: './src/index-template.ejs' }), new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.sass$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  // debug: true,
                  // targets: 'defaults',
                  // targets: 'chrome 85',
                  targets: '> 0.25%, not dead',
                },
              ],
            ],
          },
        },
      },
    ],
  },
}

if (mode === 'development') {
  // config.module.rules[0].use.unshift('style-loader') // use style-loader for css
} else if (mode === 'production') {
  config.plugins.push(new HtmlWebpackSkipAssetsPlugin({ skipAssets: ['main.css'] })) // inline js
  // config.plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/client-bundle/])) // inline js
  // config.plugins.push(new MiniCssExtractPlugin()) // inline css
  // config.module.rules[0].use.unshift(MiniCssExtractPlugin.loader) // inline css
  // config.plugins.push(new CspHtmlWebpackPlugin({ 'script-src': '', 'style-src': '' })) // TODO
}

module.exports = config
