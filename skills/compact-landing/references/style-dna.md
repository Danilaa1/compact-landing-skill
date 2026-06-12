# Compact Landing Style DNA

Source style: a compact premium landing page built from split CSS layers (`tokens`, `base`, `atoms`, `molecules`, `organisms`). This reference is self-contained so it can be reused across products and model providers.

## Essence

The style behaves more like a precise UI component demo than a marketing site. It is centered, narrow, quiet, tactile, and extremely measured. Visual interest comes from tiny live controls, width-stable animated text, hairline separators, layered shadows, and small motion.

The product action stays central. Start from the primary CTA, then add only enough context for a visitor to understand the product, trust the action, and move.

## Layout Measurements

Use these as defaults, not a frozen template. Preserve compact density while varying section order and component mix when the product context allows it.

- `body`: `display: grid`, `place-items: center`, `min-height: 100dvh`, `overflow-x: clip`.
- `main`: `width: 100%`, `max-width: 440px`, `padding: 56px 24px`.
- Mobile `main` at `max-width: 480px`: `padding: 36px 18px 44px`.
- Header `.top`: flex row, wrap enabled, `gap: 8px 12px`, `margin-bottom: 6px`.
- Header right `.top-right`: inline flex, `gap: 10px`; mobile `gap: 8px`.
- Tagline: `margin: 0 0 36px`; mobile bottom `28px`.
- Demo rows block: `margin-bottom: 44px`; mobile `36px`.
- Install block: `margin-bottom: 36px`; mobile `28px`.
- Usage header: flex row between title and tabs, `margin-bottom: 12px`; mobile column with `gap: 10px`.
- Footer: `margin-top: 44px`; mobile `36px`, wrapping with `gap: 6px 12px`.

## Color Tokens

```css
--ink: #18181b;
--ink-2: #52525b;
--ink-3: #a1a1aa;
--hairline: rgba(0, 0, 0, 0.07);
--green: #22c55e;
--amber: #f59e0b;
--surface: rgba(255, 255, 255, 0.72);
--control-bg: #ffffff;
--pill-bg: #ffffff;
--tabs-bg: rgba(0, 0, 0, 0.05);
--bg: radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #fafafa 60%, #f4f4f5 100%);
--code-k: #7c3aed;
--code-s: #0f766e;
```

Use zinc neutrals as the system base. Green and amber are functional, not decorative. Purple and teal appear only inside code syntax highlighting.

## Typography

- Sans: `"Geist", ui-sans-serif, system-ui, -apple-system, sans-serif`.
- Mono: `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace`.
- Global: `font: 400 14px/1.5 var(--font-sans)`, `letter-spacing: -0.01em`, `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`.
- `h1`: `17px`, weight `600`, tracking `-0.02em`.
- `h2`: `13px`, weight `600`, color `--ink-2`, margin bottom `12px`.
- Metadata/footer/row labels: `12px/1` mono, muted zinc.
- Control labels: `11-13px`, medium weight.
- Counter: `16px/1.3`, weight `600`, `font-variant-numeric: tabular-nums`, tracking `-0.02em`.
- Code: `12.5px/1.7` mono.
- Body tagline uses `text-wrap: pretty`.

## Radii

```css
--radius-sm: 6px;
--radius-md: 9px;
--radius-lg: 10px;
```

Use small radii. The feel should be machined and compact, not bubbly.

## Shadows And Surfaces

Controls use shadow rings instead of borders:

```css
--shadow-control:
  0 0 0 1px rgba(0, 0, 0, 0.1),
  inset 0 1px 0 rgba(255, 255, 255, 0.9),
  0 2px 5px rgba(0, 0, 0, 0.08);
```

Cards/command fields use a softer layered surface:

```css
--shadow-card:
  0 0 0 1px rgba(0, 0, 0, 0.06),
  inset 0 1px 0 rgba(255, 255, 255, 0.9),
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 6px 16px rgba(0, 0, 0, 0.06);
```

Tabs use:

```css
--shadow-pill:
  0 0 0 1px rgba(0, 0, 0, 0.06),
  0 1px 2px rgba(0, 0, 0, 0.07);
```

## Components

Combine components in different compact sequences. Do not always emit header -> tagline -> rows -> install -> usage. Pick a composition from `SKILL.md` and adapt these atoms to it.

### Header

- Left: product name, quiet `h1`.
- Right: one tiny action button, mono metadata links, 16px GitHub icon.
- Header wraps naturally instead of hiding content.

### Tiny Button

- `font-weight: 560`, `font-size: 12.5px`, `line-height: 1`.
- `padding: 5px 9px`, `border-radius: 6px`, `box-shadow: --shadow-control`.
- Active: `transform: scale(0.96)`.

### Button Scale

Ask the user to pick one size before implementation and apply it consistently:

- Compact: 24-28px tall, `4-6px 8-9px` padding, 11-12px label.
- Medium: 32-36px tall, `7-9px 11-13px` padding, 12.5-13px label.
- Large: 40-44px tall, `10-12px 14-16px` padding, 13.5-14px label.

Large does not mean loud. Keep shadow rings, tight radii, stable labels, and precise press feedback.

### LLMS Button

Use this exact pattern for assistant-doc copy actions such as `llms.txt`.

```html
<button class="llms-btn" type="button" id="copy-llms" title="Copy usage doc for AI assistants">
  <span class="llms-icon" aria-hidden="true"></span>
  <span class="lockable slot-text">llms.txt</span>
</button>
```

```css
.llms-btn {
  appearance: none;
  border: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #fff;
  color: var(--ink-2);
  font: 500 11px/1 var(--font-mono);
  letter-spacing: var(--tracking);
  box-shadow: var(--shadow-control);
  transition: color 120ms var(--ease-out), transform 120ms var(--ease-out);
}

.llms-btn:hover {
  color: var(--ink);
}

.llms-btn:active {
  transform: scale(0.96);
}

.llms-btn .llms-icon {
  width: 11px;
  height: 11px;
  flex: none;
  border-radius: 999px;
  background: currentColor;
}

.llms-btn .lockable {
  min-width: 52px;
}
```

Keep generated `slot-text` character spans inside `.lockable`; do not animate label width. Hover changes color only; active scales `0.96`. Do not include embedded SVG markup in the skill output; use the project icon system, an icon component already available in the app, or the CSS icon placeholder above.

### Demo Rows

- `.row`: flex between label and control, `gap: 12px`, `min-height: 52px`.
- Use top hairline for every row and bottom hairline on the last row.
- `.row-name`: mono `12px/1`, muted.

### Status

- Bare inline button, no surface.
- Dot: `7px`, green, halo `0 0 0 3px rgba(34, 197, 94, 0.18)`.
- Busy state swaps to amber with matching halo.

### Install Command

- Full-width command field.
- Mono `12.5px/1`, weight `500`, `gap: 10px`, `padding: 10px 12px`.
- Radius `9px`, shadow-card, white background.
- Active: `scale(0.98)`.
- Dollar prefix uses muted zinc; command label flexes left; trailing icon `15px`.

### Tabs

- Wrapper: inline flex, `gap: 2px`, `padding: 2px`, `border-radius: 8px`, translucent black `5%` background.
- Tab: `11.5px/1`, medium, `padding: 5px 10px`, radius `6px`.
- Active/hover pill uses CSS anchor positioning where available; fallback sets active background and shadow.

### Code Card

- `display: grid`; all panels share `grid-area: 1 / 1`.
- `font: 400 12.5px/1.7 var(--font-mono)`.
- `background: rgba(255,255,255,0.72)`, `backdrop-filter: blur(8px)`.
- `border-radius: 10px`, `padding: 14px 16px`, `overflow-x: auto`, shadow-card.
- Inactive panels: `opacity: 0`, `filter: blur(3px)`, `translateY(3px)`.
- Active panels: `opacity: 1`, `filter: blur(0)`, `translateY(0)`.

## Motion

```css
--ease-out: cubic-bezier(0.2, 0, 0, 1);
--ease-and-timing: 260ms var(--ease-out);
--fade: 220ms var(--ease-out);
```

- Page entrance: only when `prefers-reduced-motion: no-preference`.
- Each direct child of `main`: `opacity: 0`, `animation: enter 600ms var(--ease-out) forwards`.
- Stagger delays: `0ms`, `90ms`, `180ms`, `270ms`, `360ms`, `450ms`.
- Entrance starts at `translateY(6px)` and `blur(3px)`.
- Layout must not move during animation. Reserve exact dimensions before animation starts: `min-height` on rows/cards/previews, fixed `width/height` on icons, `min-width` on slot labels, tabular numerals on counters, and single-grid-area panels for code/preview swaps.
- Animate only `opacity`, `transform`, and `filter`. Do not transition `all`; do not animate `width`, `height`, `margin`, `padding`, `font-size`, `line-height`, `left`, `top`, or grid/flex sizing.
- Icon swap transitions: opacity, transform, filter over `300ms`.
- Hidden icon state: `opacity: 0`, `scale(0.25)`, `blur(4px)`.
- Visible icon state: `opacity: 1`, `scale(1)`, `blur(0)`.

## Interaction Behavior

- Cursor is `crosshair` on buttons, links, and tabs.
- Animated labels must be width locked to the widest possible state before animation.
- Slot-text labels must render inside a fixed or min-width wrapper; generated character spans are allowed, but parent width must not change between words.
- Swapping panels should share one grid cell, with inactive panels `position` or grid-overlapped so card height is stable.
- Counter must use tabular numbers.
- Copy action returns after about `1400ms`.
- Counter updates slowly, around every `2800ms`, with small non-round deltas.

## Portable Implementation Notes

- CSS-only implementation is preferred. Use framework state only for demo state, tab state, or copied/busy flags.
- If using React/Vue/Svelte, keep animated labels as leaf components so parent layout does not re-render continuously.
- If using Tailwind, translate values directly instead of approximating with large default utilities. Example: `max-w-[440px]`, `px-6`, `py-14`, `rounded-[6px]`.
- If publishing this as a design preset, expose the color, shadow, radius, motion, and spacing values as tokens.
- If adapting to dark mode, preserve the compact rhythm and small typography; invert surfaces carefully instead of adding glow.

## Content Tone

Use concrete developer-tool language:

- Product name first.
- One plain tagline.
- One primary CTA with a short command or action label.
- Rows showing small live demos.
- Installation command as a tactile field.
- Short usage code with tabs.
- Footer with license and package/framework links.

Avoid broad claims, hype, fake social proof, giant metrics, or long marketing copy.
