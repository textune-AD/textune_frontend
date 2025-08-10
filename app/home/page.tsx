// app/home/page.tsx
// Textune 홈 화면(대시보드 첫 화면) – 와이어프레임 반영
// - 좌측 보라색 사이드 바
// - 광고 문구 입력 + 글자 수 / 분석하기 버튼
// - 개선된 문장 카드(placeholder)
// - 문제점 영역(placeholder)
// - 관련 법 조항 보기 토글

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MAX_LEN = 1000;

export default function HomePage() {
  const [text, setText] = useState("");
  const [improved, setImproved] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [openLaw, setOpenLaw] = useState(false);

  const remain = useMemo(() => MAX_LEN - text.length, [text.length]);
  const over = remain < 0;

  const handleAnalyze = async () => {
    // TODO: 실제 API 연동
    // 예시 동작: 간단 변환/더미 결과
    const trimmed = text.trim();
    if (!trimmed) return;

    setImproved(`${trimmed}\n\n(예시) 더 명확하게 다듬은 문장입니다.`);
    setIssues([
      "과장/확정적 표현 가능성",
      "근거 미표기",
    ]);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <div className="mx-auto max-w-6xl px-5 py-8 grid grid-cols-[56px_1fr] gap-6">
        {/* Left Purple Rail */}
        <aside className="rounded-lg bg-brand" aria-hidden />

        {/* Main Content */}
        <section className="space-y-8">
          {/* 입력 / 개선 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 광고 문구 입력 */}
            <Card title="광고 문구 입력" subtitle="삽입 가능한 텍스트 길이는 1000자 까지로 입력해 주세요.">
              <div className="flex flex-col gap-3">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="문구를 입력해 주세요"
                  className="w-full h-36 resize-none rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:ring-2 focus:ring-brand/30"
                />
                <div className="flex items-center justify-between">
                  <span className={over ? "text-xs text-red-500" : "text-xs text-gray-400"}>
                    {Math.max(0, remain).toString().padStart(4, "0")}/{MAX_LEN}
                  </span>
                  <button
                    onClick={handleAnalyze}
                    disabled={!text.trim() || over}
                    className="rounded-lg bg-brand px-4 py-2 text-white disabled:opacity-50"
                  >
                    검사하기
                  </button>
                </div>
              </div>
            </Card>

            {/* 개선된 문장 */}
            <Card title="개선된 문장" subtitle="초기 결과는 간단한 가이드로 제공될 예정입니다.">
              <div className="h-36 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600 overflow-auto">
                {improved ? (
                  <pre className="whitespace-pre-wrap font-sans">{improved}</pre>
                ) : (
                  <span className="text-gray-400">분석 후 개선 문장이 표시됩니다.</span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2 text-gray-400">
                <button
                  className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50"
                  onClick={() => improved && navigator.clipboard.writeText(improved)}
                >
                  복사
                </button>
                <button
                  className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50"
                  onClick={() => setImproved("")}
                >
                  초기화
                </button>
              </div>
            </Card>
          </div>

          {/* 문제점 */}
          <Card title="문제점">
            <div className="min-h-28 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">
              {issues.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {issues.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-400">분석 시 문제점이 표시됩니다.</span>
              )}
            </div>
          </Card>

          {/* 관련 법 조항 보기 */}
          <div>
            <button
              className="flex items-center gap-1 text-sm text-gray-700 hover:underline"
              onClick={() => setOpenLaw((v) => !v)}
              aria-expanded={openLaw}
            >
              관련 법 조항 보기 {openLaw ? "▲" : "▼"}
            </button>
            {openLaw && (
              <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                <p className="mb-2">(예시) 표시·광고의 공정화에 관한 법률 제○조</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>부당한 표시·광고 금지</li>
                  <li>과장·기만성 표현 제한</li>
                  <li>근거 제시 의무 등</li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/textune-logo.png" alt="Textune" width={110} height={28} />
          <span className="sr-only">Textune 홈</span>
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-sm font-medium text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}
