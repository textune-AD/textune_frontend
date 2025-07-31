'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  if (status === 'loading') return <div>로딩 중...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-6">로그인</h1>
      <Button onClick={() => signIn('google')}>Google로 로그인</Button>

    </main>
  );
}
