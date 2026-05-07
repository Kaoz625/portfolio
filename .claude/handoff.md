# Portfolio Site — Handoff

**Working on:** Portfolio site build — logo, all components, deploy
**Last action:** `npm run deploy` running (gh-pages push)
**Next step:** `cd "~/Syncthing/Brain/Markus Brain/NYCTailblazers/Projects/websites/portfolio-site" && npm run deploy` (if not done) → then verify at kaoz625.github.io/portfolio

## Key files changed this session
- `src/components/Logo.tsx` — dual-dog SVG (BOTH Jiggs + Glo)
- `src/components/ProjectGrid.tsx` — NEW (search, filter, modal)
- `src/components/ContactSection.tsx` — NEW
- `src/components/Footer.tsx` — NEW (privacy disclosure)
- `src/data/projects.ts` — 31 projects (was 16)
- `src/hooks/useAttention.ts` — touch events added
- `public/favicon.svg` — dual-dog mark
- `public/manifest.json` — NEW (PWA)
- `index.html` — PWA meta added

## Blockers
- OpenAI image gen: all 9 accounts at billing limit. For the logo reference PNG, either top up an OpenAI account or use fal.ai/Replicate. The SVG logo is functional without it.
- Screenshots: need to take/source screenshots for all 31 projects (`public/screenshots/`)
- PostHog: needs to be deployed on Coolify → then update `src/lib/posthog.ts` with real endpoint

## Memory changes this session
- `~/.claude-team/shared-memory/` — CREATED (shared knowledge hub for all 7 profiles)
- `~/CLAUDE.md` — shared-memory added to session start checklist
- This profile's `MEMORY.md` — GitHub + brand identity entries added
