"use client";

import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Luxury Amenities",
    description:
      "Enjoy premium features including a private pool, fully equipped kitchen, and smart home technology.",
  },
  {
    title: "Prime Location",
    description:
      "Located in the heart of Ocala, minutes away from World Equestrian Center and top attractions.",
  },
  {
    title: "Professional Service",
    description:
      "24/7 support and concierge services to ensure a comfortable and memorable stay.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="grid md:grid-cols-3 gap-8 my-16">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="p-6 rounded-lg bg-white shadow-md"
        >
          <h3 className="text-xl font-bold text-coral mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </section>
  );
}
