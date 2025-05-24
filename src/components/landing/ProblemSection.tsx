"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image"; // Impor komponen Image
import MarqueeSection from "./MarqueeSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const problemItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const currentSectionRef = sectionRef.current;
    const problems = problemItemsRef.current.filter(
      Boolean
    ) as HTMLDivElement[];

    if (!currentSectionRef || problems.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      // Animate the main section title and paragraph
      gsap.fromTo(
        ".problem-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: currentSectionRef,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".problem-description",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: currentSectionRef,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      problems.forEach((item) => {
        // Animate the entire problem item card with zoom in/out effect
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1.5, // Scale up to 1.5 when in viewport
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse", // Show on enter, hide only when leaving bottom, stay visible when leaving top
              scrub: false, // Discrete animation, not scrubbed
            },
          }
        );
      });
    }, currentSectionRef);

    return () => ctx.revert();
  }, []);

  const problemItemsData = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      title: "Cost & Complexity",
      description:
        "Traditional carbon management systems are expensive to implement and complex to maintain, requiring specialized knowledge.",
      imageSrc: "/card/cost-and-complexity.jpg", // Path gambar diperbarui
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: "Data Transparency",
      description:
        "Lack of real-time data and transparency makes it difficult to make informed decisions about carbon credit trading.",
      imageSrc: "/card/data-transparency.jpg", // Path gambar diperbarui
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
      ),
      title: "Market Inefficiency",
      description:
        "Fragmented carbon markets create inefficiencies, leading to higher costs and missed opportunities for businesses.",
      imageSrc: "/card/market-inefficiency.jpg", // Path gambar diperbarui
    },
  ];

  return (
    <>
      <MarqueeSection />

      <section
        id="problem"
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="relative pt-20 pb-24 bg-transparent dark:bg-transparent overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-32">
            <h2 className="problem-title text-3xl md:text-4xl font-bold mb-6 text-white dark:text-white">
              The Carbon Management Challenge
            </h2>
            <p className="problem-description text-lg text-slate-300 dark:text-slate-400">
              Companies face significant hurdles in managing their carbon
              footprint while meeting sustainability goals.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 gap-16 md:gap-20 relative z-10 max-w-5xl mx-auto">
              {problemItemsData.map((item, index) => (
                <div
                  key={item.title}
                  ref={(el) => {
                    problemItemsRef.current[index] = el;
                  }}
                  className="problem-item backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl w-full mx-auto transform-gpu"
                >
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    {/* Image Container */}
                    <div className="relative w-full lg:w-80 h-56 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/5 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl" // Pastikan gambar juga memiliki sudut membulat jika diperlukan
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex flex-col items-center lg:items-start gap-4">
                        <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center backdrop-blur-sm">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-white">
                            {item.title}
                          </h3>
                          <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            {item.description}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                          >
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
