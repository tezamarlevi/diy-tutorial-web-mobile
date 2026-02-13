// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { UserPlusIcon, MailIcon, LockIcon, UserIcon, SparklesIcon } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData.name, formData.email, formData.password);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (isAuthenticated) return navigate('/');

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary via-primary to-accent relative overflow-hidden items-center justify-center">
        {/* Floating decorative shapes */}
        <div className="absolute top-32 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-16 w-36 h-36 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/5 rounded-lg rotate-12" />

        <div className="relative z-10 text-center px-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <SparklesIcon className="h-5 w-5 text-white" />
            <span className="text-white text-sm font-medium">Join Our Community</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Start Your<br />Creative Journey
          </h1>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Create an account to access tutorials, share your own projects, and connect with fellow makers.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">100+</p>
              <p className="text-white/60 text-xs">Tutorials</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">50+</p>
              <p className="text-white/60 text-xs">Creators</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">Free</p>
              <p className="text-white/60 text-xs">Forever</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
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
              Create your account
            </h2>
            <p className="text-base-content/60 mt-2">
              Join the community and start learning today
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

                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-base-content/40" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      className="input input-bordered w-full pl-12 focus:input-primary transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

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
                      name="password"
                      type="password"
                      required
                      className="input input-bordered w-full pl-12 focus:input-primary transition-all"
                      placeholder="Min. 6 characters"
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
                    <UserPlusIcon className="h-5 w-5" />
                  )}
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              {/* Divider */}
              <div className="divider text-base-content/40 text-sm mt-6">Already a member?</div>

              {/* Login Link */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="btn btn-ghost btn-block font-medium text-primary hover:bg-primary/10"
                >
                  Sign in to your account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
