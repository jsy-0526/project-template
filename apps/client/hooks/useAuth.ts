'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '@/lib/api';
import { setToken, setUserId, setUserEmail, getToken, getUserId, getUserEmail, clearAuth } from '@/lib/auth';

interface User {
  id: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const userId = getUserId();
    const email = getUserEmail();

    if (token && userId && email) {
      setUser({ id: userId, email });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    setToken(data.access_token);
    setUserId(data.userId);
    setUserEmail(email);
    setUser({ id: data.userId, email });
    router.push('/dashboard');
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    router.push('/login');
  };

  return { user, loading, login, logout };
}
