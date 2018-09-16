import 'jest-dom/extend-expect'
import Vue from 'vue'
import {getQueriesForElement} from 'dom-testing-library'
import {fireEventAsync} from './fire-event-async'

const Counter = {
  data: () => ({counter: 0}),
  methods: {
    handleIncrement() {
      this.counter++
    },
  },
  render(h) {
    return h('div', [
      h(
        'button',
        {
          on: {
            click: this.handleIncrement,
          },
        },
        this.counter,
      ),
    ])
  },
}

function renderComponent(ui) {
  const vm = new Vue(ui).$mount()
  return {
    container: vm.$el,
    ...getQueriesForElement(vm.$el),
  }
}

test('counter increments', async () => {
  const {getByText} = renderComponent(Counter)
  const counter = getByText('0')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')

  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
