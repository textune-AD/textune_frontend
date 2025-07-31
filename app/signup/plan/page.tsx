'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Basic',
    price: '무료',
    value: 'basic',
    features: [
      '1080p FHD + 4K 화질',
      '동시 시청 4명',
      '모든 디바이스 지원', // feature 변경 가능성 고려해서 바꿈
    ],
  },
  {
    name: 'Standard',
    price: '4,900원',
    value: 'standard',
    features: [
      '1080p FHD 화질',
      '동시 시청 2명',
      '모든 디바이스 지원',
    ],
  },
  {
    name: 'Premium',
    price: '7,900원',
    value: 'premium',
    features: [
      '720p HD 화질',
      '동시 시청 1명',
      '모바일 + PC 지원',
    ],
  },
];

export default function SignupPlanPage() {
  const [selected, setSelected] = useState<string>('');
  const router = useRouter();

  const handleNext = () => {
    if (!selected) return;
    router.push(`/signup/complete?plan=${selected}`);
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">요금제를 선택해주세요</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => setSelected(plan.value)}
            className={`cursor-pointer border-2 rounded-xl p-6 shadow transition-all
              ${selected === plan.value
                ? 'border-[#EDD9FE] bg-[#F8F4FF]'
                : 'border-gray-200 hover:border-[#EDD9FE] hover:bg-[#F8F4FF]'}`}
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-lg mb-4">월 {plan.price}</p>
            <ul className="space-y-1 text-sm text-gray-600">
              {plan.features.map((f, idx) => (
                <li key={idx}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-8">
          <button
            className="bg-[#6C00C4] text-white px-6 py-2 rounded hover:bg-[#5a00a8]"
            onClick={handleNext}
          >
            다음 단계로 이동
          </button>
        </div>
      )}
    </main>
  );
}
