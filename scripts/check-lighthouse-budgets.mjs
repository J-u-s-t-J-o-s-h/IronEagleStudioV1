import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const reportsDir = path.join(root, '.lighthouse')

const budgets = {
  mobile: {
    performanceMin: 0.85,
    lcpMsMax: 3000,
    tbtMsMax: 200,
  },
  desktop: {
    performanceMin: 0.9,
    bestPracticesMin: 0.95,
    seoMin: 0.95,
  },
}

function formatScore(score) {
  return Math.round(score * 100)
}

function assertThreshold(pass, label, actual, expected) {
  if (!pass) {
    throw new Error(`${label} failed: ${actual} (expected ${expected})`)
  }
}

async function readReport(profile) {
  const reportPath = path.join(reportsDir, `${profile}.report.json`)
  const content = await fs.readFile(reportPath, 'utf8')
  return JSON.parse(content)
}

const mobileReport = await readReport('mobile')
const desktopReport = await readReport('desktop')

const mobilePerformance = mobileReport.categories.performance.score ?? 0
const mobileLcp = mobileReport.audits['largest-contentful-paint']?.numericValue ?? Number.POSITIVE_INFINITY
const mobileTbt = mobileReport.audits['total-blocking-time']?.numericValue ?? Number.POSITIVE_INFINITY

assertThreshold(
  mobilePerformance >= budgets.mobile.performanceMin,
  'Mobile performance score',
  formatScore(mobilePerformance),
  `>= ${formatScore(budgets.mobile.performanceMin)}`
)
assertThreshold(mobileLcp <= budgets.mobile.lcpMsMax, 'Mobile LCP', `${Math.round(mobileLcp)}ms`, `<= ${budgets.mobile.lcpMsMax}ms`)
assertThreshold(mobileTbt <= budgets.mobile.tbtMsMax, 'Mobile TBT', `${Math.round(mobileTbt)}ms`, `<= ${budgets.mobile.tbtMsMax}ms`)

const desktopPerformance = desktopReport.categories.performance.score ?? 0
const desktopBestPractices = desktopReport.categories['best-practices']?.score ?? 0
const desktopSeo = desktopReport.categories.seo?.score ?? 0

assertThreshold(
  desktopPerformance >= budgets.desktop.performanceMin,
  'Desktop performance score',
  formatScore(desktopPerformance),
  `>= ${formatScore(budgets.desktop.performanceMin)}`
)
assertThreshold(
  desktopBestPractices >= budgets.desktop.bestPracticesMin,
  'Desktop best-practices score',
  formatScore(desktopBestPractices),
  `>= ${formatScore(budgets.desktop.bestPracticesMin)}`
)
assertThreshold(
  desktopSeo >= budgets.desktop.seoMin,
  'Desktop SEO score',
  formatScore(desktopSeo),
  `>= ${formatScore(budgets.desktop.seoMin)}`
)

console.log('Lighthouse budgets passed.')
