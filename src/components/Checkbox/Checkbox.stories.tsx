import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { CheckboxWithLabel } from "./CheckboxWithLabel";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single checkbox, built on a real <input type=\"checkbox\"> — hover/focus/checked/disabled all come from native CSS states, only `error` and `indeterminate` are props. Design source: Figma node 37:3692.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["large", "small"] },
    error: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
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

export const SmallScreenSize: Story = {
  name: 'size="small" (mobile spec)',
  args: { size: "small" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Checkbox aria-label="Default" />
      <Checkbox aria-label="Checked" defaultChecked />
      <Checkbox aria-label="Indeterminate" indeterminate />
      <Checkbox aria-label="Error" error />
      <Checkbox aria-label="Error checked" error defaultChecked />
      <Checkbox aria-label="Disabled" disabled />
      <Checkbox aria-label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const WithLabel: Story = {
  name: "CheckboxWithLabel",
  render: () => <CheckboxWithLabel label="Label" />,
};

export const TriStateCycle: Story = {
  name: "Tri-state cycle (unchecked -> indeterminate -> checked -> ...)",
  render: () => {
    type TriState = "unchecked" | "indeterminate" | "checked";
    function TriStateDemo() {
      const [state, setState] = useState<TriState>("unchecked");
      function next() {
        setState((current) =>
          current === "unchecked"
            ? "indeterminate"
            : current === "indeterminate"
              ? "checked"
              : "unchecked",
        );
      }
      return (
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <Checkbox
            checked={state === "checked"}
            indeterminate={state === "indeterminate"}
            onChange={next}
          />
          <span
            style={{
              fontFamily: "var(--knky-font-family-base)",
              fontSize: "var(--knky-body-md-size)",
              lineHeight: "var(--knky-body-md-line-height)",
              fontWeight: "var(--knky-body-md-weight)" as never,
              color: "var(--knky-color-text-primary)",
            }}
          >
            Click through: {state}
          </span>
        </label>
      );
    }
    return <TriStateDemo />;
  },
};

export const WithLabelAndHelpText: Story = {
  name: "CheckboxWithLabel + help text",
  render: () => <CheckboxWithLabel label="Label" helpText="Help text goes here" />,
};

export const WithLabelDisabled: Story = {
  name: "CheckboxWithLabel (disabled)",
  render: () => <CheckboxWithLabel label="Label" helpText="Help text goes here" disabled />,
};
