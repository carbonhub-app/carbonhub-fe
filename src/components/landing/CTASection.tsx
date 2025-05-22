"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import deviceCTA from "@/assets/images/ok.jpg"; // Adjust path if needed
import { IoIosCall } from "react-icons/io";

const CTASection: React.FC = () => {
  return (
    <div className="pb-14 pt-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-50 to-gray-100 rounded-[2rem] border border-gray-200/50 overflow-hidden px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Section */}
            <div className="md:w-1/2 p-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight text-gray-900">
                Explore Carbon Trading Insights{" "}
                <br className="hidden md:block" /> for Your Company
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Access detailed carbon trading data and monitor{" "}
                <br className="hidden md:block" /> your company’s environmental
                impact on our transparent marketplace.
              </p>{" "}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/carbon-trading"
                  className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-dark transition duration-300 text-center block"
                >
                  View Carbon Trading
                </Link>
                <Link
                  href="/contact"
                  className="bg-slate-200 text-gray-800 px-8 py-3 rounded-md font-medium hover:bg-slate-300 transition duration-300 text-center flex items-center justify-center gap-2"
                >
                  Contact Support <IoIosCall className="text-xl" />
                </Link>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 p-6 flex justify-center md:justify-end">
              <Image
                src={deviceCTA}
                alt="FitFlo Dashboard"
                className="max-w-full h-auto rounded-lg shadow-xl transform translate-y-17"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
