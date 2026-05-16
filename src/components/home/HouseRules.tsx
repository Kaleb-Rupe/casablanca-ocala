"use client";

import { motion } from "framer-motion";
import { Check, X, Clock, LogIn, LogOut } from "lucide-react";
import { houseRules, stayInfo } from "@/data/houseRules";

export default function HouseRules() {
  return (
    <section
      id="rules"
      className="my-16 md:my-24"
      style={{ scrollMarginTop: "calc(var(--header-offset, 0px) + 24px)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="text-sm font-medium text-coral tracking-wide uppercase mb-2">
            Good to know
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-darkGray">
            House rules &amp; stay info
          </h2>
          <p className="text-gray-600 mt-3">
            A few simple things to keep the home enjoyable for every guest.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="bg-beige rounded-2xl p-6 md:p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-coral">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg md:text-xl font-semibold text-darkGray">
                Check-in &amp; check-out
              </h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <LogIn className="h-4 w-4 text-coral" aria-hidden="true" />
                <span className="text-darkGray">
                  Check-in after{" "}
                  <span className="font-semibold">{stayInfo.checkIn}</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <LogOut className="h-4 w-4 text-coral" aria-hidden="true" />
                <span className="text-darkGray">
                  Check-out by{" "}
                  <span className="font-semibold">{stayInfo.checkOut}</span>
                </span>
              </li>
              <li className="text-gray-600 pt-2">
                Minimum age to rent:{" "}
                <span className="font-semibold text-darkGray">
                  {stayInfo.minAge}
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-2 bg-white rounded-2xl border border-black/5 shadow-sm p-6 md:p-7"
          >
            <h3 className="text-lg md:text-xl font-semibold text-darkGray mb-5">
              While you&apos;re here
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {houseRules.map((rule) => {
                const Icon = rule.positive ? Check : X;
                const tone = rule.positive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-500";
                return (
                  <li key={rule.text} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${tone}`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-darkGray leading-relaxed">
                      {rule.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
