import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { SearchIcon, TrashIcon } from "../Icon";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "hover/pressed/focus/disabled come from native CSS states — only `loading` is a prop, since it swaps the content for a spinner. Design source: Figma button - primary (75:11225), secondary (24:1846), tertiary (53:4793), critical (28:1308).",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary", "tertiary", "critical"] },
    size: { control: "radio", options: ["tiny", "large", "small"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: {
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary" },
};

export const Critical: Story = {
  args: { variant: "critical" },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="tertiary">
        Tertiary
      </Button>
      <Button {...args} variant="critical">
        Critical
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button {...args} size="tiny">
        Tiny
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
      <Button {...args} size="small">
        Small
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <SearchIcon size={20} />,
    children: "Search",
  },
};

export const IconOnly: Story = {
  args: {
    icon: <TrashIcon size={20} />,
    "aria-label": "Delete",
  },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args}>Default</Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Loading
      </Button>
    </div>
  ),
};
