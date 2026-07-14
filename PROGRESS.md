# Iron Eagle Studio -- Progress Log

> **Purpose:** Machine-digestible handoff for any AI or teammate continuing this work.  
> **Update rule:** Append or revise this file on every meaningful code, deploy, or verification change. Include timestamps (`YYYY-MM-DD HH:MM TZ`).  
> **Timezone:** America/New_York (EDT, UTC-04:00) unless noted.  
> **Last updated:** 2026-07-13 20:40 EDT

---

## Current status (one line)

**2026-07-13 20:40 EDT -- Favicon replaced with Option B (IES initials, brass on navy)** -- eagle-head concept rejected; full logo Option A illegible at 16px; regenerating/deploying IES pack.

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
| Prior eagle-head commit (rejected) | `ff29a28` -- Replace production favicon with eagle head | 2026-07-13 |
| IES replace commit | *pending this pass* | 2026-07-13 20:40 EDT |

---

## Do / Do not (hard constraints)

### Do
- Reuse existing Vercel Airtable env vars; they are confirmed working in Production.
- Keep questionnaire Source = `Website` and put `Submission Type: Project Questionnaire` inside Message.
- Map Timeline onto Airtable selects only: `ASAP` | `2-4 weeks` | `1-2 months` | `Flexible`.
- Keep Airtable MCP / local tokens separate from Vercel production secrets.
- Commit/push only Iron Eagle marketing-site work on `main` (not HJH client-site branch content).
- Stamp every PROGRESS update with date + time + timezone.
- Regenerate favicons from `public/brand/favicon-ies.svg` via `scripts/generate-icons.mjs`.

### Do not
- Ship or regenerate from the rejected angular eagle-head concept SVGs.
- Point favicon metadata at `public/logos/logo.svg` (too large / illegible at 16px).
- Create, rotate, overwrite Airtable secrets without confirmed failure + owner approval.
- Blindly merge the `HJH` git branch into `main`.
- Print or log secret values.

---

## Latest production deployment (live site)

| Field | Value |
|-------|-------|
| Still live until IES deploy | Eagle-head pack `ff29a28` / favicon.ico **2257 B** (rejected) |
| IES local favicon.ico | **824 B**, SHA256 `BF7152624EF48808084B13E920D3C25F03946226BB5270B4A078D7506458E941` |
| IES Vercel deployment | *fill after deploy* |

---

## Favicon / app icons (selected production source)

**Selected (2026-07-13 20:40 EDT):** **Option B -- IES initials** (brass `#D4AF37` on deep navy `#0B1120`)

| Role | Source |
|------|--------|
| All sizes (16/32/48/180/192/512) | `public/brand/favicon-ies.svg` |

**Option A evaluated and not used:** `public/logos/logo.svg` (1152x768 landscape wordmark + mechanical eagle) is unreadable at 16x16 when squared.  
**Eagle-head concept:** rejected -- do not ship.

### Generated assets (local)

| Path | Dimensions | Size |
|------|------------|------|
| `src/app/favicon.ico` | 16/32/48 | 824 B |
| `src/app/icon.png` | 512x512 | 9073 B |
| `src/app/apple-icon.png` | 180x180 | 1341 B (opaque navy) |
| `public/icons/favicon-16x16.png` | 16x16 | 206 B |
| `public/icons/favicon-32x32.png` | 32x32 | 235 B |
| `public/icons/favicon-48x48.png` | 48x48 | 329 B |
| `public/icons/android-chrome-192x192.png` | 192x192 | 1545 B |
| `public/icons/android-chrome-512x512.png` | 512x512 | 9073 B |
| `public/icons/maskable-icon-512x512.png` | 512x512 | 9207 B |

Metadata paths unchanged: `/favicon.ico`, `/icon.png`, `/apple-icon.png`, `/manifest.webmanifest`. Theme `#0B1120`.

### Local verification

| Check | Result |
|-------|--------|
| 16px dark tab | PASS (IES readable) |
| 16px light tab | PASS |
| Apple / circular mask | PASS |
| lint / tsc / build | PASS |

---

## Open items / risks

| # | Item | Status | Noted |
|---|------|--------|-------|
| 1 | Delete Airtable test Lead `Iron Eagle Test Submission` | Open | 2026-07-13 |
| 2 | IES favicon production deploy | In progress | 2026-07-13 20:40 EDT |
| 3 | HJH branch previews on same Vercel project | Ongoing risk | 2026-07-13 |
| 4 | Favicon cache -- use `?v=ies` / incognito after deploy | Pending | 2026-07-13 20:40 EDT |

---

## Changelog (append-only, newest first)

### 2026-07-13 20:40 EDT -- Replace rejected eagle-head favicon with Option B (IES)
- Owner rejected eagle-head icon; preferred Option A (actual logo) or Option B (IES).
- Option A (`public/logos/logo.svg`) fails 16px legibility -- chose Option B.
- Added `public/brand/favicon-ies.svg`; updated `scripts/generate-icons.mjs`; regenerated full pack.
- Local lint/tsc/build PASS. Deploy verification continuing.

### 2026-07-13 18:50 EDT -- Eagle-head pack deployed (later rejected)
- Commit `ff29a28` / deploy `dpl_7nAbc7mQarLNuc4ZuDR5aGNeCzW3` -- later visually rejected by owner.

### 2026-07-13 15:45 EDT -- Favicon infrastructure (`a502628`)
- File-based icon pack + manifest introduced.

### 2026-07-13 14:16 EDT -- Questionnaire + pricing (`5e78dd2`)
- Airtable inquiry path verified.
