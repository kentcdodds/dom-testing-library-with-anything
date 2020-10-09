import Vue from 'vue/dist/vue'
import '@testing-library/jest-dom/extend-expect'
import {userEventAsync} from './user-event-async'
import {getQueriesForElement} from '@testing-library/dom'

Vue.config.productionTip = false
Vue.config.devtools = false

const Counter = {
  template: `
    <div>
      <button @click='increment'>
        {{count}}
      </button>
    </div>
  `,
  data: () => ({count: 0}),
  methods: {
    increment() {
      this.count++
    },
  },
}

function render(Component) {
  const vm = new Vue(Component).$mount()
  return {
    container: vm.$el,
    ...getQueriesForElement(vm.$el),
  }
}

test('counter increments', async () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  await userEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')

  await userEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
