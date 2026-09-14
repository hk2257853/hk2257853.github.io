import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

// Console easter egg
console.log(
  '%c👋 Hey, you\'re inspecting the console?',
  'color: #5cedc8; font-size: 16px; font-weight: bold;'
);
console.log(
  '%cWe should talk. → harshwork474@gmail.com',
  'color: #8892b0; font-size: 12px;'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
