"use client";
import { motion } from "framer-motion";
import Counter from '../counter';
import { ThemeProvider } from '../themeContext';

export default function OpenSource() {
  return (
    <section className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-0"
          >
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-violet-400 mb-6">
              Built in the Open
            </h2>
            <div className="space-y-6 text-gray-300">
              <p>
                AirTally is proudly open source and built with modern technologies. 
                We believe in transparency and community-driven development.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-violet-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  MIT Licensed - Free forever
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-violet-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Built with a modern tech stack
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-violet-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Community-driven development
                </li>
              </ul>
              <div className="flex gap-4 mt-8">
                <a
                  href="https://github.com/Oia20/airtally"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-violet-400/30 rounded-lg text-violet-400 hover:bg-violet-400/10 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Demo Counter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-violet-400 mb-6">Try it out!</h3>
              <ThemeProvider>
                <Counter 
                  id="demo-counter"
                  name="Demo Counter"
                  incrementBy={1}
                  initialValue={0}
                  count={0}
                  step={1}
                  onDelete={() => {}}
                  viewMode="card"
                />
              </ThemeProvider>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}