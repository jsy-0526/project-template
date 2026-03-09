const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('登录失败');
  return res.json();
}

export async function register(email: string, password: string, name?: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) throw new Error('注册失败');
  return res.json();
}
