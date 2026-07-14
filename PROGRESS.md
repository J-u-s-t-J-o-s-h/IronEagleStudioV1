# Iron Eagle Studio -- Progress Log

> **Purpose:** Machine-digestible handoff for any AI or teammate continuing this work.  
> **Update rule:** Append or revise this file on every meaningful code, deploy, or verification change. Include timestamps (`YYYY-MM-DD HH:MM TZ`).  
> **Timezone:** America/New_York (EDT, UTC-04:00) unless noted.  
> **Last updated:** 2026-07-14 07:45 EDT

---

## Current status (one line)

**2026-07-14 07:45 EDT -- Favicon uses eagle cropped from public/logos/logo.svg** -- wordmark excluded; brass eagle on navy; regenerating/deploying.

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
| Prior IES commit | `0a110df` -- Replace favicon with IES initials on navy | 2026-07-13 |
| Logo-eagle replace | *pending this pass* | 2026-07-14 07:45 EDT |

---

## Do / Do not (hard constraints)

### Do
- Reuse existing Vercel Airtable env vars; they are confirmed working in Production.
- Keep questionnaire Source = `Website` and put `Submission Type: Project Questionnaire` inside Message.
- Map Timeline onto Airtable selects only: `ASAP` | `2-4 weeks` | `1-2 months` | `Flexible`.
- Keep Airtable MCP / local tokens separate from Vercel production secrets.
- Commit/push only Iron Eagle marketing-site work on `main` (not HJH client-site branch content).
- Stamp every PROGRESS update with date + time + timezone.
- Regenerate favicons via `scripts/generate-icons.mjs` (eagle crop from `public/logos/logo.svg`).

### Do not
- Point browser-tab favicon metadata at full `public/logos/logo.svg` (includes wordmark; illegible at 16px).
- Ship rejected angular eagle-head concept SVGs.
- Blindly merge the `HJH` git branch into `main`.
- Print or log secret values.

---

## Favicon / app icons (selected production source)

**Selected (2026-07-14):** Eagle mark cropped from `public/logos/logo.svg` (wordmark excluded), on deep navy `#0B1120`.

| Role | Source |
|------|--------|
| Generator input | `public/logos/logo.svg` (eagle crop region) |
| Master square reference | `public/brand/favicon-eagle-from-logo.png` (512x512) |

### Generated assets (local)

| Path | Size / dims |
|------|-------------|
| `src/app/favicon.ico` | 2959 B (16/32/48) |
| `src/app/icon.png` | 512x512 / 93500 B |
| `src/app/apple-icon.png` | 180x180 / 13818 B |
| `public/icons/favicon-16x16.png` | 16x16 / 353 B |
| `public/icons/favicon-32x32.png` | 32x32 / 907 B |
| `public/icons/favicon-48x48.png` | 48x48 / 1645 B |
| `public/icons/android-chrome-192x192.png` | 192x192 / 15509 B |
| `public/icons/android-chrome-512x512.png` | 512x512 / 93500 B |
| `public/icons/maskable-icon-512x512.png` | 512x512 / 54963 B |

New favicon.ico SHA256: `870A67DC554EBA67AEA37DAA4CF7D034F18E8B14D790769C5217BA821ECA56A0`

Metadata paths unchanged. Theme `#0B1120`.

### Local verification

| Check | Result |
|-------|--------|
| 16px dark/light tab | PASS (eagle V silhouette visible) |
| 32px zoom | PASS |
| 512 master | PASS (full mechanical eagle, no wordmark) |
| lint / tsc / build | PASS |

---

## Changelog (append-only, newest first)

### 2026-07-14 07:45 EDT -- Favicon from logo.svg eagle crop
- Owner requested using the eagle from `public/logos/logo.svg` (not full wordmark, not IES, not angular head).
- Updated `scripts/generate-icons.mjs` to crop eagle, composite on navy, regenerate full pack.
- Wrote master `public/brand/favicon-eagle-from-logo.png`.
- Local lint/tsc/build PASS; deploy verification continuing.

### 2026-07-13 20:48 EDT -- IES favicon on production (superseded)
- Option B IES initials shipped; later superseded by logo-eagle request.

### 2026-07-13 18:50 EDT -- Eagle-head pack (rejected)
- Angular eagle-head concept deployed then rejected.
