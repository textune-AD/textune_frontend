// components/home/Card.tsx
// 공통 카드 래퍼: 섹션 제목/서브타이틀 + 내용

import React from "react";

export default function Card({
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