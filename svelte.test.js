import '@testing-library/jest-dom/extend-expect'
import {fireEventAsync} from './fire-event-async'
import {getQueriesForElement, fireEvent, wait} from '@testing-library/dom'
import * as svelte from 'svelte'
import Counter from './counter.svelte'

function render(Component) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const ComponentConstructor = Component.default || Component
  const component = new ComponentConstructor({target: container})

  return {
    ...getQueriesForElement(document.body),
    container,
    cleanup() {
      component.$destroy()
      document.body.removeChild(container)
    },
  }
}

test('counter increments', async () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')

  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
