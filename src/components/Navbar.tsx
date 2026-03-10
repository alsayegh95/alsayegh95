import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold text-gray-900">
            Dashboard
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Product
            </a>
            <a href="#resources" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Log in
            </a>
            <a
              href="#pricing"
              className="bg-primary hover:bg-primary-500 text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:scale-105"
            >
              Get Started
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4 space-y-3">
            <a href="#features" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>
              Product
            </a>
            <a href="#resources" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>
              Features
            </a>
            <a href="#pricing" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>
              Pricing
            </a>
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <a href="#" className="text-sm font-medium text-gray-600">Log in</a>
              <a href="#pricing" className="bg-primary text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full text-center" onClick={() => setMobileOpen(false)}>
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
