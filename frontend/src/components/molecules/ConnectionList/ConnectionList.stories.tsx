import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Connection } from "../../Util/Types";
import ConnectionList from "./ConnectionList";
import testData from "../../../stories/testData.json";

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

const now = new Date();

export const Primary = Template.bind({});
Primary.args = {
  connections: ([testData, testData, testData] as unknown as Connection[]).map(
    (c, i) => ({
      ...c,
      departure: new Date(now.getTime() + i * 60000).getTime(),
      arrival: new Date(now.getTime() + (i + 10) * 60000).getTime(),
    })
  ),
};
