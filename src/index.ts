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

export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";

export { InputSelect } from "./components/InputSelect";
export type {
  InputSelectProps,
  InputSelectOption,
  InputSelectAction,
} from "./components/InputSelect";

export { SelectItem } from "./components/SelectItem";
export type { SelectItemProps } from "./components/SelectItem";

export { SectionTitle } from "./components/SectionTitle";
export type { SectionTitleProps } from "./components/SectionTitle";

export { ButtonGroup } from "./components/ButtonGroup";
export type { ButtonGroupProps } from "./components/ButtonGroup";
