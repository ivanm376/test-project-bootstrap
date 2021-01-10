const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

console.log(`--- Webpack mode:${process.env.NODE_ENV} ---`)

const mode = process.env.NODE_ENV
const config = {
  mode,
  entry: ['./src/style.sass', './src/client.js'],
  output: { filename: 'client-bundle.js' },
  plugins: [new HtmlWebpackPlugin({ template: './src/index-template.html' })],
  performance: { hints: false }, // disable size limit warnings
  module: {
    rules: [
      {
        test: /\.sass$/i,
        use: ['style-loader', 'css-loader?url=false', 'sass-loader'],
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
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     minChunks: 10,
  //   },
  // },
  // resolve: { // react profiling https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977#webpack-4
  //   alias: {
  //     'react-dom$': 'react-dom/profiling',
  //     'scheduler/tracing': 'scheduler/tracing-profiling',
  //   },
  // },
}

if (mode === 'production') {
  config.plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/client-bundle/]))
}

module.exports = config
