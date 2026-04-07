import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const tex = path.join(root, 'public', 'textures')

// 2.svg: strip Canva C2PA metadata blob
const two = fs.readFileSync(path.join(tex, '2.svg'), 'utf8')
const meta = two.match(/<metadata>[\s\S]*?<\/metadata>/)
const stripped = two.replace(/<metadata>[\s\S]*?<\/metadata>/, '')
fs.writeFileSync(path.join(tex, '2.clean.svg'), stripped)
console.log('2.svg:', two.length, 'bytes → 2.clean.svg:', stripped.length, 'bytes (removed metadata:', meta ? meta[0].length : 0, ')')

// 1.svg: extract embedded JPEG (not a real vector — huge base64)
const one = fs.readFileSync(path.join(tex, '1.svg'), 'utf8')
const m = one.match(/xlink:href="data:image\/jpeg;base64,([^"]+)"/)
if (m) {
  const buf = Buffer.from(m[1], 'base64')
  fs.writeFileSync(path.join(tex, 'extracted-1.jpg'), buf)
  console.log('1.svg: wrote extracted-1.jpg', buf.length, 'bytes')
} else {
  console.log('1.svg: no embedded jpeg found')
}

const twoClean = fs.readFileSync(path.join(tex, '2.clean.svg'), 'utf8')
const mPng = twoClean.match(/xlink:href="data:image\/png;base64,([^"]+)"/)
if (mPng) {
  const buf = Buffer.from(mPng[1], 'base64')
  fs.writeFileSync(path.join(tex, 'extracted-2.png'), buf)
  console.log('2.clean.svg: wrote extracted-2.png', buf.length, 'bytes')
}

// WebP tiles for CSS (`/textures/texture-*.webp`) — run: npx -p sharp node scripts/optimize-textures.mjs
try {
  const sharp = (await import('sharp')).default
  const jpg = path.join(tex, 'extracted-1.jpg')
  const png = path.join(tex, 'extracted-2.png')
  if (fs.existsSync(jpg)) {
    await sharp(jpg)
      .resize(1600, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(tex, 'texture-1.webp'))
    console.log('wrote texture-1.webp')
  }
  if (fs.existsSync(png)) {
    await sharp(png)
      .resize(800, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(tex, 'texture-2.webp'))
    console.log('wrote texture-2.webp')
  }
} catch {
  console.log('sharp not installed: skip WebP (run: npx -p sharp node scripts/optimize-textures.mjs)')
}
