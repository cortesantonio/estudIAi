import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Index } from './pages/Index/Index'
import { Registro } from './pages/Auth/Registro'
import { Login } from './pages/Auth/Login'
import { Profile } from './pages/Profile/Profile'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path="/auth/register" element={<Registro />} />
        <Route path='/profile' element={< Profile />} />
      </Routes>
    </Router>
  )
}

export default App
