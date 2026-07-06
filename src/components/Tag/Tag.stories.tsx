import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Small interactive keyword/filter chip, 2 types x 5 states. Design source: Figma node 157:3292 (\"Tag\").",
      },
    },
  },
  argTypes: {
    hasPrefix: { control: "boolean" },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { children: "Tag label" },
};

export const HasPrefix: Story = {
  name: "Type=has prefix",
  args: { children: "Tag label", hasPrefix: true },
};

export const Selected: Story = {
  args: { children: "Tag label", selected: true },
};

export const SelectedWithPrefix: Story = {
  name: "Selected + has prefix",
  args: { children: "Tag label", selected: true, hasPrefix: true },
};

export const Disabled: Story = {
  args: { children: "Tag label", disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag>Tag label</Tag>
        <Tag disabled>Tag label</Tag>
        <Tag selected>Tag label</Tag>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag hasPrefix>Tag label</Tag>
        <Tag hasPrefix disabled>
          Tag label
        </Tag>
        <Tag hasPrefix selected>
          Tag label
        </Tag>
      </div>
    </div>
  ),
};

export const RemovableList: Story = {
  name: "Removable tag list",
  render: () => {
    function Demo() {
      const [tags, setTags] = useState(["Design", "Frontend", "Urgent"]);
      return (
        <div style={{ display: "flex", gap: 8 }}>
          {tags.map((tag) => (
            <Tag key={tag} selected onRemove={() => setTags((t) => t.filter((x) => x !== tag))}>
              {tag}
            </Tag>
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};

export const ClickableFilterList: Story = {
  name: "Clickable filter list (passing onClick)",
  render: () => {
    function Demo() {
      const [selected, setSelected] = useState<string[]>(["Design"]);
      const options = ["Design", "Frontend", "Urgent"];
      function toggle(tag: string) {
        setSelected((current) =>
          current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag],
        );
      }
      return (
        <div style={{ display: "flex", gap: 8 }}>
          {options.map((tag) => (
            <Tag key={tag} selected={selected.includes(tag)} onClick={() => toggle(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};
