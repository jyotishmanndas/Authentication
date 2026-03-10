import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Profile from './pages/Profile'

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/auth-verify/:id' element={<VerifyEmail />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default App