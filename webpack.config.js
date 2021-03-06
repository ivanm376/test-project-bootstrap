const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { HtmlWebpackSkipAssetsPlugin } = require('html-webpack-skip-assets-plugin')
// const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
// const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')

console.log(`--- Webpack mode:${process.env.NODE_ENV} ---\n`)

const config = {
  mode: process.env.NODE_ENV,
  entry: ['./src/style.sass', './src/client.js'],
  output: { filename: 'client-bundle.js' },
  performance: { maxEntrypointSize: 512000, maxAssetSize: 512000 }, // disable size limit warnings
  plugins: [new HtmlWebpackPlugin({ template: './src/index-template.html' }), new MiniCssExtractPlugin()],
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

if (process.env.NODE_ENV === 'development') {
  // config.module.rules[0].use.unshift('style-loader') // use style-loader for css
} else if (process.env.NODE_ENV === 'production') {
  // config.plugins.push(new HtmlWebpackSkipAssetsPlugin({ skipAssets: ['main.css'] })) // inline js
  // config.plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/client-bundle/])) // inline js
  // config.plugins.push(new CspHtmlWebpackPlugin({ 'script-src': '', 'style-src': '' })) // TODO
}

module.exports = config
