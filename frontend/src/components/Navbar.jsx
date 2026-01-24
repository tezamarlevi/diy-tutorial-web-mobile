import { Link, useNavigate } from 'react-router';
import { PlusIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <Link to="/" className='text-3xl font-bold text-white font-sans tracking-tight hover:opacity-80 transition-opacity'>
            Heritage Haven
          </Link>
          
          <div className='flex items-center gap-4'>
            {isAuthenticated ? (
              <>
                <span className='text-sm text-white font-medium hidden sm:inline'>
                  Welcome, {user?.name || 'User'}
                </span>
                
                <Link to={'/create'} className='btn btn-primary'>
                  <PlusIcon className='size-5'/>
                  <span>Create Product</span>
                </Link>
                
                <button onClick={handleLogout} className='btn btn-ghost text-white'>
                  <LogOutIcon className='size-5' />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className='btn btn-ghost text-white'>
                  Login
                </Link>
                <Link to="/register" className='btn btn-primary'>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
