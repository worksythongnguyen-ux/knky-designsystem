import {
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
} from "./icons";
import type { IconProps } from "./icons";

const registry = {
  arrow: ArrowIcon,
  sort: SortIcon,
  close: CloseIcon,
  loading: LoadingIcon,
  check: CheckIcon,
  "alert-error": AlertErrorIcon,
  "alert-warning": AlertWarningIcon,
  "alert-info": AlertInfoIcon,
  "alert-question": AlertQuestionIcon,
  edit: EditIcon,
  trash: TrashIcon,
  search: SearchIcon,
  placeholder: PlaceholderIcon,
} as const;

export type IconName = keyof typeof registry;

export interface DynamicIconProps extends IconProps {
  /** Which icon to render — see IconName for the full list. */
  name: IconName;
  /**
   * Icon-specific variant (e.g. direction for "arrow"/"sort", variant for "close").
   * Loosely typed here on purpose: this dynamic dispatcher supports every icon through
   * one prop shape. For compile-time-checked variant props, import the icon directly
   * from "./icons" instead (e.g. `<ArrowIcon direction="up" />`).
   */
  [key: string]: unknown;
}

/**
 * Renders any icon from the KNKY icon set by name. Prefer this when the icon to show
 * is data-driven (e.g. coming from config); otherwise importing the specific icon
 * component (ArrowIcon, CheckIcon, ...) gives you typed variant props.
 */
export function Icon({ name, ...props }: DynamicIconProps) {
  const Component = registry[name];
  return <Component {...(props as IconProps)} />;
}
