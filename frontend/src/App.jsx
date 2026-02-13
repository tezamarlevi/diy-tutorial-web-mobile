import { Routes, Route, useLocation } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { usePageTracking } from './hooks/usePageTracking';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateTutorialPage from './pages/CreateTutorialPage.jsx';
import TutorialLearnPage from './pages/TutorialLearnPage.jsx';
import TutorialDetailPage from './pages/TutorialDetailPage.jsx';
import Footer from './components/Footer.jsx';

const AppContent = () => {
  usePageTracking();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateTutorialPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutorial/:id"
            element={
              <ProtectedRoute>
                <TutorialLearnPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutorial/:id/edit"
            element={
              <ProtectedRoute>
                <TutorialDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
