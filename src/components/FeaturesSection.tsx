'use client';

import { motion } from 'framer-motion';
import { 
  LightningBoltIcon, 
  RocketIcon, 
  HeartIcon, 
  GearIcon, 
  LockClosedIcon,
  GlobeIcon
} from '@radix-ui/react-icons';

const features = [
  {
    icon: LightningBoltIcon,
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly with live cursors, instant updates, and presence indicators.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: RocketIcon,
    title: 'Lightning Fast',
    description: 'Built with Next.js 14 and optimized for speed. Experience instant page loads.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: HeartIcon,
    title: 'Beautiful Design',
    description: 'Crafted with attention to detail. Modern, clean, and delightful to use.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: GearIcon,
    title: 'Powerful Features',
    description: 'Labels, due dates, checklists, assignments, and more. Everything you need.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: LockClosedIcon,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. We never share your information.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: GlobeIcon,
    title: 'Works Everywhere',
    description: 'Fully responsive design. Use it on desktop, tablet, or mobile.',
    color: 'from-orange-500 to-red-500',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Everything you need
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Powerful features to help your team organize, collaborate, and ship faster.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card with glassmorphism */}
              <div className="relative h-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 hover:border-white/10 transition-all duration-300 overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
