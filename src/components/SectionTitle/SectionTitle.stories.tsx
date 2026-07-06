import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionTitle } from "./SectionTitle";
import { SelectItem } from "../SelectItem";

const meta: Meta<typeof SectionTitle> = {
  title: "Components/SectionTitle",
  component: SectionTitle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Heading row used to group items in a select / action list. The first section in a list has no divider; every section after that sets `divider`. Design source: Figma node 126:3360.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  args: { label: "Section label" },
};

export const WithHelperText: Story = {
  args: { label: "Section label", helperText: "Helper text" },
};

export const WithDivider: Story = {
  name: "Divider (2nd+ section in a list)",
  args: { label: "Section label", divider: true },
};

export const GroupedList: Story = {
  render: () => (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, width: 280, border: "1px solid #e5e5e5", borderRadius: 4 }}>
      <SectionTitle label="Recent" />
      <SelectItem label="Vietnam" />
      <SelectItem label="United States" />
      <SectionTitle label="All countries" divider />
      <SelectItem label="Japan" />
      <SelectItem label="South Korea" />
    </ul>
  ),
};
