import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { InputSelect, type InputSelectOption } from "./InputSelect";

const COUNTRY_OPTIONS: InputSelectOption[] = [
  { value: "vn", label: "Vietnam" },
  { value: "us", label: "United States" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
  { value: "sg", label: "Singapore" },
  { value: "th", label: "Thailand" },
  { value: "ph", label: "Philippines", disabled: true },
];

const meta: Meta<typeof InputSelect> = {
  title: "Components/InputSelect",
  component: InputSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select / combobox field. hover/selected/disabled/read-only come from native CSS states, same as InputText — only `error` is a prop. `searchable` toggles between the two use cases: select-only (click/keyboard opens the list, typing does nothing) and type-to-search (typing filters the options). Design source: Figma node 127:2832.",
      },
    },
  },
  args: {
    options: COUNTRY_OPTIONS,
  },
  argTypes: {
    size: { control: "radio", options: ["large", "small"] },
    searchable: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof InputSelect>;

export const Default: Story = {
  args: {
    label: "Label",
    helpText: "Help text",
    infoText: "Info line",
    action: { label: "Link" },
    // Figma's own default instance shows the field as required (red "*" after the
    // label) — matched here for consistency with InputText's Default story.
    required: true,
  },
};

export const Selected: Story = {
  name: "Selected (has value)",
  args: {
    ...Default.args,
    defaultValue: "vn",
  },
};

export const SearchToFilter: Story = {
  name: "Searchable (type to filter)",
  args: {
    ...Default.args,
    searchable: true,
    placeholder: "Search a country",
  },
};

export const ErrorState: Story = {
  name: "Error",
  args: {
    ...Default.args,
    defaultValue: "vn",
    error: "Error line",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    defaultValue: "vn",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  name: "Read only",
  args: {
    ...Default.args,
    defaultValue: "vn",
    readOnly: true,
  },
};

export const SmallScreenSize: Story = {
  name: 'size="small" (mobile spec)',
  args: {
    ...Default.args,
    size: "small",
  },
};

export const WarningState: Story = {
  name: "Warning",
  args: {
    ...Default.args,
    defaultValue: "vn",
    warningText: "Warning line",
  },
};

export const SuccessState: Story = {
  name: "Success (correct info)",
  args: {
    ...Default.args,
    defaultValue: "vn",
    successText: "Correct info line",
  },
};

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [value, setValue] = useState<string | null>(null);
      const selected = COUNTRY_OPTIONS.find((option) => option.value === value);
      return (
        <InputSelect
          label="Country"
          options={COUNTRY_OPTIONS}
          value={value}
          onChange={setValue}
          infoText={selected ? `Selected: ${selected.label}` : "Pick a country"}
        />
      );
    }
    return <ControlledExample />;
  },
};

export const ControlledSearchable: Story = {
  name: "Controlled + searchable",
  render: () => {
    function ControlledExample() {
      const [value, setValue] = useState<string | null>("us");
      return (
        <InputSelect
          label="Country"
          options={COUNTRY_OPTIONS}
          value={value}
          onChange={setValue}
          searchable
          placeholder="Search a country"
        />
      );
    }
    return <ControlledExample />;
  },
};
