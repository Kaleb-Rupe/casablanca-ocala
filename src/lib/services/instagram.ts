import { InstagramPost } from "@/types/instagram";

interface InstagramApiResponse {
  data?: {
    id: string;
    caption?: string;
    media_url: string;
    permalink: string;
    media_type: string;
    timestamp: string;
  }[];
  error?: {
    message: string;
    type?: string;
    code?: number;
  };
}

const INSTAGRAM_ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID;

export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  // No env vars → skip the network call entirely.
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
    return [];
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      console.warn(
        `Instagram API returned ${response.status}; rendering empty feed.`
      );
      return [];
    }

    const payload = (await response.json()) as InstagramApiResponse;

    if (payload.error) {
      console.warn("Instagram API error:", payload.error.message);
      return [];
    }

    if (!Array.isArray(payload.data)) {
      return [];
    }

    const posts = await Promise.all(
      payload.data.map(async (post) => {
        const dimensions = await getImageDimensions(post.media_url);
        return {
          id: post.id,
          mediaUrl: post.media_url,
          caption: post.caption || "",
          permalink: post.permalink,
          mediaType: post.media_type as "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM",
          timestamp: post.timestamp,
          aspectRatio: dimensions.width / dimensions.height,
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return [];
  }
}

async function getImageDimensions(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      resolve({ width: 1, height: 1 });
    };
    img.src = url;
  });
}
