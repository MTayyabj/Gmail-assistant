import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme-toggle.js'
import {AppContextProvider} from './Context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem
          >
  <App/>
  </ThemeProvider>
  </AppContextProvider> 
  </BrowserRouter>
)
