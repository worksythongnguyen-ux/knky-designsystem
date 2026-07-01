/**
 * Metadata describing which tokens.css custom properties to display on the
 * "Design Tokens" Storybook docs page (DesignTokens.mdx), and how to label them.
 * The actual colors/sizes are never duplicated here — only the token names — so the
 * docs page always reflects whatever values currently live in tokens.css.
 */
import type { TokenEntry } from "./TokenPreview";

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

function scale(prefix: string): TokenEntry[] {
  return STEPS.map((step) => ({
    token: `--knky-color-${prefix}-${step}`,
    name: `${prefix}/${step}`,
  }));
}

export const primitiveColorGroups: { title: string; tokens: TokenEntry[] }[] = [
  {
    title: "Neutral",
    tokens: [
      ...scale("neutral"),
      { token: "--knky-color-neutral-white", name: "neutral/white" },
      { token: "--knky-color-neutral-black", name: "neutral/black" },
    ],
  },
  { title: "Brand", tokens: scale("brand") },
  { title: "Red", tokens: scale("red") },
  { title: "Blue", tokens: scale("blue") },
  { title: "Green", tokens: scale("green") },
  { title: "Pink", tokens: scale("pink") },
  { title: "Yellow", tokens: scale("yellow") },
  { title: "Orange", tokens: scale("orange") },
];

export const semanticColorGroups: { title: string; tokens: TokenEntry[] }[] = [
  {
    title: "Text",
    tokens: [
      { token: "--knky-color-text-primary", name: "text-primary" },
      { token: "--knky-color-text-secondary", name: "text-secondary" },
      { token: "--knky-color-text-disabled", name: "text-disabled" },
    ],
  },
  {
    title: "Background",
    tokens: [
      { token: "--knky-color-bg-page", name: "bg-page" },
      { token: "--knky-color-bg-surface", name: "bg-surface" },
      { token: "--knky-color-bg-surface-zebra", name: "bg-surface-zebra" },
      { token: "--knky-color-bg-hover", name: "bg-hover" },
      { token: "--knky-color-bg-surface-hover", name: "bg-surface-hover" },
      { token: "--knky-color-bg-disabled", name: "bg-disabled" },
      { token: "--knky-color-bg-surface-disabled", name: "bg-surface-disabled" },
    ],
  },
  {
    title: "Border",
    tokens: [
      { token: "--knky-color-border", name: "border" },
      { token: "--knky-color-border-hover", name: "border-hover" },
      { token: "--knky-color-border-active", name: "border-active" },
    ],
  },
  {
    title: "Status",
    tokens: [
      { token: "--knky-color-status-success-bg", name: "success-bg" },
      { token: "--knky-color-status-success-element", name: "success-element" },
      { token: "--knky-color-status-critical-bg", name: "critical-bg" },
      { token: "--knky-color-status-critical-element", name: "critical-element" },
      { token: "--knky-color-status-caution-bg", name: "caution-bg" },
      { token: "--knky-color-status-caution-element", name: "caution-element" },
    ],
  },
  {
    title: "Link",
    tokens: [
      { token: "--knky-color-link", name: "link" },
      { token: "--knky-color-link-hover", name: "link-hover" },
      { token: "--knky-color-link-active", name: "link-active" },
    ],
  },
  {
    title: "Brand (semantic)",
    tokens: [
      { token: "--knky-color-brand-default", name: "brand-default" },
      { token: "--knky-color-brand-hover", name: "brand-hover" },
    ],
  },
  {
    title: "Icon",
    tokens: [
      { token: "--knky-color-icon-default", name: "icon-default" },
      { token: "--knky-color-icon-active", name: "icon-active" },
      { token: "--knky-color-icon-disabled", name: "icon-disabled" },
    ],
  },
];

export const spaceScale: TokenEntry[] = [
  0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64,
].map((n) => ({ token: `--knky-space-${n}`, name: `space-${n}` }));

export const radiusScale: TokenEntry[] = [
  { token: "--knky-radius-none", name: "none" },
  { token: "--knky-radius-sm", name: "sm" },
  { token: "--knky-radius-md", name: "md" },
  { token: "--knky-radius-lg", name: "lg" },
  { token: "--knky-radius-xl", name: "xl" },
  { token: "--knky-radius-2xl", name: "2xl" },
  { token: "--knky-radius-full", name: "full" },
];

export const typographyScale: {
  name: string;
  sizeVar: string;
  lineVar: string;
  weightVar: string;
}[] = [
  { name: "body-xs", sizeVar: "--knky-body-xs-size", lineVar: "--knky-body-xs-line-height", weightVar: "--knky-body-xs-weight" },
  { name: "body-sm", sizeVar: "--knky-body-sm-size", lineVar: "--knky-body-sm-line-height", weightVar: "--knky-body-sm-weight" },
  { name: "body-md", sizeVar: "--knky-body-md-size", lineVar: "--knky-body-md-line-height", weightVar: "--knky-body-md-weight" },
  { name: "body-lg", sizeVar: "--knky-body-lg-size", lineVar: "--knky-body-lg-line-height", weightVar: "--knky-body-lg-weight" },
  { name: "body-mg", sizeVar: "--knky-body-mg-size", lineVar: "--knky-body-mg-line-height", weightVar: "--knky-body-mg-weight" },
  { name: "input-mobile", sizeVar: "--knky-input-mobile-size", lineVar: "--knky-input-mobile-line-height", weightVar: "--knky-input-mobile-weight" },
  { name: "heading-xs", sizeVar: "--knky-heading-xs-size", lineVar: "--knky-heading-xs-line-height", weightVar: "--knky-heading-xs-weight" },
  { name: "heading-sm", sizeVar: "--knky-heading-sm-size", lineVar: "--knky-heading-sm-line-height", weightVar: "--knky-heading-sm-weight" },
  { name: "heading-md", sizeVar: "--knky-heading-md-size", lineVar: "--knky-heading-md-line-height", weightVar: "--knky-heading-md-weight" },
  { name: "heading-lg", sizeVar: "--knky-heading-lg-size", lineVar: "--knky-heading-lg-line-height", weightVar: "--knky-heading-lg-weight" },
  { name: "heading-mg", sizeVar: "--knky-heading-mg-size", lineVar: "--knky-heading-mg-line-height", weightVar: "--knky-heading-mg-weight" },
  { name: "heading-xl", sizeVar: "--knky-heading-xl-size", lineVar: "--knky-heading-xl-line-height", weightVar: "--knky-heading-xl-weight" },
  { name: "heading-2xl", sizeVar: "--knky-heading-2xl-size", lineVar: "--knky-heading-2xl-line-height", weightVar: "--knky-heading-2xl-weight" },
  { name: "heading-3xl", sizeVar: "--knky-heading-3xl-size", lineVar: "--knky-heading-3xl-line-height", weightVar: "--knky-heading-3xl-weight" },
];
