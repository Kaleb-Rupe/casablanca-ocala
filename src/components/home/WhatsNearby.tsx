"use client";

import { motion } from "framer-motion";
import { MapPin, Utensils, Plane } from "lucide-react";
import { nearbyCategories, type NearbyCategory } from "@/data/nearby";

const CATEGORY_ICONS: Record<NearbyCategory["id"], typeof MapPin> = {
  attractions: MapPin,
  food: Utensils,
  transport: Plane,
};

export default function WhatsNearby() {
  return (
    <section
      id="nearby"
      className="my-16 md:my-24"
      style={{ scrollMarginTop: "calc(var(--header-offset, 0px) + 24px)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="text-sm font-medium text-coral tracking-wide uppercase mb-2">
            The neighborhood
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-darkGray">
            What&apos;s nearby
          </h2>
          <p className="text-gray-600 mt-3">
            Located in Ocala&apos;s Fort King District — quiet streets, easy
            access to the springs, downtown, and the World Equestrian Center.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {nearbyCategories.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.id];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 md:p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-beige text-coral">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-darkGray">
                    {category.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-5">
                  {category.description}
                </p>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex justify-between gap-4 text-sm border-b border-dashed border-gray-200 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-medium text-darkGray">
                        {item.name}
                      </span>
                      <span className="text-gray-500 text-right shrink-0">
                        {item.distance}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
