"use client";
import DarkFooter from "../darkFooter";
import DarkNavbar from "../darkNav";

const TermsOfService = () => {
  return (
    <>
    <DarkNavbar />
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto bg-gray-800/80 border-gray-700 p-6 sm:p-8 rounded-xl shadow-lg border backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">
          Terms of Service
        </h1>

        <div className="space-y-8 text-gray-300">
          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Open Source
            </h2>
            <p className="text-gray-300 leading-relaxed">
              AirTally is an open-source project licensed under the MIT License. While the service is 
              provided "as is", we strive to maintain its quality and security. You are free to fork, 
              modify, and use the code according to the MIT License terms.
            </p>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-violet-400">
              Service Description
            </h2>
            <p className="text-gray-300 leading-relaxed">
              AirTally is a web-based counter service that allows users to create, manage, 
              and organize counters. The service includes both local storage for anonymous users 
              and cloud storage for authenticated users.
            </p>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              User Accounts
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                Account creation is optional - you can use the service anonymously
              </li>
              <li className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                If you create an account, you are responsible for maintaining its security
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-violet-400">
              Acceptable Use
            </h2>
            <p className="text-gray-300">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Use the service for any unlawful purpose
              </li>
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Attempt to compromise the service&apos;s security
              </li>
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Overload or disrupt the service infrastructure
              </li>
              <li className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
                Engage in automated abuse of the service API
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Data and Privacy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We prioritize data privacy and transparency. Anonymous users&apos; data is stored locally 
              in their browser. Authenticated users&apos; data is stored securely in our database. 
              For full details, please refer to our Privacy Policy.
            </p>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-violet-400">
              Contributions
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We welcome contributions to AirTally through GitHub. By contributing, you agree to 
              license your contributions under the same MIT License that covers the project. Please 
              review our contribution guidelines on GitHub before submitting changes.
            </p>
          </section>

          <section className="space-y-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-fuchsia-500/20 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-fuchsia-400">
              Contact and Support
            </h2>
            <p className="text-gray-300">
              For support, bug reports, or feature requests, please:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-gray-300">
                Open an issue on our{" "}
                <a 
                  href="https://github.com/Oia20/airtally"
                  className="text-violet-400 hover:text-fuchsia-400 transition-colors duration-200 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub repository
                </a>
              </li>
              <li className="text-violet-400 hover:text-fuchsia-400 transition-colors duration-200 hover:underline">
                <a href="/contact">
                  Shoot me a message
                </a>
              </li>
            </ul>
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

export default TermsOfService;