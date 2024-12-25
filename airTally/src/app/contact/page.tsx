'use client';
import { useState } from 'react';
import DarkFooter from "../darkFooter";

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // TODO: Implement your contact form submission logic here
      await fetch('api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      }).then(res => res.json()).then(data => {
        console.log(data);
      });
      setSuccess('Thank you for your message. We\'ll get back to you soon!');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full space-y-8 p-8 bg-gray-800/90 rounded-xl shadow border border-gray-700">
            <div>
              <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">
                Contact Us
              </h1>
              <p className="mt-2 text-center text-gray-300">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}
            {success && <p className="text-green-400 text-center">{success}</p>}

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
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border bg-gray-700 border-gray-600 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400 disabled:opacity-50 transition-colors duration-200"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-sm text-center text-gray-400">
                  By contacting us, you agree to our{' '}
                  <a href="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
                    Privacy Policy
                  </a>
                  {' '}and{' '}
                  <a href="/tos" className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
                    Terms of Service
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}