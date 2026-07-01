# @worksythongnguyen-ux/knky-ui

React component library generated from the Figma design system **KNKY**.

## Project structure

```
knky-ui/
├─ src/
│  ├─ tokens/
│  │  └─ tokens.css        ← Design tokens (color, spacing, radius...) pulled from Figma Variables
│  ├─ components/
│  │  └─ Button/
│  │     ├─ Button.tsx           ← Component logic
│  │     ├─ Button.module.css    ← Styles, matches the Figma design
│  │     ├─ Button.stories.tsx   ← Storybook story
│  │     └─ index.ts
│  └─ index.ts              ← Main entry point, exports all components
├─ package.json
├─ vite.config.ts           ← Library mode build config
└─ tsconfig.json
```

## Build & try it out

```bash
npm install
npm run build       # outputs to dist/
```

Once `dist/` is built, the package can be published to npm (public or an internal
private registry), or linked locally with `npm link` / `file:../knky-ui` to test in
another project first.

## Using it in another project

```tsx
import { Button } from "@worksythongnguyen-ux/knky-ui";
import "@worksythongnguyen-ux/knky-ui/styles.css"; // import once at the app root (e.g. App.tsx)

function Example() {
  return <Button onClick={() => alert("clicked")}>Save</Button>;
}
```

## Deployment & CI/CD

This project ships with 2 GitHub Actions workflows in `.github/workflows/`:

1. **`deploy-storybook.yml`** — every push to `main` automatically builds the
   Storybook preview site and deploys it to GitHub Pages. Devs/designers visit
   that link to see components live and copy usage code, no local setup needed.
2. **`publish-package.yml`** — every time a new version tag is pushed
   (`git tag v0.2.0 && git push origin v0.2.0`), the package is automatically
   built and published to **GitHub Packages** (a private, internal npm registry).
   Devs just run `npm update` to get the latest version instead of copy-pasting code.

### Privacy note

- **GitHub Packages** (private npm): always follows the repo's access permissions —
  only people with repo access can `npm install` it. Safe for the package itself.
- **GitHub Pages** (Storybook site): on GitHub Free/Pro/Team, Pages always gets a
  public URL — anyone with the link can view it (not indexed by search, but the URL
  itself isn't truly private), unless the org is on GitHub Enterprise Cloud (which
  supports fully private Pages). If the preview site needs to be fully private,
  consider deploying to Vercel/Netlify with password protection instead, or hosting
  it internally behind a company VPN.

## Workflow for adding new components

Every time a new component is read from Figma, a new folder is created under
`src/components/<ComponentName>/` following the same pattern as `Button`, then one
export line is added to `src/index.ts`. No changes needed to the overall project
structure.

## Components

| Component | Status | Figma source |
|---|---|---|
| `Button` | ✅ Done | node `75:11225` — "button - primary" |
