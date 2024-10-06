// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import register from './serviceWorkerRegistration' // Correct import

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

register() // Call the register function
