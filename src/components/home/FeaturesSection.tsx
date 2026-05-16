"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPinned, Heart } from "lucide-react";

interface Feature {
  icon: typeof Sparkles;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Modern & move-in ready",
    description:
      "A bright open layout, fully equipped kitchen, hot tub on the patio, and four comfortable bedrooms that sleep up to eight.",
  },
  {
    icon: MapPinned,
    title: "Right next to everything",
    description:
      "Fort King District puts you minutes from Silver Springs, downtown Ocala, and a short drive to the World Equestrian Center.",
  },
  {
    icon: Heart,
    title: "Built for the whole crew",
    description:
      "Pet-friendly, family-friendly, and consistently rated 10/10 by guests on VRBO for cleanliness, check-in, and communication.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="my-16 md:my-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="text-sm font-medium text-coral tracking-wide uppercase mb-2">
            Why guests love it
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-darkGray">
            A retreat that just works
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="p-6 md:p-7 rounded-2xl bg-white shadow-sm border border-black/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-beige text-coral mb-4">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-darkGray mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
