import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Products } from "../Types";
import ProductBadge from "./ProductBadge";

export default {
  title: "Atoms/Product Badge",
  component: ProductBadge,
} as ComponentMeta<typeof ProductBadge>;

const Template: ComponentStory<typeof ProductBadge> = (args) => (
  <ProductBadge {...args} />
);

export const SBahn = Template.bind({});
SBahn.args = {
  product: "SBAHN",
  lineName: "S3",
};

export const UBahn = Template.bind({});
UBahn.args = {
  product: "UBAHN",
  lineName: "U5",
};

export const Tram = Template.bind({});
Tram.args = {
  product: "TRAM",
  lineName: "21",
};

export const Bus = Template.bind({});
Bus.args = {
  product: "BUS",
  lineName: "54",
};

export const RegionalBus = Template.bind({});
RegionalBus.args = {
  product: "REGIONAL_BUS",
  lineName: "24",
};

export const Bahn = Template.bind({});
Bahn.args = {
  product: "BAHN",
  lineName: "RB56",
};

export const Footway = Template.bind({});
Footway.args = {
  product: "FOOTWAY",
};
