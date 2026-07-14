/**
 * Generate Iron Eagle Studio production favicon / app-icon pack.
 *
 * Source of truth (2026-07-14):
 * Eagle mark cropped from public/logos/logo.svg (wordmark excluded),
 * composited on deep navy #0B1120.
 *
 * Do not use:
 * - full landscape logo.svg as the tab icon (wordmark illegible at 16px)
 * - rejected angular eagle-head concept SVGs
 * - IES initials (superseded by owner request for logo eagle)
 *
 * Run: node scripts/generate-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DEEP_NAVY = "#0B1120";
const DEEP_NAVY_RGBA = { r: 11, g: 17, b: 32, alpha: 1 };

const logoSrc = path.join(root, "public/logos/logo.svg");
const masterOut = path.join(root, "public/brand/favicon-eagle-from-logo.png");
const outIcons = path.join(root, "public/icons");
const outApp = path.join(root, "src/app");

fs.mkdirSync(outIcons, { recursive: true });
fs.mkdirSync(path.dirname(masterOut), { recursive: true });

/**
 * Crop region on a 2304x1536 render of logo.svg (2x the 1152x768 viewBox).
 * Tuned to include the mechanical eagle only (exclude IRON EAGLE STUDIO wordmark).
 */
const LOGO_RENDER = { width: 2304, height: 1536 };
const EAGLE_CROP = { left: 360, top: 60, width: 1580, height: 1100 };

/** Build multi-size ICO from PNG buffers (16/32/48). */
function buildIco(pngBuffersWithSizes) {
  const count = pngBuffersWithSizes.length;
  let offset = 6 + count * 16;
  const entries = [];

  for (const { size, buffer } of pngBuffersWithSizes) {
    entries.push({ size, buffer, offset });
    offset += buffer.length;
  }

  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  let entryOffset = 6;
  for (const e of entries) {
    out.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset);
    out.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset + 1);
    out.writeUInt8(0, entryOffset + 2);
    out.writeUInt8(0, entryOffset + 3);
    out.writeUInt16LE(1, entryOffset + 4);
    out.writeUInt16LE(32, entryOffset + 6);
    out.writeUInt32LE(e.buffer.length, entryOffset + 8);
    out.writeUInt32LE(e.offset, entryOffset + 12);
    e.buffer.copy(out, e.offset);
    entryOffset += 16;
  }
  return out;
}

/**
 * Extract eagle from logo.svg and place on an opaque navy square.
 * Small sizes use slightly less padding so the mark fills ~80% of the tile.
 */
async function eagleOnNavy(size) {
  const padRatio = size <= 48 ? 0.08 : 0.1;
  const logoSvg = fs.readFileSync(logoSrc);

  const full = await sharp(logoSvg, { density: 200 })
    .resize(LOGO_RENDER.width, LOGO_RENDER.height, {
      fit: "fill",
      background: DEEP_NAVY_RGBA,
    })
    .png()
    .toBuffer();

  const eagle = await sharp(full).extract(EAGLE_CROP).png().toBuffer();
  const inner = Math.round(size * (1 - padRatio * 2));
  const resized = await sharp(eagle)
    .resize(inner, inner, { fit: "contain", background: DEEP_NAVY_RGBA })
    .png()
    .toBuffer();

  const left = Math.round((size - inner) / 2);
  const top = Math.round((size - inner) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: DEEP_NAVY_RGBA,
    },
  })
    .composite([{ input: resized, left, top }])
    .flatten({ background: DEEP_NAVY })
    .png()
    .toBuffer();
}

async function writePng(size, outFile) {
  const buf = await eagleOnNavy(size);
  fs.writeFileSync(outFile, buf);
  return buf;
}

async function makeMaskable(size, outFile) {
  const markSize = Math.round(size * 0.72);
  const markBuf = await eagleOnNavy(markSize);
  const left = Math.round((size - markSize) / 2);
  const top = Math.round((size - markSize) / 2);

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: DEEP_NAVY,
    },
  })
    .composite([{ input: markBuf, left, top }])
    .png()
    .toFile(outFile);
}

async function main() {
  if (!fs.existsSync(logoSrc)) {
    throw new Error(`Missing logo source: ${logoSrc}`);
  }

  console.log("Generating production icon pack from logo.svg eagle crop...");
  console.log("  source:", path.relative(root, logoSrc));
  console.log("  crop:", EAGLE_CROP);

  // Master 512 reference (also written under public/brand for future regen)
  const master = await eagleOnNavy(512);
  fs.writeFileSync(masterOut, master);
  console.log("  master:", path.relative(root, masterOut));

  await writePng(16, path.join(outIcons, "favicon-16x16.png"));
  await writePng(32, path.join(outIcons, "favicon-32x32.png"));
  await writePng(48, path.join(outIcons, "favicon-48x48.png"));

  const icoPngs = [];
  for (const size of [16, 32, 48]) {
    icoPngs.push({ size, buffer: await eagleOnNavy(size) });
  }
  fs.writeFileSync(path.join(outApp, "favicon.ico"), buildIco(icoPngs));

  fs.writeFileSync(path.join(outApp, "icon.png"), master);

  const apple = await eagleOnNavy(180);
  fs.writeFileSync(path.join(outApp, "apple-icon.png"), apple);

  await writePng(192, path.join(outIcons, "android-chrome-192x192.png"));
  await writePng(512, path.join(outIcons, "android-chrome-512x512.png"));
  await makeMaskable(512, path.join(outIcons, "maskable-icon-512x512.png"));

  const files = [
    "public/brand/favicon-eagle-from-logo.png",
    "src/app/favicon.ico",
    "src/app/icon.png",
    "src/app/apple-icon.png",
    "public/icons/favicon-16x16.png",
    "public/icons/favicon-32x32.png",
    "public/icons/favicon-48x48.png",
    "public/icons/android-chrome-192x192.png",
    "public/icons/android-chrome-512x512.png",
    "public/icons/maskable-icon-512x512.png",
  ];
  for (const rel of files) {
    const p = path.join(root, rel);
    const st = fs.statSync(p);
    let dims = "";
    if (rel.endsWith(".png")) {
      const meta = await sharp(p).metadata();
      dims = `${meta.width}x${meta.height}`;
    }
    console.log(`${rel}  ${st.size}B  ${dims}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
