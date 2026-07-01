import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArrowIcon,
  SortIcon,
  CloseIcon,
  LoadingIcon,
  CheckIcon,
  AlertErrorIcon,
  AlertWarningIcon,
  AlertInfoIcon,
  AlertQuestionIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  PlaceholderIcon,
} from "./icons";
import { Icon } from "./Icon";

const meta: Meta = {
  title: "Components/Icon",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Icon set from the KNKY - DS Figma file (page 'Icons'). 20x20 box, 16x16 safe content area, color follows CSS `currentColor`. Design source: Figma node 16:286.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        width: 96,
        padding: 12,
        border: "1px solid #e5e5e5",
        borderRadius: 6,
      }}
    >
      <div style={{ color: "#303030" }}>{children}</div>
      <code style={{ fontSize: 11, color: "#6d6d6d", textAlign: "center" }}>{label}</code>
    </div>
  );
}

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Cell label="arrow / down"><ArrowIcon direction="down" /></Cell>
      <Cell label="arrow / up"><ArrowIcon direction="up" /></Cell>
      <Cell label="arrow / prev"><ArrowIcon direction="prev" /></Cell>
      <Cell label="arrow / next"><ArrowIcon direction="next" /></Cell>
      <Cell label="sort / asc"><SortIcon direction="asc" /></Cell>
      <Cell label="sort / desc"><SortIcon direction="desc" /></Cell>
      <Cell label="sort / both"><SortIcon direction="both" /></Cell>
      <Cell label="close / default"><CloseIcon variant="default" /></Cell>
      <Cell label="close / clear"><CloseIcon variant="clear" /></Cell>
      <Cell label="loading"><LoadingIcon /></Cell>
      <Cell label="check"><CheckIcon /></Cell>
      <Cell label="alert-error"><AlertErrorIcon /></Cell>
      <Cell label="alert-warning"><AlertWarningIcon /></Cell>
      <Cell label="alert-info"><AlertInfoIcon /></Cell>
      <Cell label="alert-question"><AlertQuestionIcon /></Cell>
      <Cell label="edit"><EditIcon /></Cell>
      <Cell label="trash"><TrashIcon /></Cell>
      <Cell label="search"><SearchIcon /></Cell>
      <Cell label="placeholder"><PlaceholderIcon /></Cell>
    </div>
  ),
};

export const DynamicByName: Story = {
  name: "Using <Icon name=\"...\" />",
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Cell label='name="check"'><Icon name="check" /></Cell>
      <Cell label='name="trash"'><Icon name="trash" /></Cell>
      <Cell label='name="search"'><Icon name="search" /></Cell>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <CheckIcon size={16} />
      <CheckIcon size={20} />
      <CheckIcon size={24} />
      <CheckIcon size={32} />
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, color: "var(--knky-color-brand-500, #ac1991)" }}>
      <CheckIcon />
      <AlertErrorIcon />
      <TrashIcon />
    </div>
  ),
};
