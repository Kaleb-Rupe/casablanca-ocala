"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Instagram, ArrowUpRight, Images, Film } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { InstagramPost } from "@/types/instagram";
import { fetchInstagramPosts } from "@/lib/services/instagram";

const INSTAGRAM_HANDLE = "casablanca_ocala";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
const MAX_POSTS = 8;

function InstagramHeader() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-darkGray/50 mb-2">
          From the feed
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-darkGray">
          @{INSTAGRAM_HANDLE}
        </h2>
        <p className="text-sm text-darkGray/60 mt-2 max-w-md">
          Recent moments from the house and the neighborhood — follow along.
        </p>
      </div>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start md:self-auto rounded-full border border-darkGray/15 bg-white px-4 py-2 text-sm font-medium text-darkGray transition hover:border-coral hover:text-coral"
      >
        <Instagram className="h-4 w-4" aria-hidden="true" />
        View profile
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-darkGray/10 bg-gradient-to-br from-beige via-white to-beige/50 p-10 md:p-14 text-center">
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-coral/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-navy/10 blur-3xl" aria-hidden="true" />

      <div className="relative">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-coral text-white shadow-lg shadow-coral/30 mb-5">
          <Instagram className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-darkGray mb-2">
          Follow @{INSTAGRAM_HANDLE}
        </h3>
        <p className="text-darkGray/70 max-w-md mx-auto mb-6">
          We share guest moments, seasonal updates, and behind-the-scenes from
          the property over on Instagram.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-darkGray text-white px-6 py-3 text-sm font-semibold transition hover:bg-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
        >
          Open Instagram
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function PostBadge({ mediaType }: { mediaType: InstagramPost["mediaType"] }) {
  if (mediaType === "IMAGE") return null;
  const Icon = mediaType === "VIDEO" ? Film : Images;
  return (
    <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
      <Icon className="h-3.5 w-3.5 text-white" aria-hidden="true" />
    </span>
  );
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchInstagramPosts();
        if (!cancelled) setPosts(data.slice(0, MAX_POSTS));
      } catch (error) {
        console.error("Instagram fetch failed:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mt-16 md:mt-24">
      <InstagramHeader />

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-darkGray/5 animate-pulse"
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {posts.map((post) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-darkGray/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
              aria-label={post.caption ? `View Instagram post: ${post.caption.slice(0, 80)}` : "View Instagram post"}
            >
              <Image
                src={post.mediaUrl}
                alt={post.caption || "Instagram post"}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <PostBadge mediaType={post.mediaType} />
              {post.caption && (
                <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-white text-xs line-clamp-2 leading-snug">
                    {post.caption}
                  </p>
                </div>
              )}
            </motion.a>
          ))}
        </motion.div>
      )}
    </section>
  );
}
