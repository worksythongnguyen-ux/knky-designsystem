import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio } from "./Radio";
import { RadioWithLabel } from "./RadioWithLabel";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single radio button, built on a real <input type=\"radio\"> — pass a shared `name` to group Radios so only one can be selected. hover/focus/checked/disabled come from native CSS states, only `error` is a prop. Design source: Figma node 145:2874.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["large", "small"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: { name: "default-demo" },
};

export const Checked: Story = {
  args: { name: "checked-demo", defaultChecked: true },
};

export const ErrorUnchecked: Story = {
  name: "Error",
  args: { name: "error-demo", error: true },
};

export const ErrorChecked: Story = {
  name: "Error + checked",
  args: { name: "error-checked-demo", error: true, defaultChecked: true },
};

export const Disabled: Story = {
  args: { name: "disabled-demo", disabled: true },
};

export const DisabledChecked: Story = {
  name: "Disabled + checked",
  args: { name: "disabled-checked-demo", disabled: true, defaultChecked: true },
};

export const SmallScreenSize: Story = {
  name: 'size="small" (mobile spec)',
  args: { name: "small-demo", size: "small" },
};

export const Group: Story = {
  name: "Radio group",
  render: () => {
    function RadioGroupDemo() {
      const [value, setValue] = useState("a");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <RadioWithLabel
            name="group-demo"
            label="Option A"
            checked={value === "a"}
            onChange={() => setValue("a")}
          />
          <RadioWithLabel
            name="group-demo"
            label="Option B"
            checked={value === "b"}
            onChange={() => setValue("b")}
          />
          <RadioWithLabel
            name="group-demo"
            label="Option C"
            helpText="Help text goes here"
            checked={value === "c"}
            onChange={() => setValue("c")}
          />
        </div>
      );
    }
    return <RadioGroupDemo />;
  },
};

export const WithLabelDisabled: Story = {
  name: "RadioWithLabel (disabled)",
  render: () => (
    <RadioWithLabel name="disabled-label-demo" label="Label" helpText="Help text goes here" disabled />
  ),
};
