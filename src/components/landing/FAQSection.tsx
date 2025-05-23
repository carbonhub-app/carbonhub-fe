"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FaQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const faqItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const iconRefs = useRef<(SVGSVGElement | null)[]>([]);

  // Clear refs array on each render
  faqItemRefs.current = [];
  answerRefs.current = [];
  iconRefs.current = [];

  const faqItems = useMemo(
    () => [
      {
        question: "How do I start trading carbon credits?",
        answer:
          "Simply create an account, verify your company details, and explore available carbon credit options on our transparent marketplace. Start trading instantly with confidence.",
      },
      {
        question: "What information is required to list my company?",
        answer:
          "You'll need to provide valid company registration documents, verified emissions data, and compliance certificates to ensure transparency and trustworthiness.",
      },
      {
        question: "Can I track my carbon footprint progress?",
        answer:
          "Absolutely! Our platform offers real-time tracking dashboards so you can monitor emissions, trading activities, and rewards all in one place.",
      },
      {
        question: "Are there any fees for trading?",
        answer:
          "We offer a competitive fee structure with no hidden charges. Transaction fees vary based on trade volume and type; detailed info is available in your account dashboard.",
      },
      {
        question: "Is the platform secure and compliant?",
        answer:
          "Yes, CarbonHub uses blockchain technology to ensure transparent, tamper-proof transactions. We adhere to international standards for carbon trading compliance.",
      },
      {
        question: "How can I get support if I have questions?",
        answer:
          "Our dedicated support team is available via chat, email, and phone. Visit our Contact page to reach out anytime — we're here to help you succeed.",
      },
    ],
    []
  );

  useEffect(() => {
    // Section fade in
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // FAQ items stagger animation
    const validFaqItems = faqItemRefs.current.filter(
      (el) => el !== null
    ) as HTMLDivElement[];
    if (validFaqItems.length > 0) {
      gsap.fromTo(
        validFaqItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Hover effects for FAQ items
      validFaqItems.forEach((item) => {
        if (item) {
          const tl = gsap.timeline({ paused: true });
          tl.to(item, {
            scale: 1.025,
            boxShadow: "0 8px 32px rgba(80,80,180,0.10)",
            duration: 0.3,
            ease: "power1.inOut",
          });

          item.addEventListener("mouseenter", () => tl.play());
          item.addEventListener("mouseleave", () => tl.reverse());

          // Cleanup event listeners
          return () => {
            item.removeEventListener("mouseenter", () => tl.play());
            item.removeEventListener("mouseleave", () => tl.reverse());
            tl.kill();
          };
        }
      });
    }
  }, []);

  useEffect(() => {
    // Animate answer and icon when openIndex changes
    answerRefs.current.forEach((answerEl, index) => {
      const iconEl = iconRefs.current[index];
      if (answerEl && iconEl) {
        if (openIndex === index) {
          gsap.set(answerEl, { display: "block" }); // Ensure it's visible for height calculation
          gsap.to(answerEl, {
            opacity: 1,
            y: 0,
            height: "auto",
            duration: 0.35,
            ease: "power1.inOut",
          });
          gsap.to(iconEl, { rotate: 180, duration: 0.3, ease: "power1.inOut" });
        } else {
          gsap.to(answerEl, {
            opacity: 0,
            y: 10,
            height: 0,
            duration: 0.35,
            ease: "power1.inOut",
            onComplete: () => {
              if (answerEl) {
                gsap.set(answerEl, { display: "none" });
              }
            },
          });
          gsap.to(iconEl, { rotate: 0, duration: 0.3, ease: "power1.inOut" });
        }
      }
    });
  }, [openIndex, faqItems]); // Added faqItems to dependency array as answerRefs depends on it

  return (
    <div ref={sectionRef} className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-semibold text-primary text-center mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqItems.map(({ question, answer }, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el && !faqItemRefs.current.includes(el)) {
                faqItemRefs.current[index] = el;
              }
            }}
            className="rounded-lg bg-gradient-to-br from-indigo-50 to-white shadow-md"
          >
            <details
              // open={openIndex === index} // GSAP now controls visibility and open state
              className="group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setOpenIndex(openIndex === index ? null : index);
              }}
            >
              <summary className="flex items-center justify-between gap-2 rounded-lg p-5 text-gray-900 font-medium hover:bg-indigo-50 transition group-open:bg-indigo-100 select-none">
                {question}
                <svg
                  ref={(el) => {
                    if (el && !iconRefs.current.includes(el)) {
                      iconRefs.current[index] = el;
                    }
                  }}
                  className="w-6 h-6 shrink-0 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              {/* Apply a class for initial styling and use GSAP to animate these properties */}
              <p
                ref={(el) => {
                  if (el && !answerRefs.current.includes(el)) {
                    answerRefs.current[index] = el;
                  }
                }}
                className="faq-answer mt-4 px-4 pb-4 leading-relaxed text-black"
              >
                {answer}
              </p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaQ;
