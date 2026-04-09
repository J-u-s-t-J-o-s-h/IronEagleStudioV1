import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const reportsDir = path.join(root, '.lighthouse')

await fs.mkdir(reportsDir, { recursive: true })

const files = await fs.readdir(reportsDir)
const reportArtifacts = files.filter((name) => name.endsWith('.report.json') || name.endsWith('.report.html'))

await Promise.all(reportArtifacts.map((name) => fs.rm(path.join(reportsDir, name), { force: true })))

console.log(`Cleaned ${reportArtifacts.length} Lighthouse report artifact(s).`)
