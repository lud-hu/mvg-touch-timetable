import { ComponentMeta, ComponentStory } from "@storybook/react";
import testdata from "../../components/RouteView/testData.json";
import testdata2 from "../../components/RouteView/testData2.json";
import ConnectionEntry from "./ConnectionEntry";

export default {
  title: "Molecules/Connection List Entry",
  component: ConnectionEntry,
  decorators: [
    (Story) => (
      <div style={{ width: 500, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ConnectionEntry>;

const Template: ComponentStory<typeof ConnectionEntry> = (args) => (
  <ConnectionEntry {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  connection: testdata2 as any,
};

export const WithDelay = Template.bind({});
WithDelay.args = {
  connection: {
    ...(testdata2 as any),
    connectionPartList: [
      {
        ...(testdata2 as any).connectionPartList[0],
        delay: 2,
      },
      ...(testdata2 as any).connectionPartList.slice(1),
    ],
  },
};

export const LongList = Template.bind({});
LongList.args = {
  connection: testdata as any,
};
