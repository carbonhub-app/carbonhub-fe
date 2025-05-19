import gsap from "gsap";

// Util function to create a fade in animation
export const fadeIn = (
  element: HTMLElement,
  duration: number = 1,
  delay: number = 0
) => {
  return gsap.from(element, {
    opacity: 0,
    y: 20,
    duration,
    delay,
    ease: "power3.out",
  });
};

// Util function to create a fade out animation
export const fadeOut = (
  element: HTMLElement,
  duration: number = 1,
  delay: number = 0
) => {
  return gsap.to(element, {
    opacity: 0,
    y: -20,
    duration,
    delay,
    ease: "power3.in",
  });
};

// Stagger animation for lists
export const staggerFadeIn = (
  elements: HTMLElement[],
  duration: number = 0.5,
  stagger: number = 0.1
) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 20,
    duration,
    stagger,
    ease: "power3.out",
  });
};

// Scale animation
export const scaleIn = (
  element: HTMLElement,
  duration: number = 0.5,
  delay: number = 0
) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration,
    delay,
    ease: "back.out(1.7)",
  });
};

// Custom timeline creator for complex animations
export const createTimeline = (defaults = {}) => {
  return gsap.timeline({ defaults });
};
