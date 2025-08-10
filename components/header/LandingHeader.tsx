// components/header/LandingHeader.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LandingHeaderProps {
  logoSrc: string;
  logoAlt?: string;
}

export default function LandingHeader({
  logoSrc,
  logoAlt = "Textune Logo",
}: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/90 border-b border-gray-100">
      <div className="container mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoSrc} alt={logoAlt} width={120} height={28} priority />
          <span className="sr-only">Textune 홈</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}
