'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  async function signUp(email: string, password: string) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(`Invalid server response: ${e}`);
    }
  
    if (!response.ok) {
      throw new Error(data?.error || 'Something went wrong');
    }
  
    return data;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit");
    console.log(email, password);
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password);
      router.push('/login'); // Redirect to login after successful signup
    } catch (err) {
      setError('something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800/90 rounded-xl shadow border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-100">Sign Up for AirTally</h1>
        {error && <p className="text-red-400 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border bg-gray-700 border-gray-600 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border bg-gray-700 border-gray-600 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400 disabled:opacity-50 transition-colors duration-200"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}