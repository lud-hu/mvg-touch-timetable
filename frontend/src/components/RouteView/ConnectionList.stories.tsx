import { ComponentMeta, ComponentStory } from "@storybook/react";
import ConnectionList from "./ConnectionList";
import testData from "./testData3.json";

export default {
  title: "Molecules/Connection List",
  component: ConnectionList,
  decorators: [
    (Story) => (
      <div style={{ width: 500, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ConnectionList>;

const Template: ComponentStory<typeof ConnectionList> = (args) => (
  <ConnectionList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  connections: testData as any,
};
