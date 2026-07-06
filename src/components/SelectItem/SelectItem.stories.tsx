import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectItem } from "./SelectItem";
import { SearchIcon } from "../Icon";

const meta: Meta<typeof SelectItem> = {
  title: "Components/SelectItem",
  component: SelectItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single row inside a select / action list. hover comes from native CSS — selected/disabled/active(keyboard-highlighted) are props. Used as the building block for InputSelect's dropdown. Design source: Figma node 118:2380 (Type=Default only; the Destructive type isn't wired up yet).",
      },
    },
  },
  decorators: [
    (Story) => (
      <ul style={{ listStyle: "none", margin: 0, padding: 0, width: 280 }}>
        <Story />
      </ul>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectItem>;

export const Default: Story = {
  args: { label: "Action" },
};

export const WithHelperText: Story = {
  args: { label: "Action", helperText: "Helper text" },
};

export const WithPrefix: Story = {
  args: { label: "Action", helperText: "Helper text", prefixIcon: <SearchIcon size={20} /> },
};

export const Selected: Story = {
  args: { label: "Action", selected: true },
};

export const ActiveKeyboard: Story = {
  name: "Active (keyboard-highlighted)",
  args: { label: "Action", active: true },
};

export const Disabled: Story = {
  args: { label: "Action", helperText: "Helper text", disabled: true },
};

export const List: Story = {
  render: () => (
    <>
      <SelectItem label="Vietnam" />
      <SelectItem label="United States" selected />
      <SelectItem label="Japan" active />
      <SelectItem label="Philippines" disabled />
    </>
  ),
};
