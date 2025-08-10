// app/landing/page.tsx
// Single-file landing page that matches the provided wireframe.
// Uses Tailwind CSS. No external UI libs required.

import React from "react";
import Link from "next/link";
import LandingHeader from "@/components/header/LandingHeader";

export const metadata = {
  title: "Textune — 온보딩",
  description: "표시광고법을 책임지는 새로운 서비스",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900">
      <LandingHeader logoSrc="/assets/textune-logo.svg" />

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-5 pt-16 pb-20">
        <div className="grid grid-cols-1 gap-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            <span className="inline-block bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
              표시광고법을 책임지는 새로운 서비스
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            모든 문장을 입력해서 간편하게 확인해보세요!
          </p>
          <div>
            <Link
              href="/home"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium bg-brand text-white shadow-md hover:shadow-lg hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 transition"
            >
              textune 체험해보기
            </Link>
          </div>
        </div>
      </section>

      {/* 카드 섹션 */}
      <section className="bg-gray-50">
        <div className="container mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center text-sm sm:text-base font-medium text-gray-700">
            어떤 문구가 위험한지 모르겠다면?
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white h-44 sm:h-48 md:h-52 shadow-sm flex items-center justify-center text-gray-400"
                aria-label={`예시 카드 ${i}`}
              >
                (예시 카드 {i})
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 하이라이트 섹션 */}
      <section className="container mx-auto max-w-6xl px-5 py-16">
        <h3 className="text-center text-sm sm:text-base font-medium text-gray-700">
          Textune은 아주 쉽게 사용할 수 있어요!
        </h3>
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 h-56 sm:h-64 md:h-72 shadow-inner flex items-center justify-center text-gray-400">
          (데모 / 스크린샷 자리)
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-gray-50">
        <div className="container mx-auto max-w-6xl px-5 py-16 text-center">
          <h4 className="text-sm sm:text-base font-medium text-gray-800">
            내 환경 설정부터 가기
          </h4>
          <div className="mt-5">
            <Link
              href="/plan"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              시작하기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/90 border-b border-gray-100">
      <div className="container mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-gray-900">
          <span className="sr-only">Textune 홈</span>
          <span className="text-lg">Textune</span>
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

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-5 py-10 grid gap-6 sm:grid-cols-2">
        <div className="text-xs text-gray-500 space-y-2">
          <p>서비스 소개 · 이용약관</p>
          <p>© 2025 Textune Inc. All rights reserved.</p>
        </div>
        <div className="sm:text-right">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 w-9 h-9 hover:bg-white"
            aria-label="Instagram"
          >
            {/* Simple IG glyph */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
