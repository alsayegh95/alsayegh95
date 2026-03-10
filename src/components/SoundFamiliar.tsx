import { motion } from 'framer-motion';

const painPoints = [
  {
    emoji: '😩',
    quote: "I start a productivity system every week and drop it after two days.",
  },
  {
    emoji: '🔄',
    quote: "I'm always switching apps but none of them work.",
  },
  {
    emoji: '😔',
    quote: "I feel like a failure every night because I didn't get anything done.",
  },
  {
    emoji: '📱',
    quote: "I waste hours on YouTube before starting anything.",
  },
  {
    emoji: '🔁',
    quote: "I keep revising my plans but never start because it has to be just right.",
  },
];

export default function SoundFamiliar() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
        >
          Sound Familiar?
        </motion.h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <span className="text-3xl mb-4 block">{point.emoji}</span>
              <p className="text-gray-700 font-medium leading-relaxed">"{point.quote}"</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-500 leading-relaxed">
            If you've tried Notion, Excel, or 5 different apps and still feel overwhelmed — you're not broken.
            You just need a system that's designed to work <span className="font-semibold text-gray-700">with</span> your brain, not against it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
