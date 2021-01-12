import React from 'react'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './src/components/App'
import rootReducer from './src/reducers'
import fs from 'fs'

const store = createStore(rootReducer)
const css = fs.readFileSync('./dist/main.css')

const htmlStart = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="description" content="Test Project Bootstrap" />
      <title>Test Project1</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#317EFB" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <noscript>You Javascript is disabled! Site is unreachable!</noscript>
      ${process.env.USESSR ? '<script>window.USESSR=true</script>' : ''}
      <style>${css}</style>
    </head>
    <body>
      <div id="innerBody">
        <div id="root">`
  .split('\n')
  .map(i => i.trim())
  .join('') // make string '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta ...'

const htmlEnd = `</div></div></body><script src="/client-bundle.js"></script></html>`

const appString = renderToString(
  <Provider store={store}>
    <App />
  </Provider>
)

module.exports = function (app) {
  app.get('/', (req, res) => {
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

    /* --renderToString-- */
    res.send(`${htmlStart}${appString}${htmlEnd}`)
  })
}
