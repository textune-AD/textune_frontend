'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/home');
    }
  }, [status, router]);

  if (status === 'loading') return <div className="p-6">로딩 중...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold mb-6">로그인</h1>

      <div className="space-y-4 w-full max-w-xs">
        {/* 자체 로그인 입력폼 */}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
        <button
          className="w-full bg-gray-300 text-sm py-2 rounded cursor-not-allowed"
          disabled
        >
          자체 로그인 (준비 중)
        </button>

        <div className="text-center text-sm text-gray-500">또는</div>

        {/* 소셜 로그인 */}
        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Google로 로그인
        </button>
        <button
          onClick={() => signIn('kakao')}
          className="w-full bg-yellow-300 py-2 rounded"
        >
          Kakao로 로그인
        </button>
      </div>
    </main>
  );
}
