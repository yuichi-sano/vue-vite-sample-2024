import PasswordReset from "@/pages/auths/PasswordReset.vue";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Example/PasswordReset",
  component: PasswordReset,
  argTypes: {
    email: { control: "text", name: "メールアドレス" },
    newPassword: { control: "password", name: "新しいパスワード" },
    rePassword: { control: "password", name: "パスワード(確認)" },
  },
} as Meta<typeof PasswordReset>;

const Template: StoryFn<typeof PasswordReset> = (args, { argTypes }) => ({
  components: { PasswordReset },
  setup() {
    return { args, argTypes };
  },
  template: '<PasswordReset v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
