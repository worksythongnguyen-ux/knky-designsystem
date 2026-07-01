import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Primary button. Used for important actions like 'Save', 'Add', 'Confirm'. Design source: Figma node 75:11225.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Button",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};
