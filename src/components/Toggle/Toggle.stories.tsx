import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Toggle } from "./Toggle";
import { ToggleWithLabel } from "./ToggleWithLabel";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A single on/off switch, built on a real <input type="checkbox" role="switch"> — hover/focus/checked/disabled all come from native CSS states, only `error` is a prop. Design source: Figma node 168:3416.',
      },
    },
  },
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const ErrorUnchecked: Story = {
  name: "Error",
  args: { error: true },
};

export const ErrorChecked: Story = {
  name: "Error + checked",
  args: { error: true, defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: "Disabled + checked",
  args: { disabled: true, defaultChecked: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Toggle aria-label="Default" />
      <Toggle aria-label="Checked" defaultChecked />
      <Toggle aria-label="Error" error />
      <Toggle aria-label="Error checked" error defaultChecked />
      <Toggle aria-label="Disabled" disabled />
      <Toggle aria-label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const WithLabel: Story = {
  name: "ToggleWithLabel",
  render: () => {
    function Demo() {
      const [checked, setChecked] = useState(false);
      return (
        <ToggleWithLabel
          label="Label"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    }
    return <Demo />;
  },
};

export const WithLabelAndHelpText: Story = {
  name: "ToggleWithLabel + help text",
  render: () => {
    function Demo() {
      const [checked, setChecked] = useState(false);
      return (
        <ToggleWithLabel
          label="Label"
          helpText="Help text goes here"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    }
    return <Demo />;
  },
};

export const WithLabelDisabled: Story = {
  name: "ToggleWithLabel (disabled)",
  render: () => <ToggleWithLabel label="Label" helpText="Help text goes here" disabled />,
};
