// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LogInIcon, MailIcon, LockIcon, SparklesIcon } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (isAuthenticated) return navigate('/');

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden items-center justify-center">
        {/* Floating decorative shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-lg rotate-45" />

        <div className="relative z-10 text-center px-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <SparklesIcon className="h-5 w-5 text-white" />
            <span className="text-white text-sm font-medium">Community Learning Platform</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Learn. Create.<br />Share.
          </h1>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Join our community of creators and learners. Discover DIY tutorials crafted by passionate makers.
          </p>

          {/* Testimonial card */}
          <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-sm mx-auto text-left border border-white/20">
            <p className="text-white/90 text-sm italic mb-3">
              "This platform helped me learn woodworking from scratch. The tutorials are incredibly detailed!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div>
                <p className="text-white text-sm font-medium">Community Member</p>
                <p className="text-white/60 text-xs">DIY Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo area */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DIY Tutorials
              </span>
            </div>
            <h2 className="text-3xl font-bold text-base-content">
              Welcome back
            </h2>
            <p className="text-base-content/60 mt-2">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Form Card */}
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="alert alert-error shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email Address</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-base-content/40" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="input input-bordered w-full pl-12 focus:input-primary transition-all"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-base-content/40" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="input input-bordered w-full pl-12 focus:input-primary transition-all"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <LogInIcon className="h-5 w-5" />
                  )}
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              {/* Divider */}
              <div className="divider text-base-content/40 text-sm mt-6">New here?</div>

              {/* Register Link */}
              <div className="text-center">
                <Link
                  to="/register"
                  className="btn btn-ghost btn-block font-medium text-primary hover:bg-primary/10"
                >
                  Create a free account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
