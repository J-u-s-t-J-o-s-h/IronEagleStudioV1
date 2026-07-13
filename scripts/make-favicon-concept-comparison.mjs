/**
 * Build favicon concept comparison sheet for owner review.
 * Does not touch production icon pack.
 * Run: node scripts/make-favicon-concept-comparison.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public/brand/favicon-concepts");
const outFile = path.join(outDir, "favicon-comparison.png");
const inspectDir = path.join(outDir, "_inspect");

const DEEP_NAVY = { r: 11, g: 17, b: 32, alpha: 1 };
const LIGHT = { r: 245, g: 246, b: 248, alpha: 1 };
const MID = { r: 55, g: 60, b: 70, alpha: 1 };
const SHEET_BG = { r: 210, g: 212, b: 218, alpha: 1 };

const concepts = [
  {
    id: "current",
    label: "Current",
    large: "public/brand/IronEagle_Mark_Favicon.svg",
    small: "public/brand/IronEagle_Mark_Favicon.svg",
  },
  {
    id: "eagle-head",
    label: "Eagle Head",
    large: "public/brand/favicon-concepts/eagle-head.svg",
    small: "public/brand/favicon-concepts/eagle-head-small.svg",
  },
  {
    id: "ie-monogram",
    label: "IE Monogram",
    large: "public/brand/favicon-concepts/ie-monogram.svg",
    small: "public/brand/favicon-concepts/ie-monogram-small.svg",
  },
  {
    id: "eagle-i",
    label: "Eagle + I",
    large: "public/brand/favicon-concepts/eagle-i.svg",
    small: "public/brand/favicon-concepts/eagle-i-small.svg",
  },
];

const sizes = [16, 32, 48, 64, 180, 512];

function displaySize(s) {
  if (s <= 64) return s;
  if (s === 180) return 90;
  return 120;
}

async function renderSvg(rel, size) {
  const svg = fs.readFileSync(path.join(root, rel));
  return sharp(svg, { density: Math.max(96, size * 4) })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function maskPreview(rel, shape) {
  const ms = 96;
  const markS = Math.round(ms * 0.7);
  const mark = await renderSvg(rel, markS);
  const inset = Math.round((ms - markS) / 2);
  const base = await sharp({
    create: { width: ms, height: ms, channels: 4, background: DEEP_NAVY },
  })
    .composite([{ input: mark, left: inset, top: inset }])
    .png()
    .toBuffer();

  const maskSvg =
    shape === "circle"
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="${ms}" height="${ms}"><circle cx="${ms / 2}" cy="${ms / 2}" r="${ms / 2}" fill="white"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="${ms}" height="${ms}"><rect width="${ms}" height="${ms}" rx="${Math.round(ms * 0.22)}" fill="white"/></svg>`;

  return sharp(base)
    .composite([{ input: await sharp(Buffer.from(maskSvg)).png().toBuffer(), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function textPng(text, w, h, opts = {}) {
  const size = opts.size || 13;
  const fill = opts.fill || "#111111";
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <text x="${opts.x || 8}" y="${opts.y || Math.round(h * 0.65)}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" fill="${fill}">${text}</text>
    </svg>`
  );
  return sharp(svg).png().toBuffer();
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(inspectDir, { recursive: true });

  const colW = 160;
  const rowH = 140;
  const labelCol = 72;
  const headerH = 40;
  const maskH = 120;
  const cols = concepts.length;
  const width = labelCol + cols * colW + 20;
  const height = headerH + sizes.length * 2 * rowH + maskH + 24;

  const composites = [];

  for (let c = 0; c < cols; c++) {
    composites.push({
      input: await textPng(concepts[c].label, colW, headerH, {
        size: 14,
        x: Math.round(colW / 2 - concepts[c].label.length * 3.5),
        y: 26,
      }),
      left: labelCol + c * colW,
      top: 6,
    });
  }

  let y = headerH;
  for (const size of sizes) {
    const d = displaySize(size);
    composites.push({
      input: await textPng(`${size}px`, labelCol, rowH * 2, { size: 12, y: rowH }),
      left: 4,
      top: y,
    });

    composites.push({
      input: await sharp({
        create: { width: cols * colW, height: rowH, channels: 4, background: LIGHT },
      })
        .png()
        .toBuffer(),
      left: labelCol,
      top: y,
    });
    composites.push({
      input: await sharp({
        create: { width: cols * colW, height: rowH, channels: 4, background: DEEP_NAVY },
      })
        .png()
        .toBuffer(),
      left: labelCol,
      top: y + rowH,
    });

    for (let c = 0; c < cols; c++) {
      const src = size <= 32 ? concepts[c].small : concepts[c].large;
      let icon = await renderSvg(src, size);
      if (d !== size) {
        icon = await sharp(icon).resize(d, d, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
      }
      const x = labelCol + c * colW + Math.floor((colW - d) / 2);
      composites.push({ input: icon, left: x, top: y + Math.floor((rowH - d) / 2) });
      composites.push({ input: icon, left: x, top: y + rowH + Math.floor((rowH - d) / 2) });
    }
    y += rowH * 2;
  }

  composites.push({
    input: await textPng("masks", labelCol, maskH, { size: 12, y: 50 }),
    left: 4,
    top: y,
  });
  composites.push({
    input: await sharp({
      create: { width: cols * colW, height: maskH, channels: 4, background: MID },
    })
      .png()
      .toBuffer(),
    left: labelCol,
    top: y,
  });

  for (let c = 0; c < cols; c++) {
    const circ = await sharp(await maskPreview(concepts[c].large, "circle")).resize(48, 48).png().toBuffer();
    const round = await sharp(await maskPreview(concepts[c].large, "rounded")).resize(48, 48).png().toBuffer();
    const x0 = labelCol + c * colW;
    composites.push({ input: circ, left: x0 + 24, top: y + 18 });
    composites.push({ input: round, left: x0 + 88, top: y + 18 });
  }

  await sharp({
    create: { width, height, channels: 4, background: SHEET_BG },
  })
    .composite(composites)
    .png()
    .toFile(outFile);

  const meta = await sharp(outFile).metadata();
  console.log(`Wrote ${outFile} ${meta.width}x${meta.height} ${fs.statSync(outFile).size}B`);

  for (const c of concepts) {
    for (const s of [16, 32]) {
      const icon = await renderSvg(c.small, s);
      await sharp(icon)
        .extend({ top: 4, bottom: 4, left: 4, right: 4, background: LIGHT })
        .resize(128, 128, { kernel: "nearest" })
        .png()
        .toFile(path.join(inspectDir, `${c.id}-${s}-light.png`));
      await sharp(icon)
        .extend({ top: 4, bottom: 4, left: 4, right: 4, background: DEEP_NAVY })
        .resize(128, 128, { kernel: "nearest" })
        .png()
        .toFile(path.join(inspectDir, `${c.id}-${s}-dark.png`));
    }
  }
  console.log("Inspect zooms:", inspectDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
