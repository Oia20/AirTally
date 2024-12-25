"use client";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20" />
          
          <div className="relative px-6 py-16 sm:px-16 sm:py-24 lg:py-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
              Start Counting Today
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-10">
              and experience a seemless way to tally anything.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-violet-600 hover:bg-violet-700 transition-all duration-200 hover:scale-105"
              >
                Use AirTally
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}