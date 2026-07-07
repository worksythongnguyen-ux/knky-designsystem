import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Scrollable } from "./Scrollable";

const meta: Meta<typeof Scrollable> = {
  title: "Components/Scrollable",
  component: Scrollable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A scroll container with a styled scrollbar. Design source: Figma node 40:5256 ("Utilities/Scrollable"). Native scrolling (wheel/trackpad/touch/keyboard) works as-is — only the scrollbar chrome is restyled.',
      },
    },
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    arrows: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Scrollable>;

function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 16px",
        marginRight: 8,
        background: "#f1f1f1",
        borderRadius: 4,
        whiteSpace: "nowrap",
        fontSize: 13,
      }}
    >
      {children}
    </span>
  );
}

export const Horizontal: Story = {
  args: {},
  render: (args) => (
    <Scrollable {...args} style={{ width: 375 }}>
      <div style={{ display: "flex", width: "max-content" }}>
        {Array.from({ length: 20 }, (_, i) => (
          <Chip key={i}>Item {i + 1}</Chip>
        ))}
      </div>
    </Scrollable>
  ),
};

export const HorizontalWithArrows: Story = {
  name: "Type=Mobile (arrows)",
  args: { arrows: true },
  render: (args) => (
    <Scrollable {...args} style={{ width: 375 }}>
      <div style={{ display: "flex", width: "max-content" }}>
        {Array.from({ length: 20 }, (_, i) => (
          <Chip key={i}>Item {i + 1}</Chip>
        ))}
      </div>
    </Scrollable>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Scrollable {...args} style={{ height: 200, width: 280 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 4 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ padding: 8, background: "#f1f1f1", borderRadius: 4, fontSize: 13 }}>
            Row {i + 1}
          </div>
        ))}
      </div>
    </Scrollable>
  ),
};
