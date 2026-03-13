import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#0f172a',
          color: '#e2e8f0',
          border: '1px solid rgba(51,65,85,0.8)',
          borderRadius: '12px',
        },
        success: { iconTheme: { primary: '#22c55e' } },
        error: { iconTheme: { primary: '#f43f5e' } },
      }}
    />
  </StrictMode>,
)
