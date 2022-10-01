import { ComponentMeta, ComponentStory } from "@storybook/react";
import testdata from "../../../stories/testData.json";
import testdata2 from "../../../stories/testData2.json";
import { Connection } from "../../Util/Types";
import ConnectionDetails from "./ConnectionDetails";

export default {
  title: "Molecules/Connection Details",
  component: ConnectionDetails,
  decorators: [
    (Story) => (
      <div style={{ width: 500, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ConnectionDetails>;

const Template: ComponentStory<typeof ConnectionDetails> = (args) => (
  <ConnectionDetails {...args} />
);

const now = new Date();

const getUpToDateConnection = (connection: Connection): Connection => {
  return {
    ...connection,
    departure: new Date(now.getTime() + 2 * 60000).getTime(),
    arrival: new Date(now.getTime() + 12 * 60000).getTime(),
  };
};

export const Primary = Template.bind({});
Primary.args = {
  connection: getUpToDateConnection(testdata2 as unknown as Connection),
};

export const WithDelay = Template.bind({});
WithDelay.args = {
  connection: getUpToDateConnection({
    ...(testdata2 as any),
    connectionPartList: [
      {
        ...(testdata2 as any).connectionPartList[0],
        delay: 2,
      },
      ...(testdata2 as any).connectionPartList.slice(1),
    ],
  }),
};

export const LongList = Template.bind({});
LongList.args = {
  connection: testdata as unknown as Connection,
};
