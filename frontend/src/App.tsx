import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/auth-verify/:id' element={<VerifyEmail />} />
    </Routes>
  )
}

export default App