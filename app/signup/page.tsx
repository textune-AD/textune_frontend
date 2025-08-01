// app의 page는 가장 처음 마주하는 페이지로, 사용자에게 보여지는 메인 화면입니다.

// 📁 app/page.tsx
'use client';

import { useRouter } from 'next/navigation'; // 클라이언트 사이드 라우팅을 위해 useRouter 사용

export default function LandingPage() {
  const router = useRouter();   // useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.

  const handleStart = () => {
    router.push('/intro'); // 사용자가 "사용해보기" 버튼을 클릭하면 '/intro' 페이지로 이동합니다.
  };

  return (
    <main className="min-h-screen flex flex-col justify-between items-center py-16 px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">ADsheeran에 오신 것을 환영합니다!</h1>
        <p className="text-gray-600">나만의 AI 도우미와 함께 시작해보세요</p>
      </div>

      <button
        className="bg-[#6C00C4] text-white px-6 py-3 rounded-xl shadow hover:bg-[#5a00a7] transition"
        onClick={handleStart} // 버튼 클릭 시 handleStart 함수 호출
      >
        사용해보기
      </button>
    </main>
  );
}
