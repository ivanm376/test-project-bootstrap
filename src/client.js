import React from 'react'
import { render, hydrate } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

const store = createStore(rootReducer)

let renderingMethod = render
if (window.USESSR) {
  console.log(`INFO: USESSR flag is on, using hydrate method`)
  renderingMethod = hydrate
}

renderingMethod(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// document.getElementById('root').innerText = 'root'

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js') // register PWA script
  }
})
