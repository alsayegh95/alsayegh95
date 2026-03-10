import { motion } from 'framer-motion';
import { Target, DollarSign, BarChart3, CheckSquare } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Habit Control',
    description: 'Track and build daily habits with visual streaks, reminders, and gamified progress tracking.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: DollarSign,
    title: 'Integrated Financial Management',
    description: 'Track income, expenses, and savings goals all in one place. Visualize your financial health.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: BarChart3,
    title: 'Productivity Tracking',
    description: 'Measure your daily output with beautiful dashboards. Understand your patterns and optimize.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: CheckSquare,
    title: 'Complete Task Management',
    description: 'Organize tasks by priority, project, and deadline. Never drop the ball on important items.',
    color: 'bg-purple-100 text-purple-600',
  },
];

export default function FeatureCards() {
  return (
    <section id="resources" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Resources
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Keep everything in one place
          </h2>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
