import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Freelance Designer',
    location: 'New York, USA',
    avatar: 'bg-pink-400',
    before: "I was constantly overwhelmed with client work, missing deadlines, and feeling like I couldn't keep up.",
    afterDays: 14,
    afterPoints: [
      'Completed 23 client projects on time',
      'Built a consistent morning routine',
      'Reduced daily stress by managing tasks effectively',
    ],
    quote: "Dashboard changed how I approach my entire day. I actually feel in control now.",
  },
  {
    name: 'Marcus T.',
    role: 'Software Engineer',
    location: 'Berlin, Germany',
    avatar: 'bg-blue-400',
    before: "Tried every app — Notion, Todoist, ClickUp. Nothing stuck. I'd set up a system and abandon it within a week.",
    afterDays: 30,
    afterPoints: [
      'Maintained daily habits for 30 days straight',
      'Saved $2,400 by tracking finances',
      'Promoted at work due to better organization',
    ],
    quote: "This is the first system I've actually stuck with. It just works.",
  },
  {
    name: 'Priya M.',
    role: 'University Student',
    location: 'Mumbai, India',
    avatar: 'bg-purple-400',
    before: "I was spending more time planning than actually studying. My grades were slipping and I felt lost.",
    afterDays: 21,
    afterPoints: [
      'GPA improved from 3.1 to 3.7',
      'Study sessions became focused and productive',
      'Finally balanced academics and personal life',
    ],
    quote: "I wish I had this when I started university. It would have saved me years of struggling.",
  },
  {
    name: 'James W.',
    role: 'Small Business Owner',
    location: 'London, UK',
    avatar: 'bg-green-400',
    before: "Running a business meant everything was in my head. I was dropping balls left and right.",
    afterDays: 7,
    afterPoints: [
      'Organized entire business operations',
      'Never missed a client meeting again',
      'Revenue increased 20% with better time management',
    ],
    quote: "The ROI on $29 has been incredible. Best business investment I've made this year.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            They Were Stuck Too. Here's What Changed.
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${t.avatar} shrink-0`} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role} · {t.location}</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-3">
                  <p className="text-xs font-semibold text-red-400 mb-1">BEFORE</p>
                  <p className="text-sm text-gray-600 leading-relaxed">"{t.before}"</p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-green-500 mb-2">AFTER {t.afterDays} DAYS</p>
                  <ul className="space-y-1.5">
                    {t.afterPoints.map(point => (
                      <li key={point} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-gray-700 italic">"{t.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#pricing"
            className="inline-block bg-primary hover:bg-primary-500 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:scale-105 text-lg"
          >
            I Want These Results Too
          </a>
        </motion.div>
      </div>
    </section>
  );
}
