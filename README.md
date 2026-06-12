# compact-landing

Agent skill for compact, premium product landing pages with one clear CTA and only the information needed to act.

```txt
product name
plain promise
compact proof rows
primary CTA
small detail/code block
quiet footer
```

## Install with the skills CLI

```bash
npx skills add Danilaa1/compact-landing-skill
```

Listed on [skills.sh](https://skills.sh).

## Install with npm

```bash
npx compact-landing install
```

The installer lets people choose where to install the skill:

```txt
1  All agents   Codex + Claude Code + Cursor + Gemini
2  Codex        ~/.agents/skills
3  Claude Code  ~/.claude/skills
4  Cursor       ~/.cursor/skills
5  Gemini       ~/.gemini/skills
```

## What It Gives Agents

```txt
question-first landing page workflow
compact layout variants
clear CTA hierarchy
quiet premium typography
tactile controls and command fields
stable animated labels and counters
hairline rows instead of noisy cards
restrained fade/stagger motion
```

When used, the skill asks a few preflight questions before implementing: product, CTA, layout, theme, corner style, load transition, and content depth. If the user asks it to choose, it uses compact defaults.

## Direct Installs

```bash
npx compact-landing install --agent codex
npx compact-landing install --agent claude
npx compact-landing install --agent cursor
npx compact-landing install --agent gemini
```

Install into the current project instead of your home folder:

```bash
npx compact-landing install --scope workspace
```

## Use

After installing, ask your agent:

```txt
Use compact-landing to create a premium compact landing page for this package.
```

## Release Surface

The public repo stays focused on the skill, docs, package metadata, and license:

```txt
skills/compact-landing/SKILL.md
skills/compact-landing/agents/openai.yaml
skills/compact-landing/references/style-dna.md
README.md
LICENSE
```

## Publish

```bash
npm publish
git push -u origin main
```
