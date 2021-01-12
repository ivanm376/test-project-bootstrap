import React from 'react'
import { renderToString /*, renderToNodeStream */ } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './src/components/App'
import rootReducer from './src/reducers'
import fs from 'fs'

let html = fs.readFileSync('./src/index-template.html').toString()

// Make joined string '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta ...'
html = html
  .split('\n')
  .map(i => i.trim())
  .join('')

// Insert window.USESSR and CSS:
const css = fs.readFileSync('./dist/main.css').toString()
html = html.replace('</head>', `<script>window.USESSR=true</script><style>${css}</style></head>`)

// Insert prerendered App:
const store = createStore(rootReducer)
const appString = renderToString(
  <Provider store={store}>
    <App />
  </Provider>
)
html = html.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)

// Insert client-bundle.js:
html = html.replace('</html>', '<script src="/client-bundle.js"></script></html>')

module.exports = function (app) {
  app.get('/', (req, res) => {
    /* --renderToString-- */
    return res.send(html)

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
