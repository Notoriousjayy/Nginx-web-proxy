// import the one and only index.css in src/
import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Header from './layouts/Header';
import App from './App'
import  {Footer}  from './layouts/Footer';
import SVGSpriteInjector from './components/SVGSpriteInjector/SVGSpriteInjector'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <SVGSpriteInjector />
      <BrowserRouter>
        <Header />
        <App />
        <Footer/>
      </BrowserRouter> 
  </React.StrictMode>
)
