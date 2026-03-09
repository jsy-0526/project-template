'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

function DashboardContent() {
  const { user, logout } = useAuth();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button onClick={logout} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
            退出登录
          </button>
        </div>
      </div>
      <p className="text-gray-600">欢迎使用项目模板</p>
    </main>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
