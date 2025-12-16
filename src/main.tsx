import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './i18n'
import './styles/tokens.css'
import './styles/base.css'
import './styles/legacy.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <div className="theme-insurfox">
      <App />
    </div>
  </React.StrictMode>
)
