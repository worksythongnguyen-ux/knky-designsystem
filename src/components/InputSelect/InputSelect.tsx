import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import styles from "./InputSelect.module.css";
import {
  AlertErrorIcon,
  AlertInfoIcon,
  AlertWarningIcon,
  CheckIcon,
  SortIcon,
} from "../Icon";

export interface InputSelectOption {
  value: string;
  label: ReactNode;
  /**
   * Plain-text version of `label`, used both to display the selected value inside
   * the closed input and to match against what the user types in searchable mode.
   * Required when `label` isn't itself a plain string.
   */
  searchText?: string;
  disabled?: boolean;
}

export interface InputSelectAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface InputSelectProps {
  /** Field label, shown above the box. */
  label?: ReactNode;
  /** Small helper text shown under the label, above the box. */
  helpText?: ReactNode;
  /** Optional link/action shown next to the label (Figma: "link" sub-action). */
  action?: InputSelectAction;
  /** The list of choices shown in the dropdown. */
  options: InputSelectOption[];
  /** Selected option's `value`. Pass together with `onChange` for a controlled field. */
  value?: string | null;
  /** Initial selected `value` for an uncontrolled field. */
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  /**
   * The user described two use cases for this component:
   * - `false` (default, "select-only"): the box is a trigger — clicking it, or
   *   pressing Enter/Space/ArrowDown while focused, opens the dropdown. Typing
   *   does nothing (the input is `readOnly`).
   * - `true` ("select + type to search"): the box is a real text input — typing
   *   filters `options` by `searchText`/`label`, like a combobox/autocomplete.
   * Figma only specifies the shared visual box (8 states x 2 sizes); this prop is
   * a behavioral choice layered on top, not a distinct Figma variant.
   */
  searchable?: boolean;
  /** Default/lowest-priority alert line message (info icon). */
  infoText?: ReactNode;
  /** Warning alert line message. Overrides `infoText`, overridden by `error`. */
  warningText?: ReactNode;
  /** Success alert line message. Overrides `infoText`/`warningText`, overridden by `error`. */
  successText?: ReactNode;
  /** Error message. Highest-priority alert line state; also switches the box to its red error visuals. */
  error?: ReactNode;
  /** Figma "Screen size" variant. Defaults to "large" (desktop). */
  size?: "large" | "small";
  disabled?: boolean;
  /** Fully static/non-interactive display of the selected value (Figma "read only" state) — distinct from `searchable={false}`, which is still interactive (opens the dropdown). */
  readOnly?: boolean;
  name?: string;
  id?: string;
  required?: boolean;
  wrapperClassName?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

function normalizeText(node: ReactNode): string {
  return typeof node === "string" || typeof node === "number" ? String(node) : "";
}

/**
 * Select / combobox field. Design source: Figma node 127:2832 ("input-select"), 8
 * states x 2 screen sizes — same visual box as InputText (112:4385) with "filled"
 * renamed to "selected". Hover/selected/disabled/read-only reuse the exact same
 * native-CSS-state approach as InputText; only `error` is prop-driven.
 *
 * Supports both use cases the design calls for: pure "select from a list"
 * (`searchable={false}`, default) and "type to filter, then pick" (`searchable`).
 */
export const InputSelect = forwardRef<HTMLInputElement, InputSelectProps>(function InputSelect(
  {
    label,
    helpText,
    action,
    options,
    value,
    defaultValue = null,
    onChange,
    placeholder = "Select",
    searchable = false,
    infoText,
    warningText,
    successText,
    error,
    size = "large",
    disabled = false,
    readOnly = false,
    name,
    id,
    required,
    wrapperClassName,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helpTextId = `${inputId}-help`;
  const alertId = `${inputId}-alert`;
  const listboxId = `${inputId}-listbox`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue) ?? null,
    [options, selectedValue],
  );

  const commitValue = useCallback(
    (next: string | null) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  if (import.meta.env.DEV && !label && !ariaLabel && !ariaLabelledBy) {
    // eslint-disable-next-line no-console
    console.warn(
      "[KNKY UI] InputSelect: no `label` was passed and no `aria-label`/`aria-labelledby` " +
        "either — screen reader users won't know what this field is for. `placeholder` " +
        "alone isn't a substitute for an accessible name.",
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredOptions = useMemo(() => {
    if (!searchable || !isOpen || query.trim() === "") return options;
    const needle = query.trim().toLowerCase();
    return options.filter((option) =>
      (option.searchText ?? normalizeText(option.label)).toLowerCase().includes(needle),
    );
  }, [options, searchable, isOpen, query]);

  const isInteractive = !disabled && !readOnly;

  const open = useCallback(() => {
    if (!isInteractive) return;
    setIsOpen(true);
    const currentIndex = filteredOptions.findIndex((option) => option.value === selectedValue);
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [isInteractive, filteredOptions, selectedValue]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const selectOption = useCallback(
    (option: InputSelectOption) => {
      if (option.disabled) return;
      commitValue(option.value);
      close();
      inputRef.current?.focus();
    },
    [commitValue, close],
  );

  // Close on outside click.
  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(event: MouseEvent) {
      if (fieldRef.current && !fieldRef.current.contains(event.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen, close]);

  const displayValue = searchable && isOpen ? query : normalizeText(selectedOption?.label) || "";

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!isInteractive) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          open();
        } else {
          setActiveIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          open();
        } else {
          setActiveIndex((index) => Math.max(index - 1, 0));
        }
        break;
      case "Enter":
        if (isOpen) {
          event.preventDefault();
          const option = filteredOptions[activeIndex];
          if (option) selectOption(option);
        }
        break;
      case " ":
        if (!searchable) {
          event.preventDefault();
          if (!isOpen) open();
        }
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          close();
        }
        break;
      case "Tab":
        if (isOpen) close();
        break;
      case "Home":
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(filteredOptions.length - 1);
        }
        break;
      default:
        break;
    }
  }

  const alertState = error
    ? ("error" as const)
    : warningText
      ? ("warning" as const)
      : successText
        ? ("success" as const)
        : infoText
          ? ("info" as const)
          : null;
  const alertMessage = error ?? warningText ?? successText ?? infoText;
  const showAlertLine = alertState !== null;

  const describedBy =
    [helpText ? helpTextId : null, showAlertLine ? alertId : null].filter(Boolean).join(" ") ||
    undefined;

  const activeOption = filteredOptions[activeIndex];
  const activeOptionId = activeOption ? `${listboxId}-option-${activeOption.value}` : undefined;

  return (
    <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(" ")}>
      {(label || action) && (
        <div className={styles.labelGroup}>
          <div className={styles.labelRow}>
            {label && (
              <label htmlFor={inputId} className={styles.label}>
                {label}
              </label>
            )}
            {action &&
              (action.href ? (
                <a href={action.href} className={styles.action}>
                  {action.label}
                </a>
              ) : (
                <button type="button" onClick={action.onClick} className={styles.action}>
                  {action.label}
                </button>
              ))}
          </div>
          {helpText && (
            <p id={helpTextId} className={styles.helpText}>
              {helpText}
            </p>
          )}
        </div>
      )}

      <div className={styles.field} ref={fieldRef}>
        <div
          className={[styles.box, styles[size], error ? styles.error : null]
            .filter(Boolean)
            .join(" ")}
          onClick={() => {
            if (!isInteractive) return;
            if (!isOpen) open();
            inputRef.current?.focus();
          }}
        >
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={inputId}
            name={name}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-autocomplete={searchable ? "list" : "none"}
            aria-activedescendant={isOpen ? activeOptionId : undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-required={required}
            autoComplete="off"
            className={[styles.input, className].filter(Boolean).join(" ")}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly || !searchable}
            value={displayValue}
            onChange={(event) => {
              if (!searchable) return;
              setQuery(event.target.value);
              if (!isOpen) open();
              else setActiveIndex(0);
            }}
            onFocus={() => {
              if (!searchable && isInteractive) open();
            }}
            onKeyDown={handleKeyDown}
          />
          <span className={styles.affix}>
            <SortIcon size={20} tone={disabled || readOnly ? "disabled" : "default"} />
          </span>
        </div>

        {isOpen && (
          <ul className={styles.listbox} id={listboxId} role="listbox">
            {filteredOptions.length === 0 ? (
              <li className={styles.emptyState}>No results</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  id={`${listboxId}-option-${option.value}`}
                  role="option"
                  aria-selected={option.value === selectedValue}
                  aria-disabled={option.disabled || undefined}
                  data-active={index === activeIndex}
                  className={styles.option}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {showAlertLine && (
        <div className={styles.alertLine} id={alertId}>
          {alertState === "error" && (
            <AlertErrorIcon
              size={20}
              className={styles.alertIcon}
              color="var(--knky-color-status-critical-element)"
            />
          )}
          {alertState === "warning" && (
            <AlertWarningIcon
              size={20}
              className={styles.alertIcon}
              color="var(--knky-color-status-caution-element)"
            />
          )}
          {alertState === "success" && (
            <CheckIcon
              size={20}
              className={styles.alertIcon}
              color="var(--knky-color-status-success-element)"
            />
          )}
          {alertState === "info" && (
            <AlertInfoIcon size={20} className={styles.alertIcon} color="var(--knky-color-link)" />
          )}
          <p
            className={[
              styles.alertText,
              alertState === "error" ? styles.errorText : null,
              alertState === "warning" ? styles.warningText : null,
              alertState === "success" ? styles.successText : null,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {alertMessage}
          </p>
        </div>
      )}
    </div>
  );
});
