// Import tokens once here, so anyone importing any component
// automatically gets the CSS variables (colors, spacing, radius...) from Figma.
import "./tokens/tokens.css";

export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";

// Every time a new component is finished, just add one export line here
// and it becomes available to consumers immediately.
