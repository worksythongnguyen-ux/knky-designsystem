// Import tokens once here, so anyone importing any component
// automatically gets the CSS variables (colors, spacing, radius...) from Figma.
import "./tokens/tokens.css";

// Every time a new component is finished, just add one export line here
// and it becomes available to consumers immediately.

export {
  Icon,
  ArrowIcon,
  SortIcon,
  CloseIcon,
  LoadingIcon,
  CheckIcon,
  AlertErrorIcon,
  AlertWarningIcon,
  AlertInfoIcon,
  AlertQuestionIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  PlaceholderIcon,
} from "./components/Icon";
export type {
  IconName,
  IconProps,
  ArrowIconProps,
  SortIconProps,
  CloseIconProps,
} from "./components/Icon";

export { InputText } from "./components/InputText";
export type { InputTextProps, InputTextAction } from "./components/InputText";
