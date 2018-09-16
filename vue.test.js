import 'jest-dom/extend-expect'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'
import Vue from 'vue/dist/vue'

const Counter = {
  template: `
    <div>
        <button @click='increment'>
            {{count}}
        </button>
    </div>`,
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
  fireEvent.click(counter)
  await Vue.nextTick()
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  await Vue.nextTick()
  expect(counter).toHaveTextContent('2')
})
