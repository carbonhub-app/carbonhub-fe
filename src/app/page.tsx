import React from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";

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
        {/* <TeamSection /> */}
        {/* <FAQSection /> */}
        {/* <CTASection /> */}
      </main>

      <LandingFooter />
    </div>
  );
}
