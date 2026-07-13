# Iron Eagle Studio -- Progress Log

> **Purpose:** Machine-digestible handoff for any AI or teammate continuing this work.  
> **Update rule:** Append or revise this file on every meaningful code, deploy, or verification change. Include timestamps (`YYYY-MM-DD HH:MM TZ`).  
> **Timezone:** America/New_York (EDT, UTC-04:00) unless noted.  
> **Last updated:** 2026-07-13 18:50 EDT

---

## Current status (one line)

**2026-07-13 18:50 EDT -- Concept A (Angular Eagle Head) fully deployed and verified on production** -- live favicon bytes are the eagle-head pack; abstract yellow-dot mark retired.

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
| Production replace commit | `ff29a286994005c010fa9f12531bc4699364da1c` -- `Replace production favicon with eagle head` | 2026-07-13 ~18:43 EDT |
| Push status | Pushed to `origin/main` | 2026-07-13 ~18:43 EDT |
| Vercel deployment | `dpl_7nAbc7mQarLNuc4ZuDR5aGNeCzW3` READY on production aliases | 2026-07-13 ~18:43-18:50 EDT |

---

## Do / Do not (hard constraints)

### Do
- Reuse existing Vercel Airtable env vars; they are confirmed working in Production.
- Keep questionnaire Source = `Website` and put `Submission Type: Project Questionnaire` inside Message.
- Map Timeline onto Airtable selects only: `ASAP` | `2-4 weeks` | `1-2 months` | `Flexible`.
- Keep Airtable MCP / local tokens separate from Vercel production secrets.
- Commit/push only Iron Eagle marketing-site work on `main` (not HJH client-site branch content).
- Stamp every PROGRESS update with date + time + timezone.
- Regenerate favicons from Concept A eagle-head SVGs via `scripts/generate-icons.mjs`.

### Do not
- Create, rotate, overwrite, or ask the owner to recreate `AIRTABLE_API_KEY` / `AIRTABLE_BASE_ID` / `AIRTABLE_LEADS_TABLE` unless a confirmed auth failure + explicit owner approval.
- Write unsupported Airtable select values (e.g. Source = `Project Questionnaire`, legacy Project Type / Ownership Preference).
- Blindly merge the `HJH` git branch into `main` (HJH branch = client storm-shelter site; previews have deployed from it on the same Vercel project).
- Print or log secret values.
- Claim full success without a real production Airtable write.
- Point favicon metadata at `public/logos/logo.svg`.
- Scale full 512 artwork down for 16px tabs -- use `eagle-head-small.svg` for 16/32/48.
- Run another favicon concept round; Concept A is approved.

---

## Environment variables

| Variable | Used by website? | Production status | Verified |
|----------|------------------|-------------------|----------|
| `AIRTABLE_API_KEY` | Yes (`src/lib/airtable.ts`) | Present and working | 2026-07-13 ~14:00-14:30 EDT |
| `AIRTABLE_BASE_ID` | Yes | Present and working | same |
| `AIRTABLE_LEADS_TABLE` | Optional (defaults `Leads`) | Working | same |
| `AIRTABLE_TOKEN` | No (MCP/local only) | Not required for site | -- |

---

## Latest production deployment (live site)

| Field | Value |
|-------|-------|
| Prior (rejected abstract) favicon commit | `a5026286d9c09c54831d07be4bf117b97fd12d3b` |
| Prior favicon.ico | **1456 B**, SHA256 prefix `873506EDFC44217A` |
| Eagle-head replace commit | `ff29a286994005c010fa9f12531bc4699364da1c` |
| Vercel deployment ID | `dpl_7nAbc7mQarLNuc4ZuDR5aGNeCzW3` |
| Deployment state | READY (production) |
| Domains | `ironeaglestudio.com`, `www.ironeaglestudio.com` |
| New favicon.ico | **2257 B**, SHA256 `03C3154BFC545B2373A32A7B895FE3E55A725088E668ABE625D671BDA210EE88` |

Production asset HTTP checks (all **200**): `/favicon.ico`, `/icon.png`, `/apple-icon.png`, `/icons/favicon-{16,32,48}x{16,32,48}.png`, `/icons/android-chrome-{192,512}x{192,512}.png`, `/icons/maskable-icon-512x512.png`, `/manifest.webmanifest`. `www` favicon matches apex (2257 B). Cache-bust `?v=eagle-head` confirmed.

Live tab verification used production 16px bytes in dark/light Chrome-like tabs -- eagle head + hooked beak visible; yellow-dot retired. Screenshot: `tmp-icon-preview/prod-eagle-head-tab-verify.png` (gitignored) and Cursor `prod-eagle-head-tab-verify.png`.

---

## What is live vs local

**Production:** Concept A eagle-head pack (`ff29a28` / `dpl_7nAbc7mQarLNuc4ZuDR5aGNeCzW3`).

Also live / kept:
- Questionnaire + Airtable inquiry path
- File-based favicon infrastructure (`favicon.ico` / `icon.png` / `apple-icon.png` / `manifest.ts`)
- Concept archive under `public/brand/favicon-concepts/` and `public/brand/favicon-redesign/`

---

## Favicon / app icons (selected production source)

**Selected concept (2026-07-13):** **A -- Angular Eagle Head**

| Role | Source SVG |
|------|------------|
| 16x16 / 32x32 / 48x48 (browser tabs) | `public/brand/favicon-redesign/eagle-head-small.svg` |
| 180x180 / 192x192 / 512x512 | `public/brand/favicon-redesign/eagle-head.svg` |

Colors: Brass `#D4AF37`, Deep navy `#0B1120`. No gradients, shadows, thin strokes, or decorative circles.

### Generated assets

| Path | Dimensions | Size | Background | Source SVG |
|------|------------|------|------------|------------|
| `src/app/favicon.ico` | 16/32/48 multi | 2257 B | Navy tiles | eagle-head-small |
| `src/app/icon.png` | 512x512 | 12905 B | Navy | eagle-head |
| `src/app/apple-icon.png` | 180x180 | 3223 B | Opaque navy | eagle-head |
| `public/icons/favicon-16x16.png` | 16x16 | 418 B | Navy | eagle-head-small |
| `public/icons/favicon-32x32.png` | 32x32 | 739 B | Navy | eagle-head-small |
| `public/icons/favicon-48x48.png` | 48x48 | 1046 B | Navy | eagle-head-small |
| `public/icons/android-chrome-192x192.png` | 192x192 | 3403 B | Navy | eagle-head |
| `public/icons/android-chrome-512x512.png` | 512x512 | 12905 B | Navy | eagle-head |
| `public/icons/maskable-icon-512x512.png` | 512x512 | 11796 B | Navy + ~72% safe zone | eagle-head |

Metadata paths (unchanged): `/favicon.ico`, `/icon.png`, `/apple-icon.png`, `/manifest.webmanifest`. Theme/background `#0B1120`. No obsolete `layout.tsx` favicon override. Manifest icons remain under `/icons/*`.

**Do not** point favicons at `public/logos/logo.svg`.

### Local + production verification (2026-07-13 ~18:40-18:50 EDT)

| Check | Result |
|-------|--------|
| 16px dark tab | PASS |
| 16px light tab | PASS |
| 32px / 48px clarity | PASS |
| Eagle recognition + hooked beak | PASS |
| No yellow-dot appearance | PASS |
| Apple touch (opaque navy) | PASS |
| Circular / rounded-square mask | PASS |
| lint / tsc / build | PASS |
| Production HTTP 200 + byte/hash change | PASS |

---

## Favicon redesign history

### Round 1 -- `public/brand/favicon-concepts/`
- Committed: `cfcede4` -- insufficient brand/tab recognition

### Round 2 -- `public/brand/favicon-redesign/`
- Committed: `9ccf150` -- A/B/C brand-faithful set
- **Owner approved Concept A** -- Angular Eagle Head (now production)

### Concepts not selected
- B IE Monogram -- stronger letter clarity, weaker Iron Eagle identity
- C Eagle + I -- too close to rejected abstract/symmetrical direction

Abstract production mark from `IronEagle_Mark.svg` / `IronEagle_Mark_Favicon.svg` is **retired** for favicon generation (files may remain as brand archives).

---

## Open items / risks

| # | Item | Status | Noted |
|---|------|--------|-------|
| 1 | Delete Airtable test Lead `Iron Eagle Test Submission` | Open | 2026-07-13 ~14:40 EDT |
| 2 | Favicon Concept A production replace | **Done** -- deployed + verified | 2026-07-13 18:50 EDT |
| 3 | Optional: `vercel env ls` for Preview/Development scopes | Optional | 2026-07-13 |
| 4 | Optional: Airtable MCP (separate from Vercel secrets) | Optional | 2026-07-13 |
| 5 | HJH branch previews on same Vercel project -- keep off production `main` | Ongoing risk | 2026-07-13 |
| 6 | No dedicated OG / Twitter social images | Follow-up | 2026-07-13 ~15:45 EDT |
| 7 | Favicon browser cache -- some existing tabs may need hard refresh / incognito | Mitigated (`?v=eagle-head` + byte verify) | 2026-07-13 18:50 EDT |

---

## Important file map

```
src/app/favicon.ico / icon.png / apple-icon.png / manifest.ts   # production pack (Concept A)
public/icons/*                                                  # production PNGs
public/brand/favicon-redesign/eagle-head.svg                    # large source of truth
public/brand/favicon-redesign/eagle-head-small.svg              # tab source of truth
scripts/generate-icons.mjs                                      # regenerates from eagle-head SVGs
public/brand/favicon-concepts/                                  # archived round 1
public/brand/IronEagle_Mark.svg                                 # brand archive (not favicon SoT)
src/app/start-your-project/ + api/project-inquiry/
src/lib/airtable.ts / airtableLeads.ts / business.ts
PROGRESS.md
```

---

## Changelog (append-only, newest first)

### 2026-07-13 18:50 EDT -- Production eagle-head favicon verified live
- Commit `ff29a28` pushed; Vercel `dpl_7nAbc7mQarLNuc4ZuDR5aGNeCzW3` READY on production domains.
- Production favicon.ico **2257 B** / SHA `03C3154B...` (old abstract **1456 B** / `873506ED...`).
- All listed icon + manifest URLs HTTP 200; live tab sim uses production 16px bytes -- eagle head confirmed.
- Abstract favicon retired from production.

### 2026-07-13 18:45 EDT -- Regenerate production favicon pack from Concept A
- Owner selected **Concept A: Angular Eagle Head**.
- Updated `scripts/generate-icons.mjs` source mapping (small -> 16/32/48; large -> 180/192/512).
- Regenerated full production pack; favicon.ico **2257 B** (was **1456 B** abstract).
- Local visual PASS on dark/light 16px tabs, beak visibility, apple, circular/rounded masks.
- `npm run lint`, `npx tsc --noEmit`, `npm run build` PASS.

### 2026-07-13 18:28 EDT -- Build PASS; push favicon concept commits to GitHub
- Concept archive commits on `origin/main`; production artwork later replaced by Concept A.

### 2026-07-13 18:24 EDT -- PROGRESS timestamp pass
- Standardized timestamps; clarified local vs production favicon state.

### 2026-07-13 17:37:44 -0400 -- Favicon redesign concepts (`9ccf150`)
- Added `public/brand/favicon-redesign/` A/B/C.

### 2026-07-13 17:07:50 -0400 -- Favicon concept alternatives (`cfcede4`)
- Round-1 concepts under `public/brand/favicon-concepts/`.

### 2026-07-13 15:48:49 -0400 -- Document favicon production verification (`51c5960`)
- Recorded abstract pack production verification.

### 2026-07-13 15:45:17 -0400 -- Favicon and application icon pack (`a502628`)
- Infrastructure + abstract mark deployed; later visually rejected for tab brand resemblance.

### 2026-07-13 14:16:50 -0400 -- Questionnaire + pricing/portfolio (`5e78dd2`)
- Questionnaire + Airtable path verified.
