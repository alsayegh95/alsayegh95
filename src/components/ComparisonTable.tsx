import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const rows = [
  { feature: 'Ready in minutes', dashboard: true, notion: false, excel: false },
  { feature: 'Tasks + Habits + Finances', dashboard: true, notion: false, excel: false },
  { feature: 'Works offline', dashboard: true, notion: false, excel: true },
  { feature: 'Beautiful dashboards', dashboard: true, notion: false, excel: false },
  { feature: 'Mobile-friendly', dashboard: true, notion: true, excel: false },
  { feature: 'One-time payment', dashboard: true, notion: false, excel: false },
  { feature: 'Zero learning curve', dashboard: true, notion: false, excel: false },
];

function CheckMark() {
  return (
    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mx-auto">
      <Check className="w-4 h-4 text-green-600" />
    </div>
  );
}

function XMark() {
  return (
    <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mx-auto">
      <X className="w-4 h-4 text-red-400" />
    </div>
  );
}

export default function ComparisonTable() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Why Dashboard Wins
          </h2>
          <p className="mt-4 text-lg text-gray-500">All the power. None of the complexity.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-5 px-6 text-sm font-medium text-gray-500">Feature</th>
                  <th className="py-5 px-4 text-sm font-bold text-gray-900">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Dashboard
                    </span>
                  </th>
                  <th className="py-5 px-4 text-sm font-medium text-gray-500">Notion</th>
                  <th className="py-5 px-4 text-sm font-medium text-gray-500">Excel</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={i !== rows.length - 1 ? 'border-b border-gray-50' : ''}>
                    <td className="text-left py-4 px-6 text-sm font-medium text-gray-700">{row.feature}</td>
                    <td className="py-4 px-4">{row.dashboard ? <CheckMark /> : <XMark />}</td>
                    <td className="py-4 px-4">{row.notion ? <CheckMark /> : <XMark />}</td>
                    <td className="py-4 px-4">{row.excel ? <CheckMark /> : <XMark />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
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
