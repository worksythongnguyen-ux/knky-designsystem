import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelpText } from "./HelpText";

const meta: Meta<typeof HelpText> = {
  title: "Components/HelpText",
  component: HelpText,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Small secondary text used to explain a nearby control — commonly placed under a Checkbox/CheckboxWithLabel. Design source: Figma node 37:3932.",
      },
    },
  },
  args: {
    children: "Help text goes here",
  },
};

export default meta;
type Story = StoryObj<typeof HelpText>;

export const Default: Story = {};

export const Flush: Story = {
  name: "No indent",
  args: { indent: false },
};
