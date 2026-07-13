/**
 * Generate Iron Eagle Studio production favicon / app-icon pack.
 *
 * Source of truth (Concept A — Angular Eagle Head, approved 2026-07-13):
 * - Small (16 / 32 / 48): public/brand/favicon-redesign/eagle-head-small.svg
 * - Large (180 / 192 / 512): public/brand/favicon-redesign/eagle-head.svg
 *
 * Run: node scripts/generate-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/** Brand colors from globals.css */
const DEEP_NAVY = "#0B1120";
const DEEP_NAVY_RGBA = { r: 11, g: 17, b: 32, alpha: 1 };

const smallSrc = path.join(root, "public/brand/favicon-redesign/eagle-head-small.svg");
const largeSrc = path.join(root, "public/brand/favicon-redesign/eagle-head.svg");
const outIcons = path.join(root, "public/icons");
const outApp = path.join(root, "src/app");

fs.mkdirSync(outIcons, { recursive: true });

function densityFor(size) {
  // High density helps tiny favicons; cap for large outputs to avoid sharp pixel limits.
  if (size <= 48) return Math.max(128, size * 6);
  if (size <= 192) return 180;
  return 144;
}

async function svgToPng(svgPath, size, outFile) {
  const svg = fs.readFileSync(svgPath);
  await sharp(svg, { density: densityFor(size) })
    .resize(size, size, { fit: "contain", background: DEEP_NAVY_RGBA })
    .png()
    .toFile(outFile);
  return outFile;
}

async function svgToPngBuffer(svgPath, size) {
  const svg = fs.readFileSync(svgPath);
  return sharp(svg, { density: densityFor(size) })
    .resize(size, size, { fit: "contain", background: DEEP_NAVY_RGBA })
    .png()
    .toBuffer();
}

/** Build a multi-size ICO from PNG buffers (16/32/48). */
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
  out.writeUInt16LE(1, 2); // ICO
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
 * Maskable: deep-navy canvas with eagle-head large art scaled into safe zone (~72%).
 */
async function makeMaskable(size, outFile) {
  const markSize = Math.round(size * 0.72);
  const markBuf = await svgToPngBuffer(largeSrc, markSize);
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
  console.log("Generating production icon pack from Concept A (eagle head)...");
  console.log("  small:", path.relative(root, smallSrc));
  console.log("  large:", path.relative(root, largeSrc));

  // Browser PNG favicons — small SVG only
  await svgToPng(smallSrc, 16, path.join(outIcons, "favicon-16x16.png"));
  await svgToPng(smallSrc, 32, path.join(outIcons, "favicon-32x32.png"));
  await svgToPng(smallSrc, 48, path.join(outIcons, "favicon-48x48.png"));

  // ICO multi-size from small SVG
  const icoPngs = [];
  for (const size of [16, 32, 48]) {
    icoPngs.push({ size, buffer: await svgToPngBuffer(smallSrc, size) });
  }
  fs.writeFileSync(path.join(outApp, "favicon.ico"), buildIco(icoPngs));

  // App icon 512 — large SVG (already navy-backed)
  await svgToPng(largeSrc, 512, path.join(outApp, "icon.png"));

  // Apple touch 180 — large SVG, opaque navy
  await sharp(fs.readFileSync(largeSrc), { density: 360 })
    .resize(180, 180, { fit: "contain", background: DEEP_NAVY_RGBA })
    .flatten({ background: DEEP_NAVY })
    .png()
    .toFile(path.join(outApp, "apple-icon.png"));

  // Android / PWA — large SVG
  await svgToPng(largeSrc, 192, path.join(outIcons, "android-chrome-192x192.png"));
  await svgToPng(largeSrc, 512, path.join(outIcons, "android-chrome-512x512.png"));
  await makeMaskable(512, path.join(outIcons, "maskable-icon-512x512.png"));

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
