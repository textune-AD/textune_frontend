// components/home/AnalyzeInputCard.tsx
// 재사용 가능한 입력 + 검사 버튼 카드 컴포넌트
// - 글자수 카운트, 제한 표시, 버튼 상태 관리는 부모가 제어

"use client";

import React from "react";

const MAX_LEN = 1000; // 페이지와 공유할 값이므로 필요 시 props로도 받을 수 있음

export interface AnalyzeInputCardProps {
  title?: string;
  subtitle?: string;
  value: string;
  onChange: (v: string) => void;
  remainChars: number; // 남은 글자 수
  overLimit: boolean;  // 글자수 초과 여부
  onAnalyze: () => void; // 검사하기 클릭 핸들러 (외부에서 시도 제한/로그인 분기 처리)
  hint?: string; // 게스트 남은 횟수 안내 등
}

export default function AnalyzeInputCard({
  title = "광고 문구 입력",
  subtitle = "삽입 가능한 텍스트 길이는 1000자 까지로 입력해 주세요.",
  value,
  onChange,
  remainChars,
  overLimit,
  onAnalyze,
  hint,
}: AnalyzeInputCardProps) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-sm font-medium text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="문구를 입력해 주세요"
          className="w-full h-36 resize-none rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:ring-2 focus:ring-brand/30"
        />
        <div className="flex items-center justify-between">
          <span className={overLimit ? "text-xs text-red-500" : "text-xs text-gray-400"}>
            {Math.max(0, remainChars).toString().padStart(4, "0")}/{MAX_LEN}
          </span>
          <button
            onClick={onAnalyze}
            disabled={!value.trim() || overLimit}
            className="rounded-lg bg-brand px-4 py-2 text-white disabled:opacity-50"
          >
            검사하기
          </button>
        </div>
        {hint && <div className="text-[11px] text-gray-500">{hint}</div>}
      </div>
    </section>
  );
}
