import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
  <GoogleOAuthProvider clientId="113193232110-5ni25otdtp28e6uchr59q3p5v9jgesum.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>

  </StrictMode>,
)
