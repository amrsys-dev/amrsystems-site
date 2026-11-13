# AMR Systems homepage redesign

This revision keeps the existing Next.js app structure, product routes, translations, RTL support, authentication routes, and `public/apps.json` launch configuration.

## Visual changes
- Replaced the homepage with a graphite / silver / copper / cyan visual system.
- Added the supplied official AMR monogram assets (`public/amr-monogram.jpg` and `public/amr-monogram-glow.jpg`). The mark itself is not redrawn or altered.
- Added a short, skippable intro animation, shown once per browser session and skipped for users who prefer reduced motion.
- Added hero, ecosystem overview, product cards, AMR approach, and closing sections.
- Updated metadata and browser theme color.

## Important validation note
A production build has not yet been verified in this environment. Dependency installation timed out, and `next` was unavailable when `npm run build` was attempted. Run `npm ci` and `npm run build` in the deployment environment before publishing.

No production deployment, GitHub push, DNS change, or Vercel configuration change was performed.
