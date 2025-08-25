import './global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppInitializer from './context/AppInitializer.jsx'
import { AccountStateProvider } from './context/AccountStateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccountStateProvider>
      <AppInitializer/>
    </AccountStateProvider>
  </StrictMode>
)
