import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const lighthouseCliPath = path.join(root, 'node_modules', 'lighthouse', 'cli', 'index.js')
const reportsDir = path.join(root, '.lighthouse')

const profile = process.argv[2]
if (!profile || !['mobile', 'desktop'].includes(profile)) {
  console.error('Usage: node scripts/run-lighthouse-profile.mjs <mobile|desktop>')
  process.exit(1)
}

await fs.mkdir(reportsDir, { recursive: true })

const reportBase = path.join('.lighthouse', profile)
const args = [
  lighthouseCliPath,
  'http://127.0.0.1:3000',
  '--output=json',
  '--output=html',
  `--output-path=${reportBase}`,
  '--throttling-method=simulate',
  '--chrome-flags=--headless=new --incognito --disable-extensions',
]

if (profile === 'desktop') {
  args.push('--preset=desktop')
}

const child = spawn(process.execPath, args, {
  cwd: root,
  stdio: ['inherit', 'pipe', 'pipe'],
})

let combinedOutput = ''
child.stdout.on('data', (chunk) => {
  const text = chunk.toString()
  combinedOutput += text
  process.stdout.write(text)
})
child.stderr.on('data', (chunk) => {
  const text = chunk.toString()
  combinedOutput += text
  process.stderr.write(text)
})

const exitCode = await new Promise((resolve) => {
  child.on('close', resolve)
})

if (exitCode === 0) {
  process.exit(0)
}

const reportJsonPath = path.join(root, `${reportBase}.report.json`)
const hasReport = await fs
  .access(reportJsonPath)
  .then(() => true)
  .catch(() => false)

const hasWindowsTmpCleanupIssue =
  combinedOutput.includes('EPERM, Permission denied') &&
  combinedOutput.includes('lighthouse.') &&
  combinedOutput.includes('destroyTmp')

if (hasReport && hasWindowsTmpCleanupIssue) {
  console.warn('Lighthouse completed with a Windows temp cleanup EPERM; using generated report output.')
  process.exit(0)
}

process.exit(typeof exitCode === 'number' ? exitCode : 1)
