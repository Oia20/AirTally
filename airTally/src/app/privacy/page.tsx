"use client";
import DarkFooter from "../darkFooter";

const PrivacyPolicy = () => {
  return (
    <>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto bg-gray-800/80 border-gray-700 p-6 sm:p-8 rounded-xl shadow-lg border backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-300">
          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Information We Collect
            </h2>
            <p className="text-gray-300">
              AirTally collects minimal information to provide you with our counting service:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Authentication information when you choose to create an account
              </li>
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Counter data including names and values
              </li>
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Basic usage data to improve our service
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-violet-400">
              How We Use Your Information
            </h2>
            <p className="text-gray-300">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Provide and maintain our service
              </li>
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Save your counter preferences and values
              </li>
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Improve and optimize our application
              </li>
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Respond to your requests or questions
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Data Storage
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For users without an account, counter data is stored locally in your browser. 
              For registered users, data is securely stored in our database and synchronized 
              across your devices.
            </p>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-violet-400">
              Your Rights
            </h2>
            <p className="text-gray-300">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Access your personal data
              </li>
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Correct inaccurate data
              </li>
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Request deletion of your data
              </li>
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Export your data
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Contact Us
            </h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <a 
              href="mailto:privacy@airtally.com"
              className="inline-block text-violet-400 hover:text-fuchsia-400 transition-colors duration-200 hover:underline"
            >
              privacy@airtally.com
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

export default PrivacyPolicy;