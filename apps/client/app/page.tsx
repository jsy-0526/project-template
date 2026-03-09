import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Project Template</h1>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          登录
        </Link>
        <Link href="/register" className="px-6 py-3 border rounded-md hover:bg-gray-50">
          注册
        </Link>
      </div>
    </main>
  );
}
