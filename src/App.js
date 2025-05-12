import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import Header from './components/header/Header';
import LandingPage from './components/LandingPage';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Header />
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute allowAuthenticated redirectPath="/onboarding" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<OnboardingFlow />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;