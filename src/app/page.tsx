import React from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import CTASection from "@/components/landing/CTASection";
import TeamSection from "@/components/landing/TeamSection";
import FAQSection from "@/components/landing/FAQSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />

      <main className="flex-grow">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        {/* Additional sections would be added here */}
        {/* <TestimonialsSection /> */}
        <TeamSection />
        <FAQSection />
        <CTASection />
      </main>

      <LandingFooter />
    </div>
  );
}
