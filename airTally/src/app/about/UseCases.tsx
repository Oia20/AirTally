"use client";
import { motion } from "framer-motion";

const useCases = [
  {
    title: "Sports & Games",
    description: "Keep score in sports matches, board games, or any competitive activity.",
    icon: "🏅",
  },
  {
    title: "Inventory Management",
    description: "Track stock levels, count items, and manage inventory efficiently.",
    icon: "📦",
  },
  {
    title: "Event Management",
    description: "Count attendees, track participation, and manage event metrics.",
    icon: "🎪",
  },
  {
    title: "Personal Goals",
    description: "Track daily habits, exercise repetitions, or any personal metrics.",
    icon: "🎯",
  },
  {
    title: "Research & Data",
    description: "Count occurrences, track observations, and collect data points.",
    icon: "📊",
  },
  {
    title: "Business Analytics",
    description: "Monitor customer interactions, sales, or any business metrics.",
    icon: "💼",
  },
];

export default function UseCases() {

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-violet-400">
            Use Cases
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            AirTally adapts to your counting needs, whatever they may be.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-violet-400/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {useCase.title}
              </h3>
              <p className="text-gray-400">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}