import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Small status pill, 5 types x 4 states. Design source: Figma node 140:1924 (\"Badge\"). The completed/processing/incomplete states show a Progress icon (Figma node 140:1927) before the label.",
      },
    },
  },
  argTypes: {
    type: { control: "radio", options: ["default", "info", "success", "critical", "warning"] },
    state: { control: "radio", options: ["default", "completed", "processing", "incomplete"] },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { label: "Label" },
};

export const Completed: Story = {
  args: { label: "Label", state: "completed" },
};

export const Processing: Story = {
  args: { label: "Label", state: "processing" },
};

export const Incomplete: Story = {
  args: { label: "Label", state: "incomplete" },
};

export const AllTypesAndStates: Story = {
  render: () => {
    const types = ["default", "info", "success", "critical", "warning"] as const;
    const states = ["default", "completed", "processing", "incomplete"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {states.map((state) => (
          <div key={state} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {types.map((type) => (
              <Badge key={type} type={type} state={state} label="Label" />
            ))}
          </div>
        ))}
      </div>
    );
  },
};
