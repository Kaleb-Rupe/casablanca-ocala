export interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
  aspectRatio?: number;
}
