import { ComponentMeta, ComponentStory } from "@storybook/react";
import testdata from "../../../stories/testData.json";
import TouchLine from "./TouchLine";

export default {
  title: "Atoms/Touch Line",
  component: TouchLine,
  decorators: [
    (Story) => (
      <div style={{ width: 110, height: 110 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TouchLine>;

const Template: ComponentStory<typeof TouchLine> = (args) => (
  <TouchLine {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  start: [50, 50],
  stop: [100, 100],
};
