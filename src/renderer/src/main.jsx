import './assets/main.css'
import DiabloTradePingerContextProvider from './context/diabloTradePingerContextProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DiabloTradePingerContextProvider>
      <App />
    </DiabloTradePingerContextProvider>
  </React.StrictMode>
)
