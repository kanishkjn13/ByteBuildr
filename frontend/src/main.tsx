import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import './index.css'
import App from './App.tsx'

// Initialize Google Analytics with placeholder Measurement ID (replace with actual ID if needed)
ReactGA.initialize("G-XXXXXXXXXX");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
