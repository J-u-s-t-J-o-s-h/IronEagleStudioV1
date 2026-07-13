# Iron Eagle Studio — Progress Log

> **Purpose:** Machine-digestible handoff for any AI or teammate continuing this work.  
> **Update rule:** Append or revise this file on every meaningful code, deploy, or verification change. Include timestamps (`YYYY-MM-DD HH:MM TZ`).  
> **Timezone:** America/New_York (EDT, UTC−04:00) unless noted.  
> **Last updated:** 2026-07-13 18:28 EDT

---

## Current status (one line)

**2026-07-13 18:24 EDT — New brand-faithful favicon redesigns ready for owner review** — see `public/brand/favicon-redesign/`; production favicon pack still unchanged until explicit A/B/C selection. Local `main` is ahead of `origin/main` by 2 unpushed commits.

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

## Git snapshot

| Item | Value | Timestamp |
|------|-------|-----------|
| Local HEAD | `9ccf150` — Redesign favicon concepts to match Iron Eagle brand | 2026-07-13 17:37:44 −0400 |
| Prior local | `cfcede4` — Add favicon concept alternatives for review | 2026-07-13 17:07:50 −0400 |
| Remote `origin/main` (approx) | Includes through `51c5960` / favicon pack docs; **missing** local `cfcede4` + `9ccf150` | — |
| Push status | **Not pushed** (favicon concept/redesign commits await owner instruction) | as of 2026-07-13 18:24 EDT |

---

## Do / Do not (hard constraints)

### Do
- Reuse existing Vercel Airtable env vars; they are confirmed working in Production.
- Keep questionnaire Source = `Website` and put `Submission Type: Project Questionnaire` inside Message.
- Map Timeline onto Airtable selects only: `ASAP` | `2-4 weeks` | `1-2 months` | `Flexible`.
- Keep Airtable MCP / local tokens separate from Vercel production secrets.
- Commit/push only Iron Eagle marketing-site work on `main` (not HJH client-site branch content).
- Stamp every PROGRESS update with date + time + timezone.

### Do not
- Create, rotate, overwrite, or ask the owner to recreate `AIRTABLE_API_KEY` / `AIRTABLE_BASE_ID` / `AIRTABLE_LEADS_TABLE` unless a confirmed auth failure + explicit owner approval.
- Write unsupported Airtable select values (e.g. Source = `Project Questionnaire`, legacy Project Type / Ownership Preference).
- Blindly merge the `HJH` git branch into `main` (HJH branch = client storm-shelter site; previews have deployed from it on the same Vercel project).
- Print or log secret values.
- Claim full success without a real production Airtable write.
- Replace or deploy favicon artwork until owner explicitly selects a redesign concept.

---

## Environment variables

| Variable | Used by website? | Production status | Verified |
|----------|------------------|-------------------|----------|
| `AIRTABLE_API_KEY` | Yes (`src/lib/airtable.ts`) | Present and working | 2026-07-13 ~14:00–14:30 EDT (runtime probes) |
| `AIRTABLE_BASE_ID` | Yes | Present and working | same |
| `AIRTABLE_LEADS_TABLE` | Optional (defaults `Leads`) | Working | same |
| `AIRTABLE_TOKEN` | No (MCP/local only) | Not required for site | — |

Preview/Development scopes were not enumerated (Vercel CLI not logged in; MCP has no env-list tool).

---

## Latest production deployment (live site)

| Field | Value |
|-------|-------|
| Favicon pack commit | `a5026286d9c09c54831d07be4bf117b97fd12d3b` |
| Message | `Update favicon and application icon pack` |
| Committed / pushed | 2026-07-13 15:45:17 −0400 |
| PROGRESS note commit | `51c5960` — 2026-07-13 15:48:49 −0400 |
| Vercel deployment | `dpl_7LbyBjgSVL4XxEyxhcdkPV2Ca3Uf` READY / production |
| Domains | `ironeaglestudio.com`, `www.ironeaglestudio.com` |

### Also live from earlier same day
| Field | Value |
|-------|-------|
| Questionnaire commit | `5e78dd21dfc5c12712cd2f5d71fe7075e21d7c42` |
| Message | `Update pricing portfolio and project questionnaire` |
| Committed / pushed | 2026-07-13 14:16:50 −0400 |
| Vercel deployment | `dpl_5rafbwdYStWLUHwnYDGsmbVFoUyd` (superseded as latest by favicon deploy) |

### What is live (production)
- Pricing / services repositioning; HJH portfolio; questionnaire routes; Airtable-compatible APIs
- File-based favicon pack + `manifest.ts` (current abstract mark — **visually rejected for brand resemblance**)

### Local only (not on production)
- `public/brand/favicon-concepts/` (first concept round)
- `public/brand/favicon-redesign/` (brand-faithful redesign round + browser-tab comparison)

---

## Key routes

| Route | Role | Production (as of 2026-07-13 18:24 EDT) |
|-------|------|----------------------------------------|
| `/` | Marketing home | Live |
| `/start-your-project` | Questionnaire page | Live since `5e78dd2` |
| `/api/project-inquiry` | Questionnaire → Airtable | Live (GET → 405 expected) |
| `/api/leads` | Contact form → Airtable | Live |
| `/favicon.ico` | Browser tab icon | Live abstract pack (`a502628`) — redesign pending |
| `/manifest.webmanifest` | PWA manifest | Live |

---

## Airtable compatibility (Leads)

Known constraints used by implementation:

- Source select: **`Website` only**
- Status: `New`, Contacted, Qualified, Unqualified → new leads use **`New`**
- Timeline select: `ASAP`, `2-4 weeks`, `1-2 months`, `Flexible`
- Message: multiline; questionnaire summary includes `Submission Type: Project Questionnaire`
- Do **not** write Project Type / Ownership Preference as Airtable selects

Mapping helpers: `src/lib/airtableLeads.ts`

---

## Verification results

### Questionnaire + Airtable E2E — 2026-07-13 ~14:20–14:40 EDT
| Command / check | Result |
|-----------------|--------|
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS |
| Automated tests | N/A — no test script |
| `POST /api/project-inquiry` | **200** success |
| Test Lead Name | `Iron Eagle Test Submission` |
| Expected Source / Status / Timeline | `Website` / `New` / `Flexible` |
| Action | **Delete test Lead after team review** |

### Favicon pack production — 2026-07-13 ~15:45–15:50 EDT
| Check | Result |
|-------|--------|
| Lint / tsc / build | PASS |
| Production icon URLs | 200; byte lengths match local |
| Head tags | `/favicon.ico`, `/icon.png`, `/apple-icon.png`, `/manifest.webmanifest` |

### Favicon redesign concepts — 2026-07-13 ~17:37–18:24 EDT
| Check | Result |
|-------|--------|
| Lint / tsc / build | PASS |
| Production favicon still unchanged | 200, 1456 B |
| Comparison asset | `favicon-browser-tab-comparison.png` generated |
| Deploy | **Not deployed** (awaiting owner A/B/C) |

### Local / tooling notes
- Bodega One binds `127.0.0.1:3000` → prefer port `3005+` for Next.js.
- Local Next without Airtable env → `/api/project-inquiry` returns **503**.

---

## Open items / risks

| # | Item | Status | Noted |
|---|------|--------|-------|
| 1 | Delete Airtable test Lead `Iron Eagle Test Submission` | Open | 2026-07-13 ~14:40 EDT |
| 2 | Owner select favicon redesign A / B / C then regenerate + deploy | **Blocked on owner** | 2026-07-13 18:24 EDT |
| 3 | Push local commits `cfcede4` + `9ccf150` when ready | Not pushed | 2026-07-13 18:24 EDT |
| 4 | Optional: `vercel env ls` for Preview/Development scopes | Optional | 2026-07-13 |
| 5 | Optional: Airtable MCP (separate from Vercel secrets) | Optional | 2026-07-13 |
| 6 | HJH branch previews on same Vercel project — keep off production `main` | Ongoing risk | 2026-07-13 |
| 7 | No dedicated OG / Twitter social images | Follow-up | 2026-07-13 ~15:45 EDT |

---

## Favicon / app icons (live production)

Live since **2026-07-13 15:45 EDT** (`a502628`). Visual design later rejected for tab brand recognition.

| Asset | Path | Notes |
|-------|------|-------|
| Master mark | `public/brand/IronEagle_Mark.svg` | Brass `#D4AF37` + navy `#0B1120` |
| Small-size variant | `public/brand/IronEagle_Mark_Favicon.svg` | Used by live small PNGs |
| ICO / PNG / Apple / Android / maskable | `src/app/*` + `public/icons/*` | Infrastructure keep |
| Manifest | `src/app/manifest.ts` → `/manifest.webmanifest` | Keep |
| Generator | `scripts/generate-icons.mjs` | Regenerate after owner picks redesign |

**Do not** point favicons at `public/logos/logo.svg` (large rectangular asset).

---

## Favicon redesign (awaiting selection)

### Round 1 — `public/brand/favicon-concepts/`
- Committed: `cfcede4` @ **2026-07-13 17:07:50 −0400**
- Outcome: Rejected for weak brand resemblance / yellow-dot tab appearance

### Round 2 — `public/brand/favicon-redesign/` (current recommendation set)
- Committed: `9ccf150` @ **2026-07-13 17:37:44 −0400**
- Comparison: `favicon-browser-tab-comparison.png` (real 16px dark/light Chrome-like tabs)

| Concept | Files | 16px tab notes |
|---------|-------|----------------|
| A Eagle Head | `eagle-head.svg` + `-small` | Preferred brand direction; navy tile + large beak |
| B IE Monogram | `ie-monogram.svg` + `-small` | Clearest letter mark in real tabs |
| C Eagle + I | `eagle-i.svg` + `-small` | Brand wing geometry + I; no circular core |

**Recommendation (2026-07-13 17:37 EDT):** Concept **A** for brand fidelity; **B** if maximum 16px letter clarity is required.

Do not replace production icons until owner selects A/B/C.

---

## Important file map

```
src/app/favicon.ico / icon.png / apple-icon.png / manifest.ts   # live pack
public/icons/*                                                  # live PNGs
public/brand/IronEagle_Mark.svg                                 # live master
public/brand/IronEagle_Mark_Favicon.svg                         # live small master
public/brand/favicon-concepts/                                  # round 1 (local commit)
public/brand/favicon-redesign/                                  # round 2 (local commit) ← review here
scripts/generate-icons.mjs
scripts/make-favicon-concept-comparison.mjs
scripts/make-favicon-redesign-comparison.mjs
src/app/start-your-project/ + api/project-inquiry/
src/lib/airtable.ts / airtableLeads.ts / business.ts
PROGRESS.md
```

---

## Changelog (append-only, newest first)

### 2026-07-13 18:28 EDT � Build PASS; push favicon concept commits to GitHub
- 
pm run lint / 
px tsc --noEmit / 
pm run build PASS.
- Committing timestamped PROGRESS and pushing local cfcede4 + 9ccf150 (+ this note) to origin/main.
- Production favicon artwork still unchanged until owner selects A/B/C.

### 2026-07-13 18:24 EDT — PROGRESS timestamp pass
- Added/standardized timestamps across status, git snapshot, deployments, verification, open items, and changelog.
- Clarified local vs production favicon state and unpushed commits.

### 2026-07-13 17:37:44 −0400 — Favicon redesign concepts (`9ccf150`, not pushed)
- Diagnosed live tab failure: mark too small + abstract core → yellow dot / eye / shield.
- Added `public/brand/favicon-redesign/` A/B/C (~75–85% canvas, navy grounds).
- Generated `favicon-browser-tab-comparison.png` with real 16px tab simulations.
- Production favicon infrastructure untouched.
- **Status:** New brand-faithful concepts ready for owner review.

### 2026-07-13 17:07:50 −0400 — Favicon concept alternatives (`cfcede4`, not pushed)
- Added round-1 concepts under `public/brand/favicon-concepts/`.
- Later treated as insufficient for brand/tab recognition.

### 2026-07-13 15:48:49 −0400 — Document favicon production verification (`51c5960`, pushed)
- Recorded production verification of favicon pack in PROGRESS.

### 2026-07-13 15:45:17 −0400 — Favicon and application icon pack (`a502628`, pushed + deployed)
- Audited icons; deleted obsolete `favicon.ico.bak` (stock Next.js ICO).
- Generated live pack from `IronEagle_Mark.svg` / `IronEagle_Mark_Favicon.svg`.
- Added `src/app/manifest.ts`; fixed layout metadata (removed `/logos/logo.svg` icon declaration).
- Vercel production READY (`dpl_7LbyBjg…`).
- **Later note:** Visual mark rejected for brand resemblance in browser tabs; infrastructure kept.

### 2026-07-13 14:16:50 −0400 — Questionnaire + pricing/portfolio (`5e78dd2`, pushed + deployed)
- Confirmed Production Airtable env working; did not recreate credentials.
- Deployed questionnaire routes; E2E Airtable write succeeded (test Lead for deletion).
- Created initial PROGRESS handoff.
- **Status at time:** Fully verified and working for questionnaire path.
