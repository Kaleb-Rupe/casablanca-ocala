import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { put } from "@vercel/blob";
import { config } from "dotenv";

config({
  path: fileURLToPath(new URL("../.env.local", import.meta.url)),
});
config(); // fallback to default .env if present

const PUBLIC_DIR = new URL("../public/images", import.meta.url);

function getContentType(file: string) {
  return file.endsWith(".webp") ? "image/webp" : "image/jpeg";
}

async function uploadFile(localPath: string, cloudKey: string) {
  const buffer = await readFile(localPath);
  const relativePath = relative(PUBLIC_DIR.pathname, localPath);

  try {
    const blob = await put(cloudKey, buffer, {
      access: "public",
      contentType: getContentType(localPath),
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    console.log(`${relativePath} => ${blob.url}`);
  } catch (error) {
    if (
      error instanceof Error &&
      /allowOverwrite/.test(error.message ?? "") // blob already exists
    ) {
      console.log(`Skipped (exists): ${relativePath}`);
      return;
    }

    throw error;
  }
}

async function uploadAll(currentDir = PUBLIC_DIR.pathname, prefix = "") {
  const entries = await readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;

    const fullPath = join(currentDir, entry.name);
    const nextPrefix = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      await uploadAll(fullPath, nextPrefix);
      continue;
    }

    const cloudKey = `images/${nextPrefix}`;
    await uploadFile(fullPath, cloudKey);
  }
}

async function main() {
  await uploadAll();
}

main().catch((error) => {
  console.error("Upload failed:", error);
  process.exit(1);
});
