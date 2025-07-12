import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Index } from './pages/Index/Index'
import { Registro } from './pages/Auth/Registro'
import { Login } from './pages/Auth/Login'
import { Profile } from './pages/Profile/Profile'
import { Groups } from './pages/Group/Groups'
import { ViewGroup } from './pages/Group/ViewGroup'
import { Quizzes } from './pages/Quizzes/Quizzes'
import { JoinGame } from './pages/Game/JoinGame'
import { Results } from './pages/Results/Results'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path="/auth/register" element={<Registro />} />
        <Route path='/profile' element={< Profile />} />
        <Route path='/groups' element={< Groups />} />
        <Route path='/group/:id' element={<ViewGroup />} />
        <Route path='/quizzes' element={<Quizzes />} />
        <Route path='/join-game' element={<JoinGame />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
