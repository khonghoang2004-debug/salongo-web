# SalonGo Kasa — installers and auto-update feed

Nothing is hosted here any more (files of 200 MB do not belong in the site). Since 2026-11-25 everything comes from
the public GitHub repository `khonghoang2004-debug/salongo-kasa-releases`, one release per version (tag `v1.3.2`, …):

- Download buttons: `/kasa/download/mac | mac-intel | win` → `/api/download/kasa/<os>` → newest release asset
  `SalonGo-Kasa-arm64.dmg`, `SalonGo-Kasa-x64.dmg`, `SalonGo-Kasa-Setup.exe` (stable names).
- Auto-update (electron-updater "generic", feed `https://salongo.eu/kasa/updates/<mac|win>/`): `next.config.mjs`
  redirects every `/kasa/updates/<mac|win>/<file>` to `https://github.com/<repo>/releases/latest/download/<file>`.
  The release therefore also carries `latest-mac.yml`, `latest.yml` and the files they name
  (`SalonGo-Kasa-<ver>-mac-arm64.zip`, `SalonGo-Kasa-<ver>-mac-x64.zip`, `SalonGo-Kasa-Setup-<ver>.exe`, `.blockmap`s).
