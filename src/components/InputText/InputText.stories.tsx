import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { InputText } from "./InputText";
import { SearchIcon, AlertQuestionIcon } from "../Icon";

const meta: Meta<typeof InputText> = {
  title: "Components/InputText",
  component: InputText,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Single-line text field. hover/focus/filled/disabled/read-only come from native CSS states — only `error` is a prop, since it's a validation result, not a browser state. Design source: Figma node 112:4385.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["large", "small"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    label: "Label",
    helpText: "Help text",
    placeholder: "Input",
    infoText: "Info line",
    action: { label: "Link" },
    prefix: <SearchIcon size={20} />,
    // Figma's own default instance demos both a prefix and a suffix icon at once —
    // included here so the deployed Storybook actually shows the suffix slot.
    suffix: <AlertQuestionIcon size={20} />,
    // Figma's own default instance also shows the field as required (red "*" after
    // the label) — matched here for the same reason as prefix/suffix above.
    required: true,
  },
};

export const WithValue: Story = {
  name: "Filled (has value)",
  args: {
    ...Default.args,
    defaultValue: "Some text",
  },
};

export const ErrorState: Story = {
  name: "Error",
  args: {
    ...Default.args,
    defaultValue: "Invalid value",
    error: "Error line",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    defaultValue: "Input",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  name: "Read only",
  args: {
    ...Default.args,
    defaultValue: "Input",
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

export const NoAffixes: Story = {
  name: "No label / prefix / suffix",
  args: {
    placeholder: "Input",
  },
};

export const TextAffixes: Story = {
  name: "Text prefix/suffix ($, cm)",
  args: {
    label: "Price",
    helpText: "Help text",
    placeholder: "0",
    prefix: "$",
    suffix: "cm",
    infoText: "Info line",
  },
};

export const WarningState: Story = {
  name: "Warning",
  args: {
    ...Default.args,
    defaultValue: "Some text",
    warningText: "Warning line",
  },
};

export const SuccessState: Story = {
  name: "Success (correct info)",
  args: {
    ...Default.args,
    defaultValue: "Some text",
    successText: "Correct info line",
  },
};

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [value, setValue] = useState("");
      return (
        <InputText
          label="Email"
          placeholder="you@example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          infoText={value ? `${value.length} characters` : "We'll never share your email."}
        />
      );
    }
    return <ControlledExample />;
  },
};
