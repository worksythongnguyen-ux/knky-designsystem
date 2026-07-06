import { forwardRef, type HTMLAttributes } from "react";
import styles from "./ButtonGroup.module.css";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * "row" (default): buttons side by side (Figma "default" type, e.g. a dialog's
   * Cancel + Save footer). "column": buttons stacked full-width (Figma "top bottom"
   * type — the mobile action-sheet pattern, confirmed at Small screen size).
   */
  direction?: "row" | "column";
  /**
   * Figma "Segmented" type — buttons are visually joined (shared 1px border, only
   * the two outer corners rounded) instead of spaced apart. Confirmed for row
   * layouts with Secondary buttons; combining `joined` with `direction="column"`
   * is a natural extension of the same idea, not a variant Figma shows directly.
   */
  joined?: boolean;
}

/**
 * Arranges Button elements as a group. Design source: Figma node 127:3640 ("Button
 * group") — wraps whatever Buttons you pass as children, it doesn't re-implement
 * button styling itself. Each child's own `size`/`variant` props still control its
 * look; ButtonGroup only controls layout (gap vs. joined) and, for `joined`, which
 * corners keep their radius.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { direction = "row", joined = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={[
        styles.group,
        direction === "column" ? styles.column : styles.row,
        joined ? styles.joined : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
});
