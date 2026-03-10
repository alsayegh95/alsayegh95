import { motion } from 'framer-motion';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

export default function CrossPlatform() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Sync across all platforms
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              Access your dashboard from any device. Your data syncs seamlessly across desktop, tablet, and mobile so you can stay productive wherever you are.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Monitor className="w-5 h-5" />
                <span className="text-sm font-medium">Desktop</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Tablet className="w-5 h-5" />
                <span className="text-sm font-medium">Tablet</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm font-medium">Mobile</span>
              </div>
            </div>
            <a
              href="#pricing"
              className="mt-8 inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg"
            >
              <Smartphone className="w-4 h-4" />
              Start using on Mobile
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            {/* Phone mockup */}
            <div className="relative w-64 sm:w-72">
              <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-[2.5rem] overflow-hidden">
                  <div className="bg-gray-900 mx-auto w-20 h-6 rounded-b-xl" />
                  <div className="p-6 space-y-4">
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <div className="h-2 bg-gray-600 rounded w-3/4 mb-2" />
                      <div className="h-2 bg-gray-600 rounded w-1/2" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-amber-500/20 rounded-xl p-3 text-center">
                        <div className="w-6 h-6 bg-primary rounded-lg mx-auto mb-2" />
                        <div className="h-2 bg-amber-400/40 rounded w-3/4 mx-auto" />
                      </div>
                      <div className="bg-blue-500/20 rounded-xl p-3 text-center">
                        <div className="w-6 h-6 bg-blue-400 rounded-lg mx-auto mb-2" />
                        <div className="h-2 bg-blue-400/40 rounded w-3/4 mx-auto" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                          <div className="w-4 h-4 bg-green-400 rounded-full shrink-0" />
                          <div className="flex-1">
                            <div className="h-2 bg-gray-600 rounded w-full mb-1" />
                            <div className="h-2 bg-gray-600/50 rounded w-2/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
