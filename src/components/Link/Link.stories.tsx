import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./Link";
import { ArrowIcon } from "../Icon";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Small inline link/action. hover/focus come from native CSS — pass `href` for a real link, or `onClick` for a button-like action. Design source: Figma node 31:1689.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["text", "tertiary"] },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Link",
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Text: Story = {
  args: { variant: "text" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary" },
};

export const WithIcon: Story = {
  name: "Include icon",
  args: { icon: <ArrowIcon direction="next" size={16} /> },
};

export const AsAnchor: Story = {
  name: "As a real link (href)",
  args: { href: "https://example.com", target: "_blank" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
