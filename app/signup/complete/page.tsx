'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { API } from '@/lib/api';

export default function SignupCompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  interface UserData {
    name: string;
    email: string;
    gender: string;
    birthdate: string;
    job: string;
    // no explicit-any
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const selectedPlan = searchParams.get('plan');
    setPlan(selectedPlan);

    // localStorage 또는 전역 상태
    const saved = localStorage.getItem('signup_info');
    if (saved) {
      setUserData(JSON.parse(saved));
    }
  }, [searchParams]);

  const handleSignup = async () => {
    if (!userData || !plan) return alert('정보가 누락되었습니다.');

    setLoading(true);
    try {
      const res = await fetch(API.SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, subscription: plan }),
      });

      if (!res.ok) throw new Error('회원가입 실패');

      alert('회원가입이 완료되었습니다!');
      router.push('/login');
    } catch (err) {
      alert('회원가입 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">가입 정보를 확인해주세요</h1>

      <div className="mb-6 text-center">
        <p><strong>이름:</strong> {userData?.name}</p>
        <p><strong>이메일:</strong> {userData?.email}</p>
        <p><strong>성별:</strong> {userData?.gender}</p>
        <p><strong>생년월일:</strong> {userData?.birthdate}</p>
        <p><strong>직무:</strong> {userData?.job}</p>
        <p><strong>선택한 요금제:</strong> {plan}</p>
      </div>

      <Button onClick={handleSignup} disabled={loading}>
        {loading ? '가입 중...' : '가입 완료'}
      </Button>
    </main>
  );
}
