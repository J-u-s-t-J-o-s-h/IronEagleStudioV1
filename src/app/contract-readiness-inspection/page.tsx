import type { Metadata } from "next";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContractReadinessPage from '@/components/sections/ContractReadinessInspection';

export const metadata: Metadata = {
  title: "Contract-Readiness Site Inspection | IronEagle Studio",
  description: "A professional evaluation of how your website and digital presence are interpreted by evaluators, partners, and external reviewers. Designed for regulated service providers and contractors.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContractReadinessInspectionPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContractReadinessPage />
      </main>
      <Footer />
    </>
  );
}
