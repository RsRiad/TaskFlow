'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TaskFlowLogoIcon } from '@/components/Icon';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('maya.lead@taskflow.app');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 400);
  };

  const handleDemoLogin = () => {
    setEmail('maya.lead@taskflow.app');
    setPassword('demoPassword123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between items-center p-6 font-sans">
      {/* Top Bar / Logo */}
      <div className="w-full max-w-md flex justify-between items-center pt-2">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <TaskFlowLogoIcon className="w-7 h-7 shrink-0 group-hover:scale-105 transition-transform" />
          <span className="text-base font-bold text-gray-900 uppercase tracking-wide">TaskFlow</span>
        </Link>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="text-[12px] font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          Demo Workspace
        </button>
      </div>

      {/* Centered Ultra-Clean Login Card */}
      <main className="w-full max-w-md my-auto py-8">
        <div className="border border-gray-200 rounded-[28px] p-7 sm:p-9 bg-white space-y-6">
          {/* Header */}
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Sign in to TaskFlow</h1>
            <p className="text-[13px] text-gray-400">
              Enter your details below to access your workspace
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-[18px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-[13px] font-medium transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-[18px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-[13px] font-medium transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0 fill-current text-gray-900" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Or with email
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-[16px] bg-red-50 border border-red-200 text-red-600 text-[12px] font-medium flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full border border-gray-200 rounded-[18px] px-3.5 py-2.5 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-all bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your email.')}
                  className="text-[11px] font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full border border-gray-200 rounded-[18px] px-3.5 py-2.5 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-gray-400 hover:text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer text-[11px] font-medium"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
              />
              <label htmlFor="remember" className="text-[12px] font-medium text-gray-500 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.99] rounded-full h-10 text-[13px] font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full h-10 text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Instant Demo Access</span>
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
