import React from 'react'
import NotFoundPage from './components/NotFoundPage'
import './global.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import Favorites from './pages/Favorites'
import About from './pages/About'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'*'} element={<NotFoundPage />
        } />
        <Route path='/' element={<Home />
        } />
        <Route path='/about' element={<About />} />
        <Route path='/details/:index' element={<Details />} />
        <Route path='/favorites' element={<Favorites />} />


      </Routes>
    </div>
  )
}

export default App