import sharp from "sharp";
import fs from "fs";

const sizes = [16, 32, 48, 64, 180, 192, 512];
const display = [16, 32, 48, 64, 90, 96, 120]; // display sizes in sheet (512 scaled down)
const cell = 140;
const width = sizes.length * cell;
const height = cell * 3 + 30;
const DEEP_NAVY = { r: 11, g: 17, b: 32, alpha: 1 };
const fav = "public/brand/IronEagle_Mark_Favicon.svg";
const mark = "public/brand/IronEagle_Mark.svg";
const comps = [];

for (let i = 0; i < sizes.length; i++) {
  const s = sizes[i];
  const d = display[i];
  const src = s <= 48 ? fav : mark;
  const buf = await sharp(fs.readFileSync(src), { density: Math.max(72, s * 3) })
    .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(d, d, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
  const x = i * cell + Math.floor((cell - d) / 2);
  comps.push({ input: buf, left: x, top: 15 + Math.floor((cell - d) / 2) });
  comps.push({ input: buf, left: x, top: 15 + cell + Math.floor((cell - d) / 2) });
}

const ms = 100;
const markS = Math.round(ms * 0.72);
const markBuf = await sharp(fs.readFileSync(mark), { density: 300 })
  .resize(markS, markS, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const inset = Math.floor((ms - markS) / 2);
const base = await sharp({ create: { width: ms, height: ms, channels: 4, background: DEEP_NAVY } })
  .composite([{ input: markBuf, left: inset, top: inset }])
  .png()
  .toBuffer();

const circleSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${ms}" height="${ms}"><circle cx="${ms / 2}" cy="${ms / 2}" r="${ms / 2}" fill="white"/></svg>`
);
const roundSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${ms}" height="${ms}"><rect width="${ms}" height="${ms}" rx="${Math.round(ms * 0.22)}" fill="white"/></svg>`
);
const circular = await sharp(base)
  .composite([{ input: await sharp(circleSvg).png().toBuffer(), blend: "dest-in" }])
  .png()
  .toBuffer();
const rounded = await sharp(base)
  .composite([{ input: await sharp(roundSvg).png().toBuffer(), blend: "dest-in" }])
  .png()
  .toBuffer();

comps.push({ input: circular, left: 30, top: 15 + 2 * cell + Math.floor((cell - ms) / 2) });
comps.push({ input: rounded, left: 180, top: 15 + 2 * cell + Math.floor((cell - ms) / 2) });

fs.mkdirSync("tmp-icon-preview", { recursive: true });
await sharp({ create: { width, height, channels: 4, background: { r: 200, g: 200, b: 205, alpha: 1 } } })
  .composite([
    {
      input: await sharp({
        create: { width, height: cell, channels: 4, background: { r: 248, g: 248, b: 250, alpha: 1 } },
      })
        .png()
        .toBuffer(),
      left: 0,
      top: 15,
    },
    {
      input: await sharp({ create: { width, height: cell, channels: 4, background: DEEP_NAVY } }).png().toBuffer(),
      left: 0,
      top: 15 + cell,
    },
    {
      input: await sharp({
        create: { width, height: cell, channels: 4, background: { r: 50, g: 54, b: 62, alpha: 1 } },
      })
        .png()
        .toBuffer(),
      left: 0,
      top: 15 + 2 * cell,
    },
    ...comps,
  ])
  .png()
  .toFile("tmp-icon-preview/icon-comparison-sheet.png");

// Also export individual size previews for Read tool inspection
for (const s of [16, 32, 48, 64]) {
  const src = s <= 48 ? fav : mark;
  await sharp(fs.readFileSync(src), { density: 300 })
    .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 8,
      bottom: 8,
      left: 8,
      right: 8,
      background: { r: 248, g: 248, b: 250, alpha: 1 },
    })
    .resize(128, 128, { kernel: "nearest" })
    .png()
    .toFile(`tmp-icon-preview/preview-${s}-light.png`);
  await sharp(fs.readFileSync(src), { density: 300 })
    .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 8,
      bottom: 8,
      left: 8,
      right: 8,
      background: DEEP_NAVY,
    })
    .resize(128, 128, { kernel: "nearest" })
    .png()
    .toFile(`tmp-icon-preview/preview-${s}-dark.png`);
}

console.log("preview ok", fs.statSync("tmp-icon-preview/icon-comparison-sheet.png").size);
