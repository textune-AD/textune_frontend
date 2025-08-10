// components/home/Header.tsx
// 홈 페이지 상단 헤더: 로고 + 로그인 버튼
// - 기본 로고 경로는 /assets/textune-logo.png (public 폴더 기준)
// - 필요시 props로 치환 가능

import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface HomeHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  rightSlot?: React.ReactNode; // 커스텀 액션 삽입용
}

export default function Header({
  logoSrc = "/assets/textune-logo.png",
  logoAlt = "Textune",
  rightSlot,
}: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoSrc} alt={logoAlt} width={110} height={28} priority />
          <span className="sr-only">Textune 홈</span>
        </Link>

        {rightSlot ?? (
          <Link
            href="/login"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}