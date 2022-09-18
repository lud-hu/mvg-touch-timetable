import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProductsGrid from "./ProductsGrid";

export default {
  title: "Atoms/Products Grid",
  component: ProductsGrid,
} as ComponentMeta<typeof ProductsGrid>;

const Template: ComponentStory<typeof ProductsGrid> = (args) => (
  <ProductsGrid {...args} />
);

export const One = Template.bind({});
One.args = {
  products: ["UBAHN"],
};

export const Two = Template.bind({});
Two.args = {
  products: ["TRAM", "UBAHN"],
};

export const Three = Template.bind({});
Three.args = {
  products: ["SBAHN", "TRAM", "UBAHN"],
};

export const Four = Template.bind({});
Four.args = {
  products: ["BUS", "SBAHN", "TRAM", "UBAHN"],
};
