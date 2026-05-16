import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { put } from "@vercel/blob";
import { config } from "dotenv";

config({
  path: fileURLToPath(new URL("../.env.local", import.meta.url)),
});
config(); // fallback to default .env if present

const PUBLIC_ROOT = fileURLToPath(new URL("../public/", import.meta.url));
const UPLOAD_TREES = [
  { dirName: "images", keyPrefix: "images" },
  { dirName: "videos", keyPrefix: "videos" },
];

const CONTENT_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

function getContentType(file: string) {
  const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

async function uploadFile(localPath: string, cloudKey: string) {
  const buffer = await readFile(localPath);

  try {
    const blob = await put(cloudKey, buffer, {
      access: "public",
      contentType: getContentType(localPath),
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    console.log(`${cloudKey} => ${blob.url}`);
  } catch (error) {
    if (
      error instanceof Error &&
      /allowOverwrite/.test(error.message ?? "")
    ) {
      console.log(`Skipped (exists): ${cloudKey}`);
      return;
    }

    throw error;
  }
}

async function uploadTree(currentDir: string, keyPrefix: string) {
  let entries;
  try {
    entries = await readdir(currentDir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log(`Skipping ${keyPrefix}/ — directory does not exist`);
      return;
    }
    throw error;
  }

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;

    const fullPath = join(currentDir, entry.name);
    const nextKey = `${keyPrefix}/${entry.name}`;

    if (entry.isDirectory()) {
      await uploadTree(fullPath, nextKey);
      continue;
    }

    await uploadFile(fullPath, nextKey);
  }
}

async function main() {
  for (const { dirName, keyPrefix } of UPLOAD_TREES) {
    console.log(`\nUploading ${dirName}/...`);
    await uploadTree(join(PUBLIC_ROOT, dirName), keyPrefix);
  }
}

main().catch((error) => {
  console.error("Upload failed:", error);
  process.exit(1);
});
