import { Shield } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-amber-50 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm">
        <Shield className="w-4 h-4 text-amber-500" />
        <span className="font-medium text-gray-800">30-Day Money Back Guarantee</span>
        <span className="text-gray-500">— Try it risk-free</span>
      </div>
    </div>
  );
}
