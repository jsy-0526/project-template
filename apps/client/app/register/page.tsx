'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '@/lib/api';
import { setToken, setUserId, setUserEmail } from '@/lib/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api.register(email, password);
      setToken(data.access_token);
      setUserId(data.userId);
      setUserEmail(email);
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
      
      setError('注册失败，请检查邮箱格式');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">注册</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            注册
          </button>
          <p className="text-center text-sm text-gray-600">
            已有账号？<a href="/login" className="text-blue-600 hover:underline">去登录</a>
          </p>
        </form>
      </div>
    </div>
  );
}
