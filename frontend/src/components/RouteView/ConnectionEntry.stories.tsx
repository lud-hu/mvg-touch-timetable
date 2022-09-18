import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ConnectionEntry from "./ConnectionEntry";
import testdata from "../../components/RouteView/testData.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ConnectionEntry",
  component: ConnectionEntry,
  //   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof ConnectionEntry>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ConnectionEntry> = (args) => (
  <ConnectionEntry {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  connection: testdata as any,
};
