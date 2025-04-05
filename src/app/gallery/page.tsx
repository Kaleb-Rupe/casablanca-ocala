"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { InstagramPost } from "@/types/instagram";
import { fetchInstagramPosts } from "@/lib/services/instagram";
import GallerySkeleton from "@/components/gallery/GallerySkeleton";

export default function GalleryPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchInstagramPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error loading Instagram posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-darkGray mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Gallery
      </motion.h1>

      {loading ? (
        <GallerySkeleton />
      ) : (
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className={`relative rounded-xl overflow-hidden ${
                post.aspectRatio && post.aspectRatio > 1.2
                  ? "col-span-2"
                  : "col-span-1"
              } ${
                post.aspectRatio && post.aspectRatio > 1.5
                  ? "row-span-2"
                  : "row-span-1"
              }`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full group"
              >
                <Image
                  src={post.mediaUrl}
                  alt={post.caption || "Gallery image"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-sm md:text-base text-center line-clamp-3">
                    {post.caption}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
