import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// https://stackoverflow.com/questions/75728532/error-message-uncaught-typeerror-cannot-destructure-property-basename-of-re

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
