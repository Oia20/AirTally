"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-violet-400 mt-12 leading-normal"
          >
            The Web App for Counting... Anything!
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl leading-8 text-gray-300 max-w-3xl mx-auto"
          >
            AirTally is an open-source, cloud-synced counter app that helps you track anything and everything. Simple, beautiful, and powerful.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex gap-4 justify-center"
          >
            <a
              href="/"
              className="rounded-lg px-6 py-3 text-sm font-semibold text-white bg-violet-500 hover:bg-violet-600 transition-colors duration-200"
            >
              Get Started
            </a>
            <a
              href="https://github.com/Oia20/airtally"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-6 py-3 text-sm font-semibold text-violet-400 border border-violet-400/30 hover:bg-violet-400/10 transition-all duration-200"
            >
              View on GitHub
            </a>
          </motion.div>

          {/* Demo Preview */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 w-[95%] sm:w-[85%] md:w-[65%] rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl bg-gray-800/80"
            >
              <img
                src="/Screenshot (209).png"
                alt="AirTally Interface Preview"
                className="w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}