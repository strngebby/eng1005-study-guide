# ENG1005 Study Guide

Unofficial student notes for ENG1005, built with [Astro Starlight](https://starlight.astro.build).
Not affiliated with or endorsed by Monash University.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
```

## How the site is organised

```
astro.config.mjs              site settings and the list of weeks (sidebar)
src/content/docs/
  index.mdx                   home page
  week-1/, week-2/, week-3/   one folder per week, one .mdx file per page
src/data/week-N/figures.ts    3D figure definitions for that week (if it has any)
src/components/               reusable pieces (below)
src/styles/theme.css          Lavender Dusk colours, fonts, borders
src/styles/print.css          print rules (hides sidebar, keeps answers hidden)
src/lib/cards-plugin.mjs      turns every "## Heading" section into a card
```

Every `## Heading` in a page becomes a card automatically and appears in
"On this page". You don't need to write any card markup.

## Components

| Component | Use |
| --- | --- |
| `<Figure3D {...FIG.name} />` | Rotatable 3D figure with a slider. Put it at the end of a `##` section and it sits beside the text. |
| `<LinearMap />` | Interactive 2D transformation: preset buttons and a, b, c, d sliders for the matrix [a b; c d]. Put it at the end of a `##` section. |
| `` <Eq>{`...`}</Eq> `` | Monospace equation block. Line breaks and spaces are kept exactly. |
| `<Callout label="Watch out">…</Callout>` | Dashed side note. |
| `<StepReveal problem="…" steps={[['Name', 'working'], …]} />` | Worked solution revealed one step at a time. |
| `<Quiz questions={[[prompt, options or null, answer, hint, explanation], …]} />` | Instant-check quiz with a score. `null` options means a typed numeric answer. Otherwise `answer` is the index of the right option. |
| `<Reveal label="Hint">…</Reveal>` or `<Reveal label="Final answer" eq="…" />` | Hidden hint or answer. Never printed. |
| `<Problem n={1} q="…" steps={[['Name', 'working'], …]} a="…" />` | Problem-sheet item: working revealed one step at a time, then a hidden final answer. `steps` is optional. |
| `<Exercise q="…" hint="…" solution="…" />` | Question with a hidden hint and a hidden worked solution. |
| `<PrintButton />` | Print button. Hidden on paper. |

In `q`, `problem` and `solution` strings, `\n` starts a new line. Use `{'…'}`
instead of `"…"` when a string contains `\n`.

## Adding Week 4

1. **Copy a folder.** Duplicate `src/content/docs/week-3/` as `week-4/`
   and replace the content of each `.mdx` file. Keep the `sidebar.order`
   numbers in the frontmatter (1 to 5), because they set the order in the sidebar.
   Rename the challenge file to match its title (e.g. `my-challenge.mdx`).
2. **Add the week to the sidebar.** In `astro.config.mjs`, add one line to `weeks`:
   ```js
   const weeks = [
     { n: 1, topic: 'Vectors, lines and planes' },
     { n: 2, topic: 'Systems of linear equations' },
     { n: 3, topic: 'Matrices' },
     { n: 4, topic: 'Your week 4 topic' },
   ];
   ```
   This also makes `/week-4/` redirect to the week's introduction.
3. **Figures (optional).** Copy `src/data/week-2/figures.ts` to
   `src/data/week-4/figures.ts`, define your figures, and import them at the
   top of the introduction with `import { FIG } from '../../../data/week-4/figures';`.
   For a 2D transformation, use `<LinearMap />` instead.
   The item format is documented at the top of `src/lib/figure3d.ts`.
4. **Link it from the home page and 404 page.** Add a `<LinkCard>` to
   `src/content/docs/index.mdx` and a link to `src/content/docs/404.mdx`.
5. Run `npm run dev`, check the pages, then commit and push. GitHub Actions
   rebuilds and deploys the site automatically.

## Content rules

- Only the website source goes in this repository: no lecture slides, unit PDFs,
  assignments or personal submissions.
- Don't add marked assessments, their solutions, or adaptations of them.
