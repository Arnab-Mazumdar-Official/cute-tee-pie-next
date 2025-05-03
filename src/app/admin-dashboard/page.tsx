'use client';


import { useRouter } from "next/navigation";


export default function AdminDashboardHome() {
  const router = useRouter();


  const handleGoToUserDashboard = () => {
    router.push('/');
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 text-center shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard!</h2>
        <p className="text-gray-600 mb-4">Select an option from the menu.</p>
        <p className="text-gray-600 mb-4">[Click The Left Corner Menu Button]</p>
        <button
          onClick={handleGoToUserDashboard}
          className="px-6 py-2 border border-blue-500 text-blue-500 rounded-md "
        >
          Go To User Dashboard
        </button>
      </div>
    </div>
  );
}
