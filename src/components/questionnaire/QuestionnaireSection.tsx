'use client';

import { ReactNode } from 'react';

interface QuestionnaireSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function QuestionnaireSection({
  id,
  title,
  description,
  children,
}: QuestionnaireSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border border-gunmetal bg-deep-navy/70 p-6 md:p-8 scroll-mt-28"
    >
      <h2 id={`${id}-heading`} className="text-xl md:text-2xl font-semibold text-off-white mb-2">
        {title}
      </h2>
      {description ? (
        <p className="text-slate text-sm mb-6 leading-relaxed">{description}</p>
      ) : (
        <div className="mb-6" />
      )}
      <div className="space-y-6">{children}</div>
    </section>
  );
}
