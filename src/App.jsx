import { useContext } from 'react'
import './App.css'
import Home from './Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import Login from './Login'
import Mypage from './Mypage'

function App() {

  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to='/login/' />
    }

    return children
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
