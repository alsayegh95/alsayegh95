import { motion } from 'framer-motion';
import { Check, CalendarDays } from 'lucide-react';

export default function Calendar() {
  const bullets = [
    'Time-blocking made simple',
    'Sync with Google Calendar',
    'Never miss a deadline again',
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Calendar mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">March 2026</h3>
                <div className="flex gap-2">
                  <span className="text-xs bg-primary/20 text-amber-700 px-2 py-1 rounded-full font-medium">Week View</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                  <span key={d} className="font-medium">{d}</span>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { time: '9:00 AM', task: 'Deep Work Block', color: 'bg-amber-100 border-amber-300 text-amber-800' },
                  { time: '11:00 AM', task: 'Team Standup', color: 'bg-blue-100 border-blue-300 text-blue-800' },
                  { time: '1:00 PM', task: 'Project Review', color: 'bg-green-100 border-green-300 text-green-800' },
                  { time: '3:00 PM', task: 'Focus Session', color: 'bg-purple-100 border-purple-300 text-purple-800' },
                ].map(item => (
                  <div key={item.task} className={`${item.color} border rounded-lg px-4 py-3 flex items-center gap-3`}>
                    <span className="text-xs font-medium opacity-70 w-16 shrink-0">{item.time}</span>
                    <span className="text-sm font-medium">{item.task}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Calendar
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Plan your weeks like a pro.
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              A drag-and-drop calendar that makes time-blocking effortless. Plan your days, sync your events, and never let a deadline slip away.
            </p>
            <ul className="mt-8 space-y-4">
              {bullets.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
