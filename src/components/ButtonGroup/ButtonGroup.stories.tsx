import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../Button";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Arranges Button elements as a group — a thin layout wrapper, not a re-implementation of Button styling. `direction` picks row (side by side) vs. column (full-width stack, the mobile action-sheet pattern); `joined` switches from spaced-apart to a visually-merged segmented look. Design source: Figma node 127:3640.",
      },
    },
  },
  argTypes: {
    direction: { control: "radio", options: ["row", "column"] },
    joined: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  name: "Default (dialog footer)",
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  ),
};

export const Segmented: Story = {
  name: "Segmented",
  render: (args) => (
    <ButtonGroup {...args} joined>
      <Button variant="secondary" size="tiny">
        Day
      </Button>
      <Button variant="secondary" size="tiny">
        Week
      </Button>
      <Button variant="secondary" size="tiny">
        Month
      </Button>
      <Button variant="secondary" size="tiny">
        Quarter
      </Button>
      <Button variant="secondary" size="tiny">
        Year
      </Button>
    </ButtonGroup>
  ),
};

export const TopBottom: Story = {
  name: "Top/bottom (mobile action sheet)",
  render: (args) => (
    <div style={{ width: 343 }}>
      <ButtonGroup {...args} direction="column">
        <Button variant="primary" size="small">
          Confirm
        </Button>
        <Button variant="secondary" size="small">
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const JoinedColumn: Story = {
  name: "Joined + column (extension, not a direct Figma variant)",
  render: (args) => (
    <div style={{ width: 200 }}>
      <ButtonGroup {...args} direction="column" joined>
        <Button variant="secondary">Top</Button>
        <Button variant="secondary">Middle</Button>
        <Button variant="secondary">Bottom</Button>
      </ButtonGroup>
    </div>
  ),
};
