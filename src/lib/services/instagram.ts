import { InstagramPost } from "@/types/instagram";

interface InstagramApiResponse {
  data: {
    id: string;
    caption?: string;
    media_url: string;
    permalink: string;
    media_type: string;
    timestamp: string;
  }[];
}

const INSTAGRAM_ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID;

export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );

    const data = (await response.json()) as InstagramApiResponse;

    // Process and transform the data
    const posts = await Promise.all(
      data.data.map(async (post) => {
        // Get image dimensions for aspect ratio
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
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.src = url;
  });
}
