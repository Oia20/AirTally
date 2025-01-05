"use client";
import { motion } from "framer-motion";
import { CloudArrowUpIcon, BoltIcon as LightningBoltIcon, ScaleIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Cloud Sync',
    description: 'Seamlessly sync your counters across all your devices with secure cloud storage.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Lightning Fast',
    description: 'Built with performance in mind, AirTally responds instantly to your interactions.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Flexible & Scalable',
    description: 'From simple tallies to complex counting needs, AirTally grows with your requirements.',
    icon: ScaleIcon,
  },
  {
    name: 'Data Privacy',
    description: 'We never share your data with anyone, and you can self host if you want!',
    icon: SparklesIcon,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-violet-400">
            Everything You Need in a Counter App
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Powerful features wrapped in a beautiful, intuitive interface.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-violet-400/20 transition-colors duration-300"
            >
              <div className="absolute top-6 left-6">
                <feature.icon className="h-6 w-6 text-violet-400" />
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-100">{feature.name}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}