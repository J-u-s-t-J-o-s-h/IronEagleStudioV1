/**
 * Generate Iron Eagle Studio favicon / app-icon pack from brand SVGs.
 * Run: node scripts/generate-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const BRASS = "#D4AF37";
const DEEP_NAVY = "#0B1120";

const markPath = path.join(root, "public/brand/IronEagle_Mark.svg");
const faviconMarkPath = path.join(root, "public/brand/IronEagle_Mark_Favicon.svg");
const outIcons = path.join(root, "public/icons");
const outApp = path.join(root, "src/app");
const outPreview = path.join(root, "tmp-icon-preview");

fs.mkdirSync(outIcons, { recursive: true });
fs.mkdirSync(outPreview, { recursive: true });

async function svgToPng(svgPath, size, outFile, { background = { r: 0, g: 0, b: 0, alpha: 0 } } = {}) {
  const svg = fs.readFileSync(svgPath);
  await sharp(svg, { density: Math.max(72, size * 2) })
    .resize(size, size, { fit: "contain", background })
    .png()
    .toFile(outFile);
  return outFile;
}

async function svgToPngBuffer(svgPath, size, { background = { r: 0, g: 0, b: 0, alpha: 0 } } = {}) {
  const svg = fs.readFileSync(svgPath);
  return sharp(svg, { density: Math.max(72, size * 2) })
    .resize(size, size, { fit: "contain", background })
    .png()
    .toBuffer();
}

/** Build a multi-size ICO from PNG buffers (16/32/48). */
function buildIco(pngBuffersWithSizes) {
  const count = pngBuffersWithSizes.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];

  for (const { size, buffer } of pngBuffersWithSizes) {
    entries.push({ size, buffer, offset });
    offset += buffer.length;
  }

  const total = offset;
  const out = Buffer.alloc(total);
  // ICONDIR
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2); // ICO
  out.writeUInt16LE(count, 4);

  let entryOffset = 6;
  for (const e of entries) {
    out.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset);
    out.writeUInt8(e.size >= 256 ? 0 : e.size, entryOffset + 1);
    out.writeUInt8(0, entryOffset + 2); // colors
    out.writeUInt8(0, entryOffset + 3);
    out.writeUInt16LE(1, entryOffset + 4); // planes
    out.writeUInt16LE(32, entryOffset + 6); // bitcount
    out.writeUInt32LE(e.buffer.length, entryOffset + 8);
    out.writeUInt32LE(e.offset, entryOffset + 12);
    e.buffer.copy(out, e.offset);
    entryOffset += 16;
  }
  return out;
}

async function makeMaskable(size, outFile) {
  // Safe zone: keep mark within ~80% center (10% margin each side) for maskable cropping
  const markSize = Math.round(size * 0.72);
  const markBuf = await svgToPngBuffer(markPath, markSize);
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
  console.log("Generating icon pack...");

  // Browser PNG favicons (simplified mark)
  await svgToPng(faviconMarkPath, 16, path.join(outIcons, "favicon-16x16.png"));
  await svgToPng(faviconMarkPath, 32, path.join(outIcons, "favicon-32x32.png"));
  await svgToPng(faviconMarkPath, 48, path.join(outIcons, "favicon-48x48.png"));

  // ICO multi-size
  const icoPngs = [];
  for (const size of [16, 32, 48]) {
    icoPngs.push({ size, buffer: await svgToPngBuffer(faviconMarkPath, size) });
  }
  fs.writeFileSync(path.join(outApp, "favicon.ico"), buildIco(icoPngs));

  // Next.js app icons
  await svgToPng(markPath, 512, path.join(outApp, "icon.png")); // transparent
  // Apple touch: opaque deep-navy so home-screen tiles look intentional
  await sharp(fs.readFileSync(markPath), { density: 360 })
    .resize(180, 180, { fit: "contain", background: DEEP_NAVY })
    .flatten({ background: DEEP_NAVY })
    .png()
    .toFile(path.join(outApp, "apple-icon.png"));

  // Android / PWA
  await svgToPng(markPath, 192, path.join(outIcons, "android-chrome-192x192.png"));
  await svgToPng(markPath, 512, path.join(outIcons, "android-chrome-512x512.png"));
  await makeMaskable(512, path.join(outIcons, "maskable-icon-512x512.png"));

  // Preview sheet: node scripts/make-preview-sheet.mjs

  const files = [
    "src/app/favicon.ico",
    "src/app/icon.png",
    "src/app/apple-icon.png",
    "public/icons/favicon-16x16.png",
    "public/icons/favicon-32x32.png",
    "public/icons/favicon-48x48.png",
    "public/icons/android-chrome-192x192.png",
    "public/icons/android-chrome-512x512.png",
    "public/icons/maskable-icon-512x512.png",
    "public/brand/IronEagle_Mark_Favicon.svg",
  ];
  for (const rel of files) {
    const p = path.join(root, rel);
    const st = fs.statSync(p);
    let dims = "";
    if (rel.endsWith(".png")) {
      const meta = await sharp(p).metadata();
      dims = `${meta.width}x${meta.height} alpha=${meta.hasAlpha}`;
    }
    console.log(`${rel}  ${st.size}B  ${dims}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
