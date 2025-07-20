import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import HospitalSelection from './pages/HospitalSelection'
import InterpreterList from './pages/InterpreterList'
import MyPage from './pages/MyPage'
import Schedule from './pages/Schedule'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import WriteReview from './pages/WriteReview'
import DetailView from './pages/DetailView'
import EditBooking from './pages/EditBooking'
import './styles/App.css'

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '김환자',
    email: 'patient@email.com',
    phone: '010-1234-5678',
    status: 'active'
  })

  return (
    <Router>
      <div className="app">
        <Navbar currentUser={currentUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hospitals" element={<HospitalSelection />} />
            <Route path="/interpreters" element={<InterpreterList />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/signup" element={<Signup currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/write-review" element={<WriteReview />} />
            <Route path="/detail-view" element={<DetailView />} />
            <Route path="/edit-booking" element={<EditBooking />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App