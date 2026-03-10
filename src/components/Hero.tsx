import { motion } from 'framer-motion';
import { Shield, Wifi, WifiOff, CreditCard, Star } from 'lucide-react';

const avatarColors = ['bg-blue-400', 'bg-pink-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400'];

function AvatarRow() {
  return (
    <div className="flex -space-x-2">
      {avatarColors.map((color, i) => (
        <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-white`} />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-white pt-16 pb-20 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl mx-auto"
        >
          The Life Dashboard You'll Actually Use
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Tasks, habits, finances, and goals — finally in one place. Set up in minutes. Pay once, own forever. No subscription, no complexity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#pricing"
            className="bg-primary hover:bg-primary-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-full transition-all hover:shadow-xl hover:scale-105 w-full sm:w-auto"
          >
            Get Lifetime Access — $29
          </a>
          <a
            href="#features"
            className="border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-lg px-8 py-4 rounded-full transition-all hover:shadow-md w-full sm:w-auto"
          >
            Learn More
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <AvatarRow />
            <span className="text-sm text-gray-500 font-medium">Trusted by 12,592+ professionals</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              30-Day Money Back Guarantee
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <WifiOff className="w-3.5 h-3.5 text-amber-500" />
              Works Offline
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <CreditCard className="w-3.5 h-3.5 text-amber-500" />
              No Subscription Ever
            </span>
          </div>
        </motion.div>

        {/* Dashboard preview placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-50 via-amber-50 to-gray-100 aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-gray-400 font-medium">Dashboard Preview</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-3">
            <AvatarRow />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">12,592+</span> users across 47 countries love Dashboard
          </p>
        </motion.div>
      </div>
    </section>
  );
}
