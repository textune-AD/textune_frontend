// hooks/useTryGate.ts
// 재사용 가능한 시도 제한 훅
// - 로그인 사용자는 제한 없음
// - 게스트(미로그인)만 limit 적용
// - 시도 초과 시 콜백(onBlocked) 실행 (예: 로그인 페이지로 이동)

"use client";

import { useEffect, useState } from "react";

export interface UseTryGateOptions {
  limit: number;
  storageKey: string;
  isLoggedIn: boolean;
  onBlocked?: () => void;
}

export default function useTryGate({ limit, storageKey, isLoggedIn, onBlocked }: UseTryGateOptions) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setCount(raw ? Math.max(0, parseInt(raw)) : 0);
    } catch {}
  }, [storageKey]);

  const canProceed = isLoggedIn || count < limit;
  const remain = isLoggedIn ? Infinity : Math.max(0, limit - count);

  /** 시도 1회 기록 (게스트만 카운팅) */
  const noteAttempt = () => {
    if (isLoggedIn) return; // 로그인 유저는 카운트 제외
    const next = count + 1;
    setCount(next);
    try { localStorage.setItem(storageKey, String(next)); } catch {}
  };

  /** 보호 래퍼: 초과 시 onBlocked 실행, 아니면 시도 기록 후 fn 실행 */
  const guard = async (fn: () => Promise<void> | void) => {
    if (!isLoggedIn && count >= limit) {
      onBlocked?.();
      return;
    }
    noteAttempt();
    await fn();
  };

  /** 리셋 (예: 일일 제한 초기화 등) */
  const reset = () => {
    setCount(0);
    try { localStorage.removeItem(storageKey); } catch {}
  };

  return { count, remain, canProceed, noteAttempt, guard, reset };
}
