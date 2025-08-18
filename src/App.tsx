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
import { Play } from './pages/Game/Play'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path="/auth/register" element={<Registro />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/groups' element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path='/group/:id' element={<ProtectedRoute><ViewGroup /></ProtectedRoute>} />
        <Route path='/quizzes' element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
        <Route path='/join-game' element={<ProtectedRoute><JoinGame /></ProtectedRoute>} />
        <Route path='/results' element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path='/play/:id' element={<ProtectedRoute><Play /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
