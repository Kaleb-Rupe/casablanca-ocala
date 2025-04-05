"use client";

import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  platform: "Airbnb" | "VRBO";
  date: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <section className="py-12 my-16">
      <div className="w-full">
        <h2 className="text-3xl font-bold text-darkGray mb-8">Guest Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-sm text-gray-500">{review.platform}</p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
              <p className="text-sm text-gray-500 mt-4">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
