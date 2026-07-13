# Iron Eagle Studio — Progress Log

> **Purpose:** Machine-digestible handoff for any AI or teammate continuing this work.
> **Update rule:** Append or revise this file on every meaningful code, deploy, or verification change.
> **Last updated:** 2026-07-13 (favicon pack)

---

## Current status (one line)

**Favicon pack ready for deploy** — full icon/manifest pack generated and verified locally; pending push of favicon commit (or already deployed — check changelog). Questionnaire production E2E previously verified.

---

## Project identity

| Key | Value |
|-----|-------|
| Repo | `J-u-s-t-J-o-s-h/IronEagleStudioV1` |
| Local path | `C:\WORK\MY_SITE\IronEagleStudioV1` |
| Production branch | `main` |
| Vercel project | `iron-eagle-studio-v1` (`prj_JCCldx2XETEj5Kq5vnt2RtmND6xk`) |
| Vercel team | Iron Eagle Studio (`ironeaglestudio`) |
| Domains | `ironeaglestudio.com`, `www.ironeaglestudio.com` |
| Business email | `josh@ironeaglestudio.com` |

---

## Do / Do not (hard constraints)

### Do
- Reuse existing Vercel Airtable env vars; they are confirmed working in Production.
- Keep questionnaire Source = `Website` and put `Submission Type: Project Questionnaire` inside Message.
- Map Timeline onto Airtable selects only: `ASAP` | `2-4 weeks` | `1-2 months` | `Flexible`.
- Keep Airtable MCP / local tokens separate from Vercel production secrets.
- Commit/push only Iron Eagle marketing-site work on `main` (not HJH client-site branch content).

### Do not
- Create, rotate, overwrite, or ask the owner to recreate `AIRTABLE_API_KEY` / `AIRTABLE_BASE_ID` / `AIRTABLE_LEADS_TABLE` unless a confirmed auth failure + explicit owner approval.
- Write unsupported Airtable select values (e.g. Source = `Project Questionnaire`, legacy Project Type / Ownership Preference).
- Blindly merge the `HJH` git branch into `main` (HJH branch = client storm-shelter site; previews have deployed from it on the same Vercel project).
- Print or log secret values.
- Claim full success without a real production Airtable write.

---

## Environment variables

| Variable | Used by website? | Production status |
|----------|------------------|-------------------|
| `AIRTABLE_API_KEY` | Yes (`src/lib/airtable.ts`) | Present and working |
| `AIRTABLE_BASE_ID` | Yes | Present and working |
| `AIRTABLE_LEADS_TABLE` | Optional (defaults `Leads`) | Working |
| `AIRTABLE_TOKEN` | No (MCP/local only) | Not required for site |

Preview/Development scopes were not enumerated (Vercel CLI not logged in; MCP has no env-list tool). Runtime probes proved Production Airtable works.

---

## Latest deployment

| Field | Value |
|-------|-------|
| Commit | `5e78dd21dfc5c12712cd2f5d71fe7075e21d7c42` |
| Message | `Update pricing portfolio and project questionnaire` |
| Pushed | `origin/main` |
| Vercel deployment | `dpl_5rafbwdYStWLUHwnYDGsmbVFoUyd` |
| State | READY / production |
| Aliases include | `ironeaglestudio.com`, `www.ironeaglestudio.com` |

### What that commit includes
- Pricing / services repositioning (no ecommerce advertising)
- HJH Outdoor Operations featured portfolio entry + screenshot
- Empty testimonials (section hidden when empty)
- `/start-your-project` questionnaire UI
- `POST /api/project-inquiry` + shared Airtable mapping (`src/lib/airtableLeads.ts`)
- Contact `/api/leads` Airtable-compat updates
- CTA / nav / footer / sitemap / legal wording tweaks
- `OWNER_ASSETS.md`, `src/lib/business.ts`

### Intentionally not committed
- `src/app/favicon.ico.bak` (still untracked locally)

---

## Key routes

| Route | Role | Production |
|-------|------|------------|
| `/` | Marketing home | Live with updated content |
| `/start-your-project` | Questionnaire page | Live (was 404 before `5e78dd2`) |
| `/api/project-inquiry` | Questionnaire → Airtable | Live (GET → 405 expected) |
| `/api/leads` | Contact form → Airtable | Live (pre-existing) |

---

## Airtable compatibility (Leads)

Known constraints used by implementation:

- Source select: **`Website` only**
- Status: `New`, Contacted, Qualified, Unqualified → new leads use **`New`**
- Timeline select: `ASAP`, `2-4 weeks`, `1-2 months`, `Flexible`
- Message: multiline long text; questionnaire builds a labeled summary starting with `Submission Type: Project Questionnaire`
- Do **not** write Project Type / Ownership Preference as Airtable selects (details go in Message)

Mapping helpers: `src/lib/airtableLeads.ts`

---

## Verification results (2026-07-13)

### Commands
| Command | Result |
|---------|--------|
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS |
| Automated tests | N/A — no test script |

### Production questionnaire E2E
| Field | Value |
|-------|-------|
| Method | `POST https://ironeaglestudio.com/api/project-inquiry` |
| API response | `200` `{"success":true,"message":"Questionnaire received"}` |
| Name | `Iron Eagle Test Submission` |
| Business | `Questionnaire Verification Test` |
| Email | `josh@ironeaglestudio.com` |
| Expected Source | `Website` |
| Expected Status | `New` |
| Expected Timeline | `Flexible` (mapped from questionnaire “Specific date”) |
| Record ID | Unknown — Airtable MCP not configured; API does not return IDs |
| Action needed | **Delete this test Lead after team review** |

Validation also confirmed: invalid email → 400; missing consent → 400.

### HJH portfolio asset
| Field | Value |
|-------|--------|
| Path | `public/work/hjh-outdoor-operations.jpg` |
| Size | 1920×1107, ~179 KB |
| Live URL | https://www.hjhoutdoorops.com/ |
| Status | Renders on production; not stretched; no placeholder |

### Local / tooling notes
- Bodega One binds `127.0.0.1:3000` and can steal IPv4 localhost from Next.js → JSON `{"error":"Resource not found","path":"/"}`. Prefer another port (e.g. `3005`) or quit Bodega.
- Local Next without Airtable env → `/api/project-inquiry` returns **503** (failure UI path).

---

## Open items / risks

1. **Delete** production Airtable test Lead: Name `Iron Eagle Test Submission`.
2. Optional: `vercel login` + `vercel env ls` to document Preview/Development env scopes (names only, never values).
3. Optional: configure Airtable MCP separately for schema/record inspection (do not copy Vercel secrets into chat).
4. **Branch hygiene:** same Vercel project receives `HJH` preview deploys; keep production `main` free of that client codebase.
5. ~~Untracked `src/app/favicon.ico.bak`~~ — inspected (default Next.js ICO, not brand); **deleted locally**; do not restore.
6. **Social OG images:** site uses `twitter: summary_large_image` / Open Graph but has **no dedicated opengraph-image / twitter-image assets** — separate follow-up, not blocked by favicon work.

---

## Favicon / app icons (current)

| Asset | Path | Notes |
|-------|------|-------|
| Master mark | `public/brand/IronEagle_Mark.svg` | 512 SVG, brass `#D4AF37` + navy `#0B1120` |
| Small-size variant | `public/brand/IronEagle_Mark_Favicon.svg` | Thicker geometry, more padding, enlarged core |
| ICO | `src/app/favicon.ico` | Embedded 16/32/48 |
| App icon | `src/app/icon.png` | 512 transparent |
| Apple touch | `src/app/apple-icon.png` | 180 opaque deep-navy |
| PNG favicons | `public/icons/favicon-{16,32,48}x{16,32,48}.png` | Transparent |
| Android | `public/icons/android-chrome-{192,512}x{192,512}.png` | Transparent |
| Maskable | `public/icons/maskable-icon-512x512.png` | Deep-navy bg + safe padding |
| Manifest | `src/app/manifest.ts` → `/manifest.webmanifest` | theme/background `#0B1120` |
| Generator | `scripts/generate-icons.mjs` | `node scripts/generate-icons.mjs` |

**Brand colors used (from `globals.css`):** `--deep-navy: #0B1120`, `--brass: #D4AF37`.

**layout.tsx:** removed `icons: { icon: '/logos/logo.svg' }`; uses file-based icons + `metadataBase` + `viewport.themeColor`.

**Do not** point favicons at `public/logos/logo.svg` (764KB rectangular raster-in-SVG).

---

## Important file map

```
src/app/favicon.ico / icon.png / apple-icon.png / manifest.ts
public/icons/*                               # PNG favicon + PWA set
public/brand/IronEagle_Mark.svg              # Icon master
public/brand/IronEagle_Mark_Favicon.svg      # 16–48px optimized mark
scripts/generate-icons.mjs                   # Regenerate icon pack
src/app/start-your-project/page.tsx
src/app/api/project-inquiry/route.ts
src/app/api/leads/route.ts
src/components/questionnaire/*
src/data/questionnaire.ts
src/lib/airtable.ts / airtableLeads.ts / business.ts
public/work/hjh-outdoor-operations.jpg
OWNER_ASSETS.md
PROGRESS.md
```

---

## Changelog (append-only)

### 2026-07-13 — Favicon and application icon pack
- Audited icons: only incorrect `layout.tsx` → `/logos/logo.svg`; no `public/icons`, no app `favicon.ico` (deleted earlier), no manifest.
- `favicon.ico.bak` = stock Next.js multi-size ICO (16/32/48/256), not brand → deleted.
- Generated pack from `IronEagle_Mark.svg` + new `IronEagle_Mark_Favicon.svg` for small sizes.
- Added `src/app/manifest.ts`, fixed layout metadata (`metadataBase`, theme color, no duplicate logo.svg icon).
- Local verification: lint/tsc/build PASS; icon URLs 200 with correct MIME; head links favicon/icon/apple-touch/manifest.
- **Status at write time:** Generated and locally verified; deploy step follows in same session if pushed.

### 2026-07-13 — Deploy questionnaire + verify production
- Confirmed Production Airtable env already working; did not recreate credentials.
- Committed and pushed `5e78dd2` to `main`; Vercel production READY.
- Verified `/`, `/start-your-project`, `/api/project-inquiry`.
- Production E2E questionnaire write succeeded (test record left for owner deletion).
- Created `PROGRESS.md` for team/AI handoff.
- **Status:** Fully verified and working.
