// 📁 app/page.tsx
'use client';

import { useState } from 'react';
import { API } from '@/lib/api';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return alert('분석할 내용을 입력해주세요.');
    setLoading(true);

    try {
      const res = await fetch(API.ANALYZE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, user_id: 'user-id' }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error('분석 요청 실패:', err);
      alert('분석 요청 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="텍스트 입력"
        className="w-full max-w-xl h-40 p-4 border rounded mb-4"
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-primary text-white px-6 py-2 rounded"
      >
        {loading ? '분석 중...' : '분석하기'}
      </button>
      {result && (
        <div className="mt-4 w-full max-w-xl bg-gray-100 p-4 rounded">{result}</div>
      )}
    </main>
  );
}