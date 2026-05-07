# Portfolio Site — Handoff

**Working on:** Portfolio site build — SHIPPED
**Last action:** `npm run deploy` → Published to gh-pages ✓ | source pushed to `Kaoz625/portfolio` main branch ✓
**Next step:** Go to https://github.com/Kaoz625/portfolio/settings/pages → set source to `gh-pages` branch → enable HTTPS + set custom domain `portfolio.nyctailblazers.com`

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
