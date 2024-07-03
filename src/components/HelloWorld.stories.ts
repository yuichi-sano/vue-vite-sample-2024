import HelloWorld from "./HelloWorld.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof HelloWorld>;

const meta: Meta<typeof HelloWorld> = {
  title: "HelloWorld",
  component: HelloWorld,
};

export const Default: Story = {
  render: () => ({
    components: { HelloWorld },
    template: "<HelloWorld msg='Vite + Vue' />",
  }),
};

export default meta;