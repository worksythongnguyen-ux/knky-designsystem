import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Non-disruptive feedback message, 4 states x 2 types. Design source: Figma node 156:2296 ("toast").',
      },
    },
  },
  argTypes: {
    state: { control: "radio", options: ["success", "warning", "error", "info"] },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: { children: "Label", state: "success" },
};

export const Warning: Story = {
  args: { children: "Label", state: "warning" },
};

export const Error: Story = {
  args: { children: "Label", state: "error" },
};

export const Info: Story = {
  args: { children: "Label", state: "info" },
};

export const WithAction: Story = {
  name: "Type=has action",
  args: { children: "Label", state: "success", action: "Button" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Toast state="success">Label</Toast>
      <Toast state="warning">Label</Toast>
      <Toast state="error">Label</Toast>
      <Toast state="info">Label</Toast>
      <Toast state="success" action="Button">
        Label
      </Toast>
      <Toast state="warning" action="Button">
        Label
      </Toast>
      <Toast state="error" action="Button">
        Label
      </Toast>
      <Toast state="info" action="Button">
        Label
      </Toast>
    </div>
  ),
};
