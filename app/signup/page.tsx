// 📁 app/signup/plan/page.tsx
'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants';
import Button from '@/components/Button';

const plans = [
  {
    id: 'basic',
    name: '베이직',
    price: '₩7,900',
    features: ['720p HD 화질', '동시 시청 1명', '모바일 + PC'],
  },
  {
    id: 'standard',
    name: '스탠다드',
    price: '₩10,900',
    features: ['1080p FHD 화질', '동시 시청 2명', '모든 디바이스'],
  },
  {
    id: 'premium',
    name: '프리미엄',
    price: '₩13,900',
    features: ['1080p FHD + 4K 화질', '동시 시청 4명', '모든 디바이스'],
  },
];

export default function SignupPlanPage() {
  const [selected, setSelected] = useState<string>('');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">구독제 선택</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`cursor-pointer border rounded-xl p-6 shadow transition-colors duration-200
              ${selected === plan.id ? `border-[${COLORS.ACCENT}] bg-[${COLORS.ACCENT}]` : 'border-gray-300 bg-white'}
              hover:border-[${COLORS.ACCENT}] hover:bg-[${COLORS.ACCENT}]`}
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-lg font-medium mb-4">{plan.price} / 월</p>
            <ul className="text-sm text-gray-700 space-y-1">
              {plan.features.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-8">
          <Button onClick={() => alert(`선택한 구독제: ${selected}`)}>다음 단계로 이동</Button>
        </div>
      )}
    </main>
  );
}
