"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { FiCheck } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;

    if (!container || !cards) return;

    const containerWidth = container.clientWidth;
    const cardsWidth = cards.scrollWidth;
    const maxShift = Math.max(0, cardsWidth - containerWidth + 64); // +64 for padding

    // Set up horizontal scroll animation
    const scrollTween = gsap.to(cards, {
      x: -maxShift,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`, // Longer scroll duration
        invalidateOnRefresh: true,
      },
    });

    // Add hover animations for cards
    const cardElements = Array.from(cards.children) as HTMLElement[];
    const hoverAnimations: gsap.core.Timeline[] = [];

    cardElements.forEach((card, index) => {
      const tl = gsap.timeline({ paused: true });
      tl.to(card, {
        y: -15,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });

      hoverAnimations[index] = tl;

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Clean up hover animations
      cardElements.forEach((card, index) => {
        const tl = hoverAnimations[index];
        if (tl) {
          card.removeEventListener("mouseenter", () => tl.play());
          card.removeEventListener("mouseleave", () => tl.reverse());
          tl.kill();
        }
      });
    };
  }, []);

  const features = [
    {
      category: "Real-time Dashboard",
      title: "Monitor Your Carbon Footprint",
      description:
        "Get a comprehensive view of your carbon usage and credits with real-time data visualization. Track your progress toward sustainability goals and identify areas for improvement.",
      items: [
        "Live carbon quota updates",
        "Historical usage patterns",
        "Goal tracking and alerts",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          <circle cx="12" cy="10" r="4"></circle>
          <path d="M12 6v8"></path>
          <path d="M8 10h8"></path>
        </svg>
      ),
    },
    {
      category: "Trading Platform",
      title: "Buy and Sell Carbon Credits",
      description:
        "Our streamlined trading platform makes it easy to buy and sell carbon credits with real-time market data and automated matching.",
      items: [
        "Market-based pricing",
        "Secure transactions",
        "Transaction history and reporting",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      category: "Analytics & Reporting",
      title: "Make Data-Driven Decisions",
      description:
        "Powerful analytics tools help you understand your carbon usage patterns and make informed decisions about trading and sustainability initiatives.",
      items: ["Custom reports", "Trend analysis", "Export capabilities"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
    },
    {
      category: "Compliance & Certification",
      title: "Streamline Your Journey to Carbon Neutrality",
      description:
        "Automate compliance and verify your carbon efforts to streamline your path to carbon neutrality. Easily meet global standards and gain industry credibility.",
      items: [
        "Automated reporting templates",
        "Certification readiness checks",
        "Audit trail and verification support",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12l2 2 4-4"></path>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
          <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
        </svg>
      ),
    },
    {
      category: "Project Development & Portfolio Management",
      title: "Develop and Manage Your Carbon Reduction Projects",
      description:
        "Our centralized, AI-powered platform helps you efficiently manage and develop carbon reduction projects, optimizing your portfolio for maximum environmental impact.",
      items: [
        "Project lifecycle tracking",
        "AI-driven resource allocation tools",
        "Impact assessment & optimization",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"></path>
          <path d="M8 11l2 2 4-4"></path>
        </svg>
      ),
    },
    {
      category: "Expert Consultation & Support",
      title: "Access Dedicated Carbon Management Experts",
      description:
        "Gain access to a dedicated team of carbon management experts. Supported by AI, they offer personalized guidance and data-driven insights on global markets and regulations.",
      items: [
        "Personalized expert consultations",
        "AI-enhanced market insights",
        "Regulatory compliance advice",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="solution" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Solution</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            CarbonHub provides a comprehensive platform for managing,
            monitoring, and trading carbon credits with ease.
          </p>
        </div>

        <div ref={containerRef} className="relative h-screen flex items-center">
          <div className="w-full overflow-visible">
            <div ref={cardsRef} className="flex gap-8 min-w-max pl-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-8 w-96 flex-shrink-0"
                >
                  <div className="bg-gradient-to-tr from-primary/20 to-primary/5 rounded-lg aspect-video flex items-center justify-center mb-6">
                    <div className="text-slate-400">{feature.icon}</div>
                  </div>

                  <Badge
                    variant="outline"
                    className="mb-3 border-primary/50 text-primary bg-primary/10"
                  >
                    {feature.category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <FiCheck className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
