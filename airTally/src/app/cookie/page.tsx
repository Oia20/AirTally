"use client";
import DarkFooter from "../darkFooter";

const CookiePolicy = () => {
  return (
    <>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto bg-gray-800/80 border-gray-700 p-6 sm:p-8 rounded-xl shadow-lg border backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">
          Cookie & Storage Policy
        </h1>

        <div className="space-y-8 text-gray-300">
          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Overview
            </h2>
            <p className="text-gray-300">
              AirTally uses local storage and authentication tokens to enhance your experience. This policy explains how we use these technologies and what data we store on your device.
            </p>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-violet-400">
              Local Storage
            </h2>
            <p className="text-gray-300">
              We use browser local storage to store:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Counter data for non-authenticated users
              </li>
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Theme preferences (light/dark mode)
              </li>
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Folder states and organization
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Authentication Tokens
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For authenticated users, we store JWT (JSON Web Tokens) in local storage to maintain your session and ensure secure access to your data. These tokens are encrypted and do not contain sensitive personal information.
            </p>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-violet-400">
              Data Retention
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Local storage data persists until you clear your browser data
              </li>
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Authentication tokens expire automatically for security
              </li>
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                You can clear local data by logging out or clearing browser storage
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Third-Party Storage
            </h2>
            <p className="text-gray-300">
              AirTally does not currently use any third-party cookies or tracking technologies. If this changes in the future, we will update this policy and notify our users.
            </p>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-violet-400">
              Contact Me
            </h2>
            <p className="text-gray-300">
              If you have any questions about our storage practices, shoot me a message!
            </p>
            <a 
              href="/contact"
              className="inline-block text-violet-400 hover:text-fuchsia-400 transition-colors duration-200 hover:underline"
            >
              Contact Me
            </a>
          </section>

          <footer className="pt-8 text-sm text-center">
            <p className="text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </footer>
        </div>
      </div>
    </div>
      <DarkFooter />
    </>
  );
};

export default CookiePolicy;