"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FaQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How do I start trading carbon credits?",
      answer:
        "Simply create an account, verify your company details, and explore available carbon credit options on our transparent marketplace. Start trading instantly with confidence.",
    },
    {
      question: "What information is required to list my company?",
      answer:
        "You’ll need to provide valid company registration documents, verified emissions data, and compliance certificates to ensure transparency and trustworthiness.",
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
        "Our dedicated support team is available via chat, email, and phone. Visit our Contact page to reach out anytime — we’re here to help you succeed.",
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto py-12 px-4 space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.3, once: true }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-semibold text-primary text-center mb-8">
        Frequently Asked Questions
      </h1>

      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {faqItems.map(({ question, answer }, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.025, boxShadow: "0 8px 32px rgba(80,80,180,0.10)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="rounded-lg bg-gradient-to-br from-indigo-50 to-white shadow-md"
          >
            <details
              open={openIndex === index}
              className="group cursor-pointer"
              onClick={e => {
                e.preventDefault();
                setOpenIndex(openIndex === index ? null : index);
              }}
            >
              <summary className="flex items-center justify-between gap-2 rounded-lg p-5 text-gray-900 font-medium hover:bg-indigo-50 transition group-open:bg-indigo-100 select-none">
                {question}
                <motion.svg
                  className="w-6 h-6 shrink-0 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </summary>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.p
                    key="content"
                    className="mt-4 px-4 pb-4 leading-relaxed text-black"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                  >
                    {answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </details>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FaQ;