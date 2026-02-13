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
    <header className='sticky top-0 z-50 backdrop-blur-lg bg-base-100/90 border-b border-base-content/10 shadow-sm'>
      <div className='mx-auto max-w-7xl p-4'>
        <div className='flex items-center justify-between'>
          <Link to="/" className='flex items-center gap-2 group'>
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-2xl">🛠️</span>
            </div>
            <h1 className='text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              DIY Tutorials
            </h1>
          </Link>

          <div className='flex items-center gap-4'>
            {isAuthenticated ? (
              <>
                <span className='text-sm font-medium hidden sm:inline opacity-70'>
                  {user?.name || 'User'}
                </span>

                <Link to={'/create'} className='btn btn-primary btn-sm sm:btn-md'>
                  <PlusIcon className='size-4' />
                  <span className="hidden sm:inline">New Tutorial</span>
                </Link>

                <button onClick={handleLogout} className='btn btn-ghost btn-circle'>
                  <LogOutIcon className='size-5' />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className='btn btn-ghost btn-sm sm:btn-md'>
                  Login
                </Link>
                <Link to="/register" className='btn btn-primary btn-sm sm:btn-md'>
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
