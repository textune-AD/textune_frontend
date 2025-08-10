// hooks/useIsLoggedIn.ts
// 로그인 여부 훅 (임시 구현)
// - 실제 서비스에선 NextAuth 등으로 교체하세요.
// - 지금은 localStorage("textune:isAuthed") === "1"이면 로그인으로 간주

"use client";

import { useEffect, useState } from "react";

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const flag = localStorage.getItem("textune:isAuthed");
      setIsLoggedIn(flag === "1");
    } catch {}
  }, []);

  return isLoggedIn;
}