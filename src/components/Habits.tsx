import { motion } from 'framer-motion';
import { Check, Flame, TrendingUp, Gamepad2 } from 'lucide-react';

export default function Habits() {
  const bullets = [
    { icon: Flame, text: 'Visual streak tracking' },
    { icon: TrendingUp, text: 'Daily progress insights' },
    { icon: Gamepad2, text: 'Gamified consistency' },
  ];

  const habits = [
    { name: 'Morning Workout', streak: 12, days: [true, true, true, false, true, true, true] },
    { name: 'Read 30 mins', streak: 8, days: [true, true, false, true, true, true, true] },
    { name: 'Meditate', streak: 21, days: [true, true, true, true, true, true, true] },
    { name: 'No Social Media', streak: 5, days: [false, true, true, true, true, true, false] },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Habits
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Build habits that actually stick.
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              Track your daily habits with beautiful visuals. See your streaks grow, get insights on your consistency, and stay motivated with gamified progress.
            </p>
            <ul className="mt-8 space-y-4">
              {bullets.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{text}</span>
                </li>
              ))}
            </ul>
            <a
              href="#pricing"
              className="mt-8 inline-block bg-primary hover:bg-primary-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:scale-105"
            >
              Get Lifetime Access — $29
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Habit Tracker</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">This Week</span>
              </div>
              <div className="grid grid-cols-8 gap-2 text-center text-xs text-gray-400 mb-4">
                <span></span>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="font-medium">{d}</span>
                ))}
              </div>
              <div className="space-y-3">
                {habits.map(habit => (
                  <div key={habit.name} className="grid grid-cols-8 gap-2 items-center">
                    <div className="text-xs font-medium text-gray-700 truncate">{habit.name}</div>
                    {habit.days.map((done, i) => (
                      <div
                        key={i}
                        className={`w-full aspect-square rounded-lg flex items-center justify-center ${
                          done ? 'bg-green-100' : 'bg-gray-50'
                        }`}
                      >
                        {done && <Check className="w-3 h-3 text-green-600" />}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-900">Best Streak: 21 days</span>
                </div>
                <span className="text-xs text-gray-400">85% completion rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
