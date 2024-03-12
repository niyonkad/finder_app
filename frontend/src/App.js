import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import WelcomePage from './components/WelcomePage';
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/404';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<WelcomePage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
