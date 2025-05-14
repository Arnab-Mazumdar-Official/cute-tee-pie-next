'use client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/material';
import ThemeToggle from '../../../components/theamtoggle/theamtoggle';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const isBelow920 = useMediaQuery('(max-width:920px)');
  const isBelow533 = useMediaQuery('(max-width:533px)');


  const sidebarWidth = isBelow533 ? 144 : isBelow920 ? 192 : 256;


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 w-full h-14 bg-gray-900 text-white flex items-center justify-center px-6 shadow z-50 relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute left-4 bg-gray-900 p-2 rounded"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Admin</h1>
          <div className="absolute right-4">
            <Box>
              <ThemeToggle />
            </Box>
          </div>
        </div>



      {/* Body with Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div
              key="sidebar"
              initial={{ width: 0 }}
              animate={{ width: sidebarWidth }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-gray-800 p-4 shadow-lg h-screen fixed top-14 left-0 z-40"
              style={{ height: 'calc(100vh - 56px)' }} // 56px = 14 * 4 (Tailwind h-14)
            >
              <h2 className="text-2xl font-bold mb-8 text-white">Dashboard Menu</h2>


              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/admin-dashboard/products')}
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 text-white transition-all"
              >
                Products
              </motion.button>


              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/admin-dashboard/collections')}
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 text-white transition-all"
              >
                Collections
              </motion.button>


              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/admin-dashboard/order-list')}
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 text-white transition-all"
              >
                Orders
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 text-white transition-all"
              >
                cart Lists
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 mb-4 bg-gray-700 rounded hover:bg-gray-600 text-white transition-all"
              >
                User's List
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Main content */}
        <main
            className={`flex-1 p-4 transition-all duration-300 overflow-auto ${
              sidebarOpen ? 'ml-36 sm:ml-48 md:ml-64' : ''
            }`}
            style={{
              marginLeft: sidebarOpen ? sidebarWidth : 0,
            }}
          >
            {children}
          </main>

      </div>
    </div>
  );
}