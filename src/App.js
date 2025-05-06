import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import Header from './components/header/Header';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header /> 
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;