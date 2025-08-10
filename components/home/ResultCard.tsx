// components/home/ResultCard.tsx
// 개선 결과 표시 카드 (복사/초기화 버튼 포함)

import React from "react";
import Card from "@/components/home/Card";

export interface ResultCardProps {
  title?: string;
  subtitle?: string;
  result: string;
  onCopy: () => void;
  onClear: () => void;
}

export default function ResultCard({
  title = "개선된 문장",
  subtitle = "초기 결과는 간단한 가이드로 제공될 예정입니다.",
  result,
  onCopy,
  onClear,
}: ResultCardProps) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div className="h-36 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600 overflow-auto">
        {result ? (
          <pre className="whitespace-pre-wrap font-sans">{result}</pre>
        ) : (
          <span className="text-gray-400">분석 후 개선 문장이 표시됩니다.</span>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2 text-gray-400">
        <button className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50" onClick={onCopy}>
          복사
        </button>
        <button className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50" onClick={onClear}>
          초기화
        </button>
      </div>
    </Card>
  );
}