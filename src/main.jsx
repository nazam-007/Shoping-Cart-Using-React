import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import ShoppingCartProvider from './context/index.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShoppingCartProvider>
      <App />
  </ShoppingCartProvider>
    
  </BrowserRouter>
)
