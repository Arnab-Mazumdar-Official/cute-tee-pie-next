'use client';

import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Top Header */}
      <div className="sticky top-0 w-full h-14 bg-gray-900 text-white flex items-center justify-center px-6 shadow z-50">
        {/* Menu Button */}
        <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute left-4 bg-gray-900 p-2 rounded"
        >
            ☰
        </button>

        {/* Centered Title */}
        <h1 className="text-xl font-bold">Prin Tee Pal Admin Dashboard</h1>
        </div>



      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
            <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-14 left-0 h-full w-64 bg-gray-800 p-4 z-40 shadow-lg"
            >
            <h2 className="text-2xl font-bold mb-8 text-white">Dashboard Menu</h2>

            <motion.button
                whileTap={{ scale: 0.55 }}
                onClick={() => router.push('/admin-dashboard/products')}
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 text-white transition-all"
            >
                Products
            </motion.button>

            <motion.button
                whileTap={{ scale: 0.55 }}
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 text-white transition-all"
            >
                Categories
            </motion.button>

            <motion.button
                whileTap={{ scale: 0.55 }}
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 text-white transition-all"
            >
                Orders
            </motion.button>

            </motion.div>
        )}
        </AnimatePresence>


      {/* Main Content */}
      <main
        className={` transition-all duration-300 ${
          sidebarOpen ? 'pl-64' : 'pl-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
