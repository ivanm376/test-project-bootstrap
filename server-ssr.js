import React from 'react'
import { renderToString /*, renderToNodeStream */ } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './src/components/App'
import rootReducer from './src/reducers'
import fs from 'fs'

const html = fs
  .readFileSync('./src/index-template.html')
  .toString()
  .split('\n')
  .map(i => i.trim())
  .join('') // make joined string '<!DOCTYPE html><html lang="en"><head><meta charset=...'
const css = fs.readFileSync('./dist/main.css').toString()
const store = createStore(rootReducer)
const appString = renderToString(
  <Provider store={store}>
    <App />
  </Provider>
)
// const clientjs = fs.readFileSync('./dist/client-bundle.js').toString()  // inline client js

const chunksHead = html.split('</head>')
const chunksRoot = chunksHead[1].split('<div id="root"></div>')
const chunksFoot = chunksRoot[1].split('</html>')

const resultHtml = [
  chunksHead[0], // '<!DOCTYPE html><html lang="en"><head>...
  `<script>window.USESSR=true</script><style>${css}</style></head>`, // insert window.USESSR and CSS
  chunksRoot[0], // '<body><div id="innerBody">'
  `<div id="root">${appString}</div>`, // insert prerendered App
  chunksFoot[0], // '</div></body>'
  '<script src="/client-bundle.js"></script></html>', // insert client-bundle.js
  // `<script>${clientjs}</script></html>`, // inline client js
].join('')

module.exports = function (app) {
  app.get('/', (req, res) => {
    /* --renderToString-- */
    return res.send(resultHtml)

    /* --renderToNodeStream-- */
    // const stream = renderToNodeStream(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // )
    // res.write(htmlStart)
    // stream.pipe(res, { end: false }) // pipe rendered App
    // stream.on('end', () => {
    //   res.write(htmlEnd)
    //   res.end()
    // })
  })
}
