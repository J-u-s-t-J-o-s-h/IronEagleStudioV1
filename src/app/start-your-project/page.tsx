import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QuestionnaireForm from '@/components/questionnaire/QuestionnaireForm';

export const metadata: Metadata = {
  title: 'Start Your Website Project | Iron Eagle Studio',
  description:
    'Tell Iron Eagle Studio about your business, website goals, timeline, and budget. Complete the project discovery questionnaire to receive a practical recommendation for your next website or digital project.',
  alternates: {
    canonical: 'https://ironeaglestudio.com/start-your-project',
  },
  openGraph: {
    title: 'Start Your Website Project | Iron Eagle Studio',
    description:
      'Tell Iron Eagle Studio about your business, website goals, timeline, and budget. Complete the project discovery questionnaire to receive a practical recommendation.',
    url: 'https://ironeaglestudio.com/start-your-project',
    siteName: 'IronEagle Studio',
    type: 'website',
    locale: 'en_US',
  },
};

export default function StartYourProjectPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 mb-12">
          <p className="text-brass text-sm font-semibold uppercase tracking-widest mb-4">
            Project Discovery
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-off-white mb-4">
            Start Your Project
          </h1>
          <p className="text-slate text-lg leading-relaxed max-w-3xl">
            Share your business goals, content readiness, timeline, and budget. Iron Eagle Studio
            will review your answers and recommend the most practical website package or custom
            approach for your needs.
          </p>
        </div>
        <div className="px-6 md:px-8 lg:px-12">
          <QuestionnaireForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
