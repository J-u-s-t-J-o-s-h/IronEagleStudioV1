/**
 * Favicon redesign comparison with real browser-tab simulation.
 * Does not touch production icon pack.
 * Run: node scripts/make-favicon-redesign-comparison.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public/brand/favicon-redesign");
const outFile = path.join(outDir, "favicon-browser-tab-comparison.png");
const inspectDir = path.join(outDir, "_inspect");

const BRASS = "#D4AF37";
const NAVY = { r: 11, g: 17, b: 32, alpha: 1 };
const LIGHT = { r: 245, g: 246, b: 248, alpha: 1 };
const TAB_DARK = { r: 32, g: 33, b: 36, alpha: 1 }; // Chrome dark inactive-ish
const TAB_DARK_ACTIVE = { r: 53, g: 54, b: 58, alpha: 1 };
const TAB_LIGHT = { r: 222, g: 225, b: 230, alpha: 1 };
const TAB_LIGHT_ACTIVE = { r: 255, g: 255, b: 255, alpha: 1 };
const CHROME_BAR_DARK = { r: 32, g: 33, b: 36, alpha: 1 };
const CHROME_BAR_LIGHT = { r: 222, g: 225, b: 230, alpha: 1 };

const concepts = [
  {
    id: "current",
    label: "Current (live)",
    large: "public/brand/IronEagle_Mark_Favicon.svg",
    small: "public/brand/IronEagle_Mark_Favicon.svg",
  },
  {
    id: "eagle-head",
    label: "A: Eagle Head",
    large: "public/brand/favicon-redesign/eagle-head.svg",
    small: "public/brand/favicon-redesign/eagle-head-small.svg",
  },
  {
    id: "ie-monogram",
    label: "B: IE Monogram",
    large: "public/brand/favicon-redesign/ie-monogram.svg",
    small: "public/brand/favicon-redesign/ie-monogram-small.svg",
  },
  {
    id: "eagle-i",
    label: "C: Eagle + I",
    large: "public/brand/favicon-redesign/eagle-i.svg",
    small: "public/brand/favicon-redesign/eagle-i-small.svg",
  },
];

async function renderSvg(rel, size) {
  const svg = fs.readFileSync(path.join(root, rel));
  return sharp(svg, { density: Math.max(128, size * 6) })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function textSvg(text, opts) {
  const {
    w,
    h,
    size = 14,
    fill = "#e8eaed",
    x = 8,
    y = null,
    weight = "600",
    family = "Segoe UI,Arial,sans-serif",
  } = opts;
  const ty = y ?? Math.round(h * 0.68);
  return sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
        <text x="${x}" y="${ty}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}">${text}</text>
      </svg>`
    )
  )
    .png()
    .toBuffer();
}

async function browserTabRow(icon16, mode) {
  // Simulate Chrome tab strip: bar + one active tab with 16px favicon + title
  const W = 520;
  const H = 44;
  const isDark = mode === "dark";
  const bar = isDark ? CHROME_BAR_DARK : CHROME_BAR_LIGHT;
  const tab = isDark ? TAB_DARK_ACTIVE : TAB_LIGHT_ACTIVE;
  const titleColor = isDark ? "#e8eaed" : "#202124";
  const muteColor = isDark ? "#9aa0a6" : "#5f6368";

  const layers = [];
  layers.push({
    input: await sharp({ create: { width: W, height: H, channels: 4, background: bar } }).png().toBuffer(),
    left: 0,
    top: 0,
  });

  // Active tab shape (rounded)
  const tabW = 240;
  const tabH = 34;
  const tabX = 12;
  const tabY = 8;
  const tabSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${tabW}" height="${tabH}">
      <rect x="0" y="0" width="${tabW}" height="${tabH}" rx="8" fill="${isDark ? "#35363a" : "#ffffff"}"/>
    </svg>`
  );
  layers.push({ input: await sharp(tabSvg).png().toBuffer(), left: tabX, top: tabY });

  // Favicon at EXACT 16px
  layers.push({ input: icon16, left: tabX + 12, top: tabY + 9 });

  // Title
  layers.push({
    input: await textSvg("IronEagle Studio", {
      w: 180,
      h: 24,
      size: 12,
      fill: titleColor,
      x: 0,
      y: 16,
      weight: "500",
    }),
    left: tabX + 34,
    top: tabY + 5,
  });

  // Fake close x
  layers.push({
    input: await textSvg("x", { w: 16, h: 20, size: 12, fill: muteColor, x: 2, y: 14, weight: "400" }),
    left: tabX + tabW - 22,
    top: tabY + 6,
  });

  // Inactive tab hint
  const inactive = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="28">
      <rect x="0" y="0" width="120" height="28" rx="8" fill="${isDark ? "#202124" : "#dee1e6"}"/>
    </svg>`
  );
  layers.push({ input: await sharp(inactive).png().toBuffer(), left: tabX + tabW + 8, top: tabY + 4 });
  layers.push({
    input: await textSvg("New Tab", {
      w: 80,
      h: 20,
      size: 11,
      fill: muteColor,
      x: 0,
      y: 14,
      weight: "400",
    }),
    left: tabX + tabW + 20,
    top: tabY + 8,
  });

  return sharp({ create: { width: W, height: H, channels: 4, background: bar } })
    .composite(layers)
    .png()
    .toBuffer();
}

async function maskPreview(rel, shape) {
  const ms = 96;
  const icon = await renderSvg(rel, ms);
  const maskSvg =
    shape === "circle"
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="${ms}" height="${ms}"><circle cx="${ms / 2}" cy="${ms / 2}" r="${ms / 2}" fill="white"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="${ms}" height="${ms}"><rect width="${ms}" height="${ms}" rx="${Math.round(ms * 0.22)}" fill="white"/></svg>`;
  return sharp(icon)
    .composite([{ input: await sharp(Buffer.from(maskSvg)).png().toBuffer(), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(inspectDir, { recursive: true });

  const colW = 180;
  const labelCol = 90;
  const headerH = 36;
  const tabBlockH = 52;
  const sizeRowH = 100;
  const maskH = 120;
  const sizes = [16, 24, 32, 48, 64];
  const cols = concepts.length;

  // Layout sections:
  // 1) Header labels
  // 2) Dark tab sims (4 concepts)
  // 3) Light tab sims
  // 4) Size grid light+dark for 16/24/32/48/64
  // 5) Masks
  const width = labelCol + cols * colW + 24;
  const height =
    headerH +
    28 +
    concepts.length * tabBlockH + // dark tabs stacked by concept? Better: one row of 4 dark tabs is too wide.
    // Instead: for each concept, dark tab + light tab stacked under column
    concepts.length * 0 +
    2 * (concepts.length > 0 ? tabBlockH * concepts.length : 0);

  // Simpler vertical layout per concept column:
  // header | dark tab | light tab | 16 light | 16 dark | 32 light | 32 dark | ... | masks

  const previewSizes = [16, 32, 48, 64];
  const rowPairs = previewSizes.length; // each size gets light+dark
  const pairH = 90;
  const tabH = 48;
  const finalH = headerH + tabH * 2 + 20 + rowPairs * pairH * 2 + maskH + 40;
  // Actually tabs under each column: dark then light (2 rows), then size pairs

  const H =
    headerH +
    tabH + // dark tabs row
    8 +
    tabH + // light tabs row
    16 +
    previewSizes.length * 2 * pairH +
    maskH +
    30;

  const composites = [];

  // Title
  composites.push({
    input: await textSvg("Iron Eagle favicon redesign — real 16px browser-tab test", {
      w: width - 20,
      h: 28,
      size: 15,
      fill: "#111",
      x: 8,
      y: 20,
      weight: "700",
    }),
    left: 8,
    top: 4,
  });

  let y = 32;

  // Column labels
  for (let c = 0; c < cols; c++) {
    composites.push({
      input: await textSvg(concepts[c].label, {
        w: colW,
        h: 24,
        size: 12,
        fill: "#111",
        x: 8,
        y: 16,
        weight: "700",
      }),
      left: labelCol + c * colW,
      top: y,
    });
  }
  y += headerH;

  // Dark browser tabs (actual 16px)
  composites.push({
    input: await textSvg("Dark tab", { w: labelCol, h: tabH, size: 11, fill: "#333", x: 4, y: 28 }),
    left: 2,
    top: y,
  });
  for (let c = 0; c < cols; c++) {
    const icon16 = await renderSvg(concepts[c].small, 16);
    const tab = await browserTabRow(icon16, "dark");
    // scale tab to fit column width
    const scaled = await sharp(tab)
      .resize(colW - 8, null, { fit: "inside" })
      .png()
      .toBuffer();
    const meta = await sharp(scaled).metadata();
    composites.push({
      input: scaled,
      left: labelCol + c * colW + 4,
      top: y + Math.floor((tabH - (meta.height || tabH)) / 2),
    });
  }
  y += tabH + 8;

  // Light browser tabs
  composites.push({
    input: await textSvg("Light tab", { w: labelCol, h: tabH, size: 11, fill: "#333", x: 4, y: 28 }),
    left: 2,
    top: y,
  });
  for (let c = 0; c < cols; c++) {
    const icon16 = await renderSvg(concepts[c].small, 16);
    const tab = await browserTabRow(icon16, "light");
    const scaled = await sharp(tab)
      .resize(colW - 8, null, { fit: "inside" })
      .png()
      .toBuffer();
    const meta = await sharp(scaled).metadata();
    composites.push({
      input: scaled,
      left: labelCol + c * colW + 4,
      top: y + Math.floor((tabH - (meta.height || tabH)) / 2),
    });
  }
  y += tabH + 16;

  // Size previews
  for (const size of previewSizes) {
    for (const mode of ["light", "dark"]) {
      const bg = mode === "light" ? LIGHT : NAVY;
      composites.push({
        input: await textSvg(`${size}px ${mode}`, {
          w: labelCol,
          h: pairH,
          size: 11,
          fill: "#333",
          x: 4,
          y: 50,
        }),
        left: 2,
        top: y,
      });
      composites.push({
        input: await sharp({
          create: { width: cols * colW, height: pairH, channels: 4, background: bg },
        })
          .png()
          .toBuffer(),
        left: labelCol,
        top: y,
      });

      for (let c = 0; c < cols; c++) {
        const src = size <= 32 ? concepts[c].small : concepts[c].large;
        const icon = await renderSvg(src, size);
        const x = labelCol + c * colW + Math.floor((colW - size) / 2);
        composites.push({
          input: icon,
          left: x,
          top: y + Math.floor((pairH - size) / 2),
        });
      }
      y += pairH;
    }
  }

  // Masks
  composites.push({
    input: await textSvg("masks", { w: labelCol, h: maskH, size: 11, fill: "#333", x: 4, y: 50 }),
    left: 2,
    top: y,
  });
  composites.push({
    input: await sharp({
      create: { width: cols * colW, height: maskH, channels: 4, background: { r: 60, g: 64, b: 72, alpha: 1 } },
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
    composites.push({ input: circ, left: x0 + 28, top: y + 20 });
    composites.push({ input: round, left: x0 + 100, top: y + 20 });
  }

  const sheetH = y + maskH + 20;
  await sharp({
    create: {
      width,
      height: sheetH,
      channels: 4,
      background: { r: 200, g: 202, b: 208, alpha: 1 },
    },
  })
    .composite(composites)
    .png()
    .toFile(outFile);

  const meta = await sharp(outFile).metadata();
  console.log(`Wrote ${outFile} ${meta.width}x${meta.height} ${fs.statSync(outFile).size}B`);

  // Inspect zooms: true 16px nearest-neighbor for evaluation
  for (const c of concepts) {
    for (const s of [16, 24, 32]) {
      const icon = await renderSvg(c.small, s);
      await sharp(icon)
        .resize(s * 8, s * 8, { kernel: "nearest" })
        .png()
        .toFile(path.join(inspectDir, `${c.id}-${s}-zoom.png`));
      // also on simulated tab crop
      const tab = await browserTabRow(icon, "dark");
      await sharp(tab).png().toFile(path.join(inspectDir, `${c.id}-tab-dark.png`));
    }
  }
  console.log("Inspect:", inspectDir);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
