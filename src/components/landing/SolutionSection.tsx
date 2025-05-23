"use client";

import React from "react";

export default function SolutionSection() {
  return (
    <section id="solution" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Solution</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            CarbonHub provides a comprehensive platform for managing,
            monitoring, and trading carbon credits with ease.
          </p>
        </div>

        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <div className="inline-block text-primary font-medium mb-3">
              Real-time Dashboard
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Monitor Your Carbon Footprint
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Get a comprehensive view of your carbon usage and credits with
              real-time data visualization. Track your progress toward
              sustainability goals and identify areas for improvement.
            </p>
            <ul className="space-y-2">
              {[
                "Live carbon quota updates",
                "Historical usage patterns",
                "Goal tracking and alerts",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-6 w-6 text-primary flex-shrink-0 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-tr from-primary/20 to-primary/5 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-slate-400">
              {/* Placeholder for dashboard visualization */}
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
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-slate-400">
              {/* Placeholder for trading platform visualization */}
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
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-block text-primary font-medium mb-3">
              Trading Platform
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Buy and Sell Carbon Credits
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Our streamlined trading platform makes it easy to buy and sell
              carbon credits with real-time market data and automated matching.
            </p>
            <ul className="space-y-2">
              {[
                "Market-based pricing",
                "Secure transactions",
                "Transaction history and reporting",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-6 w-6 text-primary flex-shrink-0 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block text-primary font-medium mb-3">
              Analytics & Reporting
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Make Data-Driven Decisions
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Powerful analytics tools help you understand your carbon usage
              patterns and make informed decisions about trading and
              sustainability initiatives.
            </p>
            <ul className="space-y-2">
              {["Custom reports", "Trend analysis", "Export capabilities"].map(
                (item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary flex-shrink-0 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="bg-gradient-to-tr from-primary/20 to-primary/5 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-slate-400">
              {/* Placeholder for analytics visualization */}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
