"use client";

import React from "react";

export default function DashboardFooter() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} CarbonHub. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
