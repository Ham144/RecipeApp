import React from 'react'
import NotFoundPage from './components/NotFoundPage'
import './global.css'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'*'} element={<NotFoundPage />
        } />
        <Route path='/' />

      </Routes>
    </div>
  )
}

export default App