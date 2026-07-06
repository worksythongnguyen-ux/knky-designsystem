import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Small status-progress indicator, used inside Badge. Design source: Figma node 140:1927 (\"Assets/Progress\").",
      },
    },
  },
  argTypes: {
    state: { control: "radio", options: ["complete", "processing", "incomplete"] },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Complete: Story = {
  args: { state: "complete" },
};

export const Processing: Story = {
  args: { state: "processing" },
};

export const Incomplete: Story = {
  args: { state: "incomplete" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Progress state="complete" />
      <Progress state="processing" />
      <Progress state="incomplete" />
    </div>
  ),
};
