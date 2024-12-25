"use client";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between h-16"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center">
              <img src="/AirTallyLogo.png" alt="AirTally Logo" className="w-full h-full rounded-lg" />
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              AirTally
            </span>
          </div>

          <a
            href="/login"
            className="rounded-lg px-6 py-2 text-sm font-semibold text-violet-400 border border-violet-400/30 hover:bg-violet-400/10 transition-all duration-200"
          >
            Sign In
          </a>
        </motion.div>
      </div>
    </nav>
  );
}
