import { motion } from 'framer-motion';
import { Zap, Settings, Sparkles } from 'lucide-react';

const steps = [
  {
    num: 1,
    icon: Zap,
    title: 'Get instant access',
    description: 'Complete your purchase and get immediate access to your Dashboard. No waiting, no complicated setup process.',
  },
  {
    num: 2,
    icon: Settings,
    title: 'Set up in minutes',
    description: 'Follow our simple guide to customize your dashboard. Add your tasks, habits, and goals in just a few clicks.',
  },
  {
    num: 3,
    icon: Sparkles,
    title: 'Watch your life transform',
    description: 'Start tracking your progress and see real results. Join thousands who have transformed their productivity.',
  },
];

export default function ThreeSteps() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
        >
          From Overwhelmed to Organized in 3 Steps
        </motion.h2>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-amber-700">{step.num}</span>
              </div>
              <step.icon className="w-8 h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <a
            href="#pricing"
            className="inline-block bg-primary hover:bg-primary-500 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:scale-105 text-lg"
          >
            Get Lifetime Access — $29
          </a>
        </motion.div>
      </div>
    </section>
  );
}
