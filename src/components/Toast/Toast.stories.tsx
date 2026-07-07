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
  // Toast is a bg-surface (white) card with a border-default (#e5e5e5, very
  // close to white) and a soft shadow — on Storybook's plain white canvas
  // both nearly disappear. Figma's own mockup places it on the app's gray
  // page background (bg-page), which is what actually gives the
  // border/shadow visible contrast, so every story gets that same backdrop.
  decorators: [
    (Story) => (
      <div style={{ background: "var(--knky-color-bg-page)", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
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
