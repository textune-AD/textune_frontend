// app/home/page.tsx
// 홈 화면 - 구조화 + UX 개선
// - 훅/컴포넌트 분리(import)
// - 게스트 일일 3회 제한 (날짜 기준으로 리셋)
// - 차단 시 onBlocked 콜백으로 안내 후 /login 이동
// - "관련 법 조항" 토글 상태 localStorage에 저장/복원
// - 분석 로딩 상태, 버튼 디스에이블, 에러 핸들링 틀 추가

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import useTryGate from "@/hooks/useTryGate";
import Header from "@/components/home/Header";
import AnalyzeInputCard from "@/components/home/AnalyzeInputCard";
import ResultCard from "@/components/home/ResultCard";
import Card from "@/components/home/Card";

const MAX_LEN = 1000;
const GUEST_TRY_LIMIT = 3;
const LAW_TOGGLE_KEY = "textune:home:lawOpen";

function todayKey(base: string) {
  const d = new Date();
  const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return `${base}:${ds}`;
}

export default function HomePage() {
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();

  const [text, setText] = useState("");
  const [improved, setImproved] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [openLaw, setOpenLaw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 게이트: 일일 제한 키 사용
  const gate = useTryGate({
    limit: GUEST_TRY_LIMIT,
    storageKey: todayKey("textune:home:tries"),
    isLoggedIn,
    onBlocked: () => {
      alert("로그인이 필요합니다! 계속하려면 로그인해 주세요.");
      router.push("/login");
    },
  });

  const remainChars = useMemo(() => MAX_LEN - text.length, [text.length]);
  const overLimit = remainChars < 0;

  // 법 조항 토글 상태 복원
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAW_TOGGLE_KEY);
      setOpenLaw(raw === "1");
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LAW_TOGGLE_KEY, openLaw ? "1" : "0");
    } catch {}
  }, [openLaw]);

  const handleAnalyze = async () => {
    setError(null);
    await gate.guard(async () => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setLoading(true);
      try {
        // TODO: 실제 API 호출로 교체
        await new Promise((r) => setTimeout(r, 600)); // demo latency
        setImproved(`${trimmed}\n\n(예시) 더 명확하게 다듬은 문장입니다.`);
        setIssues(["과장/확정적 표현 가능성", "근거 미표기"]);
      } catch (e: any) {
        setError(e?.message ?? "분석 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <div className="mx-auto max-w-6xl px-5 py-8 grid grid-cols-[56px_1fr] gap-6">
        {/* Left Purple Rail */}
        <aside className="rounded-lg bg-brand" aria-hidden />

        {/* Main Content */}
        <section className="space-y-8">
          {/* 안내/에러 배너 */}
          {!isLoggedIn && (
            <div className="rounded-lg border border-brand/30 bg-brand/5 px-3 py-2 text-xs text-gray-700">
              게스트 이용은 하루 {GUEST_TRY_LIMIT}회까지 가능합니다. 남은 횟수: <span className="font-medium">{Number.isFinite(gate.remain) ? gate.remain : 0}</span>
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* 입력 / 개선 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalyzeInputCard
              title="광고 문구 입력"
              subtitle="삽입 가능한 텍스트 길이는 1000자 까지로 입력해 주세요."
              value={text}
              onChange={setText}
              remainChars={remainChars}
              overLimit={overLimit}
              onAnalyze={handleAnalyze}
              hint={isLoggedIn ? undefined : `남은 횟수: ${Number.isFinite(gate.remain) ? gate.remain : 0}`}
            />

            <ResultCard
              title="개선된 문장"
              subtitle={loading ? "분석 중입니다…" : "초기 결과는 간단한 가이드로 제공될 예정입니다."}
              result={loading ? "" : improved}
              onCopy={() => improved && navigator.clipboard.writeText(improved)}
              onClear={() => setImproved("")}
            />
          </div>

          <Card title="문제점">
            <div className="min-h-28 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">
              {loading ? (
                <span className="text-gray-400">분석 중…</span>
              ) : issues.length ? (
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
