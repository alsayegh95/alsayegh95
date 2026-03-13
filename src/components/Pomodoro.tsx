import { motion } from 'framer-motion';
import { Play, RotateCcw, SkipForward } from 'lucide-react';

export default function Pomodoro() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Pomodoro
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Control your time and stay focused
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              Use the built-in Pomodoro timer to break your work into focused intervals. Stay productive without burning out. Track your sessions and build a consistent work rhythm.
            </p>
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
            className="flex justify-center"
          >
            <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-2xl">
              <div className="text-center">
                <p className="text-gray-400 text-sm font-medium mb-2">Focus Session</p>
                <div className="text-7xl sm:text-8xl font-bold text-white tracking-tight font-mono">
                  24:55
                </div>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-gray-900 hover:bg-primary-500 transition-colors shadow-lg">
                    <Play className="w-7 h-7 ml-1" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2">
                  {['Focus', 'Short Break', 'Long Break'].map((label, i) => (
                    <span
                      key={label}
                      className={`text-xs px-3 py-1 rounded-full ${
                        i === 0 ? 'bg-primary text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
