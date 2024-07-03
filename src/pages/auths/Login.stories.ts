import { Meta, StoryFn } from "@storybook/vue3";
import LoginPage from "./Login.vue";

export default {
  title: "Example/LoginPage",
  component: LoginPage,
  argTypes: {
    mail: { control: "text", name: "メールアドレス" },
    password: { control: "password", name: "パスワード" },
  },
} as Meta<typeof LoginPage>;

const Template: StoryFn<typeof LoginPage> = (args, { argTypes }) => ({
  components: { LoginPage },
  setup() {
    return { args, argTypes };
  },
  template: '<LoginPage v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
