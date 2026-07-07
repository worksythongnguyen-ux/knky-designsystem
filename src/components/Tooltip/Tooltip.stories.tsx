import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Small floating label with a directional pointer, 4 tail directions. Design source: Figma node 157:2976 ("Tooltip"). Purely presentational — pair with your own positioning/anchoring logic.',
      },
    },
  },
  argTypes: {
    tail: { control: "radio", options: ["top", "bottom", "left", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Bottom: Story = {
  args: { children: "This is the tooltip content", tail: "bottom" },
};

export const Top: Story = {
  args: { children: "This is the tooltip content", tail: "top" },
};

export const Right: Story = {
  args: { children: "This is the tooltip content", tail: "right" },
};

export const Left: Story = {
  args: { children: "This is the tooltip content", tail: "left" },
};

export const AllDirections: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 64, padding: 32 }}>
      <Tooltip tail="bottom">This is the tooltip content</Tooltip>
      <Tooltip tail="top">This is the tooltip content</Tooltip>
      <Tooltip tail="right">This is the tooltip content</Tooltip>
      <Tooltip tail="left">This is the tooltip content</Tooltip>
    </div>
  ),
};
