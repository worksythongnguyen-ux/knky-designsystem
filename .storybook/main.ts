import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';

// Workaround for a known Storybook 10.x bug: the MDX compiler emits "file://" URL
// import specifiers for its own internal helpers (e.g. mdx-react-shim), which
// Rollup does not resolve on its own even though the URL points at a real file.
// This breaks any .mdx docs page. See:
// https://github.com/storybookjs/storybook/issues/33537
function fixMdxFileUrlImports() {
  return {
    name: 'fix-mdx-file-url-imports',
    enforce: 'pre' as const,
    resolveId(id: string) {
      if (id.startsWith('file://')) {
        try {
          return fileURLToPath(id);
        } catch {
          return null;
        }
      }
      return null;
    },
  };
}

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite",
  // The project's root vite.config.ts is written for building the *library*
  // (single entry, lib mode, react externalized) — that config doesn't apply to
  // Storybook's own preview app and breaks its build if merged in as-is.
  // Strip those library-only options out for Storybook's build.
  async viteFinal(viteConfig) {
    if (viteConfig.build) {
      delete viteConfig.build.lib;
      if (viteConfig.build.rollupOptions) {
        delete viteConfig.build.rollupOptions.external;
        delete viteConfig.build.rollupOptions.output;
      }
    }
    viteConfig.plugins = viteConfig.plugins ?? [];
    viteConfig.plugins.push(fixMdxFileUrlImports());
    return viteConfig;
  }
};
export default config;