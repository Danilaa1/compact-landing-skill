# compact-landing

Build compact, tactile, premium landing pages with agents.

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
small premium layouts
quiet typography
tactile controls
stable animated labels
hairline separators
compact install blocks
polished micro-demos
```

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

## Publish

```bash
npm publish
git push -u origin main
```
