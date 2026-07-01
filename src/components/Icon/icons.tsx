/**
 * Icon set — matches the "Icons" page of the KNKY - DS Figma file
 * (design tokens --knky-icon-arrow, --knky-icon-sort, --knky-icon-close, --knky-icon-loading,
 * --knky-icon-check, --knky-icon-alert-error/warning/info/question, --knky-icon-edit,
 * --knky-icon-trash, --knky-icon-search).
 *
 * Note on fidelity: Figma's Dev Mode MCP server serves the exact icon artwork from a
 * localhost asset server that is only reachable from the machine running Figma Desktop,
 * not from this environment — so the exact vector paths could not be pulled 1:1. These are
 * redrawn as clean, standard outline icons matching what's shown in the Figma previews
 * (chevron, sort, X/close, spinner, check, alert circles/triangle, pencil, trash, search).
 * If pixel-perfect paths are needed later, export the layers from Figma as SVG
 * ("Copy/Export as SVG") and swap the `<path>` data in here.
 *
 * All icons: 20x20 viewBox, 16x16 safe content area, stroke = currentColor (so color is
 * controlled via CSS `color`), consistent stroke width/caps/joins.
 */
import type { SVGProps } from "react";
import styles from "./Icon.module.css";

export interface IconProps {
  /** Width & height in px. Defaults to 20 (the Figma icon container size). */
  size?: number;
  className?: string;
  /** Accessible label. When omitted, the icon is treated as decorative (aria-hidden). */
  title?: string;
}

function IconSvg({
  size = 20,
  className,
  title,
  children,
  ...rest
}: IconProps & { children: React.ReactNode } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

export interface ArrowIconProps extends IconProps {
  /** Figma variants: down | up | pre | next */
  direction?: "down" | "up" | "prev" | "next";
}

export function ArrowIcon({ direction = "down", ...props }: ArrowIconProps) {
  const d =
    direction === "up"
      ? "M5 13l5-6 5 6"
      : direction === "prev"
        ? "M13 5l-6 5 6 5"
        : direction === "next"
          ? "M7 5l6 5-6 5"
          : "M5 7l5 6 5-6";
  return (
    <IconSvg {...props}>
      <path d={d} />
    </IconSvg>
  );
}

export interface SortIconProps extends IconProps {
  /** Figma variants: "bottom up" -> asc, "top down" -> desc, "all" -> both */
  direction?: "asc" | "desc" | "both";
}

export function SortIcon({ direction = "both", ...props }: SortIconProps) {
  const upOpacity = direction === "desc" ? 0.35 : 1;
  const downOpacity = direction === "asc" ? 0.35 : 1;
  return (
    <IconSvg {...props}>
      <path d="M6 8.5l4-3.5 4 3.5" opacity={upOpacity} />
      <path d="M6 11.5l4 3.5 4-3.5" opacity={downOpacity} />
    </IconSvg>
  );
}

export interface CloseIconProps extends IconProps {
  /** Figma variants: default | "clear entered data" */
  variant?: "default" | "clear";
}

export function CloseIcon({ variant = "default", ...props }: CloseIconProps) {
  if (variant === "clear") {
    return (
      <IconSvg {...props}>
        <circle cx={10} cy={10} r={9} fill="currentColor" stroke="none" />
        <path d="M7 7l6 6M13 7l-6 6" stroke="var(--knky-color-neutral-white, #fff)" />
      </IconSvg>
    );
  }
  return (
    <IconSvg {...props}>
      <path d="M4.4 4.4l11.2 11.2M15.6 4.4L4.4 15.6" />
    </IconSvg>
  );
}

export function LoadingIcon(props: IconProps) {
  return (
    <IconSvg {...props} className={[styles.spin, props.className].filter(Boolean).join(" ")}>
      <circle cx={10} cy={10} r={7} strokeDasharray="33 11" />
    </IconSvg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M6 10.5l3 3 6-6.5" />
    </IconSvg>
  );
}

export function AlertErrorIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <circle cx={10} cy={10} r={7} />
      <line x1={10} y1={7} x2={10} y2={11} />
      <circle cx={10} cy={13.5} r={0.75} fill="currentColor" stroke="none" />
    </IconSvg>
  );
}

export function AlertWarningIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M10 3.5L17 16H3z" />
      <line x1={10} y1={8.5} x2={10} y2={12} />
      <circle cx={10} cy={14} r={0.75} fill="currentColor" stroke="none" />
    </IconSvg>
  );
}

export function AlertInfoIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <circle cx={10} cy={10} r={7} />
      <circle cx={10} cy={7} r={0.75} fill="currentColor" stroke="none" />
      <line x1={10} y1={9.5} x2={10} y2={13.5} />
    </IconSvg>
  );
}

export function AlertQuestionIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <circle cx={10} cy={10} r={7} />
      <path d="M7.8 8.2a2.2 2.2 0 1 1 3.3 1.9c-.7.4-1.1.8-1.1 1.6" />
      <circle cx={10} cy={14} r={0.75} fill="currentColor" stroke="none" />
    </IconSvg>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M4 16l.9-3.6 7.5-7.5a1.5 1.5 0 0 1 2.1 0l.6.6a1.5 1.5 0 0 1 0 2.1L7.6 15.1 4 16z" />
      <path d="M11 6.5l2.5 2.5" />
    </IconSvg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M3.7 6.5h12.6" />
      <path d="M5.2 6.5v9a1 1 0 0 0 1 1h7.6a1 1 0 0 0 1-1v-9" />
      <path d="M7.5 6.5V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
      <path d="M8.3 9.5v5M11.7 9.5v5" />
    </IconSvg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <circle cx={8.7} cy={8.7} r={5} />
      <path d="M12.5 12.5l3.5 3.5" />
    </IconSvg>
  );
}

/**
 * Generic fallback icon (--knky-icon-placeholder in Figma), used inside other
 * components when no specific icon has been set yet.
 */
export function PlaceholderIcon(props: IconProps) {
  return (
    <IconSvg {...props}>
      <path d="M10 3l7 7-7 7-7-7z" fill="currentColor" stroke="none" />
    </IconSvg>
  );
}
