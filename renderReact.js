import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './src/components/App'
import rootReducer from './src/reducers'

const store = createStore(rootReducer)

const templateFn = body => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Project1 SSR</title>
          <link rel="stylesheet" href="/assets/index.css" />
        </head>
        <body>
          <div id="root">${body}</div>
        </body>
        <script src="/client-bundle.js"></script>
      </html>`
}

module.exports = function (app) {
  app.get('/', (req, res) => {
    const body = ReactDOMServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )
    // const body = 'test'
    const template = templateFn(body)
    res.send(template)
  })
}
