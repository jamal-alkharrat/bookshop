// FILEPATH: /c:/Users/jamal/Code/bookshop/tests/unit/LoginForm.spec.js
import { test } from 'vitest'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import LoginForm from '@/components/LoginForm.vue'
import { ref } from 'vue'

// Mock axios
axios.post = async () => ({
  data: {
    token: 'testToken',
    userID: '1',
    username: 'testUser',
    email: 'test@test.com',
  },
})


test('LoginForm.vue initializes with correct elements', ({ is }) => {
  const loginForm = ref({
    email: '',
    password: '',
  });

  const wrapper = mount(LoginForm, {
    global: {
      provide: {
        loginForm,
      },
    },
  });

  // check if form fields exist
  is(true, wrapper.find('#email').exists());
  is(true, wrapper.find('#password').exists());

  wrapper.unmount();
});

test('LoginForm.vue sets the form data correctly', async ({ is }) => {
  const wrapper = mount(LoginForm)

  // set form data
  wrapper.vm.loginForm.email = 'test25@gmail.com'
  wrapper.vm.loginForm.password = 'test25test25'

  await wrapper.vm.$nextTick()

  is('test25@gmail.com', wrapper.vm.loginForm.email)
  is('test25test25', wrapper.vm.loginForm.password)

  wrapper.unmount()
})