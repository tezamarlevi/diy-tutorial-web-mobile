// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();  // ← Added isLoading
  const location = useLocation();

  // While checking token, show spinner (prevents premature redirect)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  // If not authenticated, redirect to login (save intended route)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
