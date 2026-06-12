---
name: compact-landing
description: >-
  Apply a compact tactile UI style system for narrow product pages, package demos,
  developer-tool landing pages, documentation intros, and polished micro-SaaS pages.
  Use when an interface should feel precise, quiet, dense, and premium: centered
  compact layouts, tiny monospace metadata, neutral-white surfaces, width-stable
  animated labels, hairline separators, small tactile controls, subtle depth,
  restrained CSS motion, and a simple but distinct composition per page.
---

# Compact Landing

Use this skill to build compact, tactile, premium landing pages with precision UI density.
It is portable across models and stacks: treat it as a visual-system recipe, not a dependency on one repo.

## Preflight

Before implementing, ask the user these questions unless they already answered them or explicitly told you to choose defaults:

1. What product is the page for, and what is the primary CTA?
2. What button size should set the interface tone: compact, medium, or large?
3. Based on the CTA and button size, ask one better follow-up about layout density and choose a lead layout: Instrument, Console, Ledger, Workbench, or Manual.
4. Based on the product category, ask one better follow-up about theme direction: neutral-light, soft-dark, editorial-white, or product-tinted.
5. Should corners feel sharp, balanced, or softly rounded?
6. Should the page use load transitions: none, subtle fade-in/out, or staggered fade/slide?
7. How much content is needed: CTA-only, concise proof, or compact product walkthrough?

If the user wants you to proceed without answering, use these defaults: Instrument layout, neutral-light theme, balanced small radii, subtle staggered fade on load, one clear CTA, one proof row group, one install/action block, and one compact detail/code section.

## Style Model

Create a page that feels like a small, finished instrument:

- Use a compact composition, not a wide marketing layout.
- Keep the primary CTA visible early and repeat it only when it reduces friction.
- Use restrained neutral-white surfaces with zinc ink and tiny green/amber status accents.
- Let spacing do most hierarchy work; avoid hero drama, gradients as decoration, big cards, badges, or feature grids.
- Make every interactive element feel tactile through tiny scale-on-press, shadow depth, and stable label widths.
- Favor mono metadata, command fields, segmented controls, code cards, rows, and live micro-demos.

When exact values matter, read `references/style-dna.md`. Use those values as defaults, then adapt only when the product context requires it.

## Build Rules

1. Page shell: center content with `display: grid; place-items: center; min-height: 100dvh; overflow-x: clip`.
2. Main column: use `max-width: 440px`, `width: 100%`, `padding: 56px 24px`; on mobile use `36px 18px 44px`.
3. Type: use `Geist` for UI, `Geist Mono` for metadata/code; base `14px/1.5`; global tracking `-0.01em`.
4. Palette: use off-black zinc ink, muted zinc secondary text, white surfaces, 7% black hairlines, green success, amber busy.
5. Depth: use layered shadow rings plus subtle inset highlight instead of visible borders on controls/cards.
6. Radius: keep small and precise: `6px` controls, `9px` command fields, `10px` code cards. Avoid pill-heavy UI except true status dots.
7. Layout rhythm: header margin `6px`, tagline margin `36px`, demo rows `52px` tall, section gaps `36-44px`, usage head gap `12px`, footer margin `44px`.
8. Motion: use `cubic-bezier(0.2, 0, 0, 1)`, 120ms press transforms, 220-300ms fades, 600ms page entrance staggered by 90ms.
9. Label stability: lock animated label widths to the widest state so text rolls never shift layout. Any slot-text, counter, tab, copied label, or command label must reserve its final width before animation starts.
10. Button scale: ask the user to choose `compact`, `medium`, or `large`, then apply it consistently. Compact = 24-28px tall, `4-6px 8-9px` padding, 11-12px label. Medium = 32-36px tall, `7-9px 11-13px` padding, 12.5-13px label. Large = 40-44px tall, `10-12px 14-16px` padding, 13.5-14px label. Even large buttons must still feel compact and precise.
11. Assistant buttons: for AI-doc or `llms.txt` actions, use an `.llms-btn` pattern with inline flex, 5px gap, small mono label, shadow-control, active scale `0.96`, and a width-locked slot-text label such as `.lockable { min-width: 52px; }`. Do not embed SVG markup in skill output; use the project icon system, an icon component, or a simple CSS dot/glyph.
12. No layout shift: animate only `opacity`, `transform`, and `filter`; never animate width, height, margin, padding, font-size, line-height, or grid tracks. Give rows, controls, tab bars, icon slots, code panels, counters, and preview cards stable dimensions before any animation runs.
13. Microinteractions: active buttons scale to `0.96`; wider command controls scale to `0.98`; icon swaps animate opacity, scale `0.25 -> 1`, blur `4px -> 0`.
14. Rows: use hairline separators and right-aligned controls; do not box every row.
15. Code: small mono card with translucent white surface, `blur(8px)`, `12.5px/1.7`, syntax accent only for keywords/strings.
16. CTA clarity: use one primary action verb, one supporting action at most, and never bury the CTA below a long explanation.
17. Information density: include only what helps a visitor decide or act: product name, plain promise, one proof/preview area, CTA/action block, and concise details.

## Variation Rules

Every page should look related to this system but not cloned from prior outputs. Before designing, choose one composition variant and make it visible in the first screen:

- **Instrument**: header, tagline, live rows, install command, compact usage code.
- **Console**: command field first, then short promise, tabs, logs, and one tiny action row.
- **Ledger**: stacked hairline rows with status dots, command field embedded between row groups, code below.
- **Workbench**: compact two-zone layout inside the same narrow column: controls above, output/code below.
- **Manual**: dense title block, install command, concise steps, one live preview row.

Vary at least three details per generation: section order, row count, command placement, tab labels, micro-demo type, accent token, icon set, footer links, or copy rhythm. Keep the same compact constraints: narrow page, quiet type, small controls, hairlines, stable animated labels, restrained motion, and no generic feature grid.

## Cross-Model Use

If the host model cannot load bundled references, copy the tokens and measurements from this `SKILL.md` first, then optionally paste `references/style-dna.md` for full precision.

If the target stack lacks CSS anchor positioning, use a simple active-tab background fallback. If it lacks Geist, use a clean geometric sans plus a true monospace. If JavaScript is not available, keep labels fixed-width with CSS `min-width` values.

## Avoid

- Wide SaaS hero sections, large display headings, centered slogan stacks, three-card feature rows.
- Oversized radii, neon glow, colored gradient backgrounds, purple-blue AI styling, emojis.
- Thick borders where a shadow ring should define the surface.
- Layout shifts during text animation or number changes.
- Heavy dependencies for simple motion; use CSS transforms and opacity first.

## Review Checklist

- Preflight questions were asked or the user explicitly accepted defaults.
- Primary CTA is clear in the first viewport and repeated only if useful.
- Column remains compact at desktop and mobile widths.
- The first screen clearly uses one chosen variation rather than the default sample structure.
- Text hierarchy is quiet: `h1` around 17px, section labels around 13px, row labels around 12px mono.
- All numbers use tabular numerals.
- Controls have at least tactile feedback and no `transition: all`.
- Buttons follow the chosen size scale: compact, medium, or large.
- `llms.txt` / assistant-copy buttons use `.llms-btn` with the locked 52px label width and no embedded SVG markup.
- Animations cause no layout shift: fixed/reserved dimensions are present before slot text, counters, panels, icons, or tabs animate.
- Section spacing uses the tight rhythm from this skill, not generic landing-page spacing.
- Animated labels are width-locked before state changes.
- Reduced motion preserves usability.
