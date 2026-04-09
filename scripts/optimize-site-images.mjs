import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')

const imageJobs = [
  // Home hero + top callouts (<=150KB)
  { src: 'HJH_media/Excavation_and_Earthwork/HJH_photo_011.jpg', maxKB: 150, maxWidth: 1600 },
  { src: 'HJH_media/Storm_Shelters/HJH_photo_014.jpg', maxKB: 150, maxWidth: 1600 },
  { src: 'HJH_media/Storm_Shelters/HJH_photo_028.jpg', maxKB: 150, maxWidth: 1600 },

  // Shared section imagery (<=90KB)
  { src: 'HJH_media/Team_and_Pets/HJH_photo_010.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Excavation_and_Earthwork/HJH_photo_006.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Storm_Shelters/HJH_photo_016.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Storm_Shelters/HJH_photo_004.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Excavation_and_Earthwork/HJH_photo_008.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Excavation_and_Earthwork/HJH_photo_020.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Equipment_and_Trucks/HJH_photo_042.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Fence_and_Grading/HJH_photo_021.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Septic_Systems/HJH_photo_040.jpg', maxKB: 90, maxWidth: 1200 },
  { src: 'HJH_media/Equipment_and_Trucks/HJH_photo_002.jpg', maxKB: 90, maxWidth: 1200 },

  // Home gallery + project cards (<=50KB)
  { src: 'HJH_media/Storm_Shelters/HJH_photo_001.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Excavation_and_Earthwork/HJH_photo_044.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Fence_and_Grading/HJH_photo_030.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Fence_and_Grading/HJH_photo_009.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Excavation_and_Earthwork/HJH_photo_005.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Excavation_and_Earthwork/HJH_photo_049.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Septic_Systems/HJH_photo_041.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Storm_Shelters/HJH_photo_003.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Excavation_and_Earthwork/HJH_photo_013.jpg', maxKB: 50, maxWidth: 900 },
  { src: 'HJH_media/Fence_and_Grading/HJH_photo_048.jpg', maxKB: 50, maxWidth: 900 },

  // Raster logos
  { src: 'brand/logo-transparent.png', maxKB: 120, maxWidth: 900 },
  { src: 'brand/LogoV-A.png', maxKB: 120, maxWidth: 900 },
]

const widthMultipliers = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.42, 0.36]
const qualityCandidates = [84, 78, 72, 66, 60, 54, 48, 42, 36, 32]

const sharp = (await import('sharp')).default

function getOutputRelPath(srcRelPath) {
  const ext = path.extname(srcRelPath)
  return srcRelPath.replace(new RegExp(`${ext}$`, 'i'), '.webp')
}

async function optimizeOne(job) {
  const srcAbs = path.join(publicDir, job.src)
  const outRel = getOutputRelPath(job.src)
  const outAbs = path.join(publicDir, outRel)
  const maxBytes = job.maxKB * 1024

  const original = await sharp(srcAbs).metadata()
  const naturalWidth = original.width ?? job.maxWidth
  let best = null

  for (const widthScale of widthMultipliers) {
    const width = Math.max(320, Math.min(naturalWidth, Math.round(job.maxWidth * widthScale)))
    for (const quality of qualityCandidates) {
      const buf = await sharp(srcAbs)
        .rotate()
        .resize(width, null, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toBuffer()

      if (!best || buf.length < best.size) {
        best = { buf, size: buf.length, width, quality }
      }

      if (buf.length <= maxBytes) {
        await fs.mkdir(path.dirname(outAbs), { recursive: true })
        await fs.writeFile(outAbs, buf)
        return {
          src: job.src,
          out: outRel,
          bytes: buf.length,
          width,
          quality,
          hitTarget: true,
          targetKB: job.maxKB,
        }
      }
    }
  }

  await fs.mkdir(path.dirname(outAbs), { recursive: true })
  await fs.writeFile(outAbs, best.buf)
  return {
    src: job.src,
    out: outRel,
    bytes: best.size,
    width: best.width,
    quality: best.quality,
    hitTarget: false,
    targetKB: job.maxKB,
  }
}

const uniqueJobs = Array.from(new Map(imageJobs.map((j) => [j.src, j])).values())
const results = []
const skipped = []

for (const job of uniqueJobs) {
  const sourcePath = path.join(publicDir, job.src)
  try {
    await fs.access(sourcePath)
  } catch {
    skipped.push(job.src)
    continue
  }

  try {
    results.push(await optimizeOne(job))
  } catch (error) {
    console.error(`FAILED: ${job.src}`, error.message)
  }
}

console.table(
  results.map((r) => ({
    src: r.src,
    out: r.out,
    sizeKB: (r.bytes / 1024).toFixed(1),
    targetKB: r.targetKB,
    width: r.width,
    quality: r.quality,
    targetMet: r.hitTarget ? 'yes' : 'no',
  }))
)

if (skipped.length > 0) {
  console.log(`Skipped missing sources (${skipped.length}):`)
  for (const src of skipped) {
    console.log(`- ${src}`)
  }
}
