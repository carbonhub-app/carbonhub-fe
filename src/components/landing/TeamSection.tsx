"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const team = [
  {
    avatar: "https://imgur.com/GidbcdB.jpg",
    name: "Jihan Aurelia",
    title: "Frontend Developer",
    linkedin: "https://www.linkedin.com/in/jihanaurelia/",
    github: "https://github.com/jijiau",
  },
  {
    avatar: "https://i.imgur.com/3VujJJ3.jpg",
    name: "Serenada Cinta",
    title: "UI/UX Designer",
    linkedin: "https://www.linkedin.com/in/serenada-cinta-sunindyo-77aa55283/",
    github: "https://github.com/Serenadacinta",
  },
  {
    avatar: "https://i.imgur.com/3VujJJ3.jpg", // Assuming this is a placeholder and should be different
    name: "Aththariq Lisan",
    title: "Frontend Developer",
    linkedin: "https://www.linkedin.com/in/aththariqlisan/",
    github: "https://github.com/aththariq",
  },
  {
    avatar: "https://imgur.com/gzPRLy3.jpg",
    name: "Nasywaa Anggun",
    title: "Backend Developer",
    linkedin: "https://www.linkedin.com/in/nasywaa-anggun-athiefah/",
    github: "https://github.com/nasywaanaa",
  },
  {
    avatar: "https://imgur.com/6RA9RL6.jpg",
    name: "Muhammad Faiz",
    title: "Backend Developer",
    linkedin: "", // Empty LinkedIn
    github: "https://github.com/faizathr",
  },
];

const Team: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const teamListRef = useRef<HTMLUListElement>(null);
  const teamItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Clear refs array on each render
  teamItemRefs.current = [];

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const paragraphEl = paragraphRef.current;
    const teamListEl = teamListRef.current;
    const validTeamItems = teamItemRefs.current.filter(
      (el) => el !== null
    ) as HTMLLIElement[];

    if (sectionEl) {
      gsap.fromTo(
        sectionEl,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    if (titleEl) {
      gsap.fromTo(
        titleEl,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2, // Stagger after section appears
          scrollTrigger: {
            trigger: titleEl,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    if (paragraphEl) {
      gsap.fromTo(
        paragraphEl,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4, // Stagger after title
          scrollTrigger: {
            trigger: paragraphEl,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    if (teamListEl && validTeamItems.length > 0) {
      gsap.fromTo(
        validTeamItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          delay: 0.6, // Stagger after paragraph
          scrollTrigger: {
            trigger: teamListEl,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-14 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl mx-auto">
          <h3
            ref={titleRef}
            className="text-gray-900 text-3xl font-semibold sm:text-4xl text-center"
          >
            Meet the CarbonHub Team!
          </h3>
          <p
            ref={paragraphRef}
            className="text-gray-600 mt-3 text-center max-w-md mx-auto"
          >
            Driven by passion and innovation, we create cutting-edge,
            transparent, and user-friendly carbon trading solutions that empower
            a sustainable future.
          </p>
        </div>

        <ul
          ref={teamListRef}
          className="mt-12 flex flex-wrap justify-center gap-12"
        >
          {team.map((member, idx) => (
            <li
              key={idx}
              ref={(el) => {
                if (el && !teamItemRefs.current.includes(el)) {
                  teamItemRefs.current[idx] = el;
                }
              }}
              className="flex flex-col items-center w-48"
            >
              <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg border-2 border-indigo-600">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  priority={idx < 3} // Keep priority for above-the-fold images if applicable
                  sizes="96px"
                />
              </div>
              <div className="text-center">
                <h4 className="text-gray-800 font-semibold text-lg">
                  {member.name}
                </h4>
                <p className="text-indigo-600">{member.title}</p>
                <div className="mt-3 flex justify-center gap-5 text-gray-400">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className="hover:text-indigo-500 transition"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 16.299 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="hover:text-indigo-500 transition"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none" // Changed to none as the path has fill="currentColor"
                        stroke="currentColor" // Added stroke for consistency if needed, or ensure path has fill
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_17_68)">
                          <path
                            fill="currentColor"
                            d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_17_68">
                            <path fill="currentColor" d="M0 0h48v48H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;
