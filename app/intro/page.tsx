// 📁 app/intro/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button from '@/components/ui/button';

export default function IntroPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/home'); // 로그인된 사용자는 /home으로 이동
    }
  }, [status, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F4FF] px-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Textune</h1>
        <p className="text-gray-700">내 카피, 문제 없이 사용되려면</p>

        <input
          type="text"
          placeholder="검증할 카피를 입력하세요"
          className="border rounded px-4 py-2 w-72 text-sm focus:outline-none"
        />

        <div className="pt-4">
          <Button
            onClick={() => router.push('/login')}
            className="bg-[#6C00C4] hover:bg-[#51009c] transition-colors duration-200 text-white px-6 py-2 rounded"
          >
            로그인하고 시작하기
          </Button>
          <div className="text-xs text-gray-500 mt-2">
            카카오 아이디로 5초만에 시작
          </div>
        </div>
      </div>
    </main>
  );
}
