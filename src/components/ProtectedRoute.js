// components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Your auth context
import { useContext } from 'react';

export default function ProtectedRoute({ redirectPath = '/', allowAuthenticated = false }) {
  const { currentUser } = useContext(AuthContext);

  // If the user is authenticated and the route is protected
  // Redirect to the specified path
  if (allowAuthenticated && currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  // If the user is not authenticated and the route is protected
  // Redirect to the landing page or login page
  if (!allowAuthenticated && !currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}