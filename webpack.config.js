const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

console.log(`--- Webpack mode:${process.env.NODE_ENV} ---`)

const mode = process.env.NODE_ENV
const config = {
  mode,
  entry: ['./src/style.sass', './src/client.js'],
  output: {
    filename: 'client-bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index-template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.sass$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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

if (mode === 'production') {
  config.plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/client-bundle/]))
}

module.exports = config
