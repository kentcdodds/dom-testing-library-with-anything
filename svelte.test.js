import 'jest-dom/extend-expect'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'
import * as svelte from 'svelte'

const Counter = svelte.create(`
  <div>
    <button on:click='set({ count: count + 1 })'>
      {count}
    </button>
  </div>
`)

function render(
  Contructor,
  {container = document.createElement('div'), ...options} = {},
) {
  const counter = new Contructor({
    target: container,
    ...options,
  })
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('counter increments', () => {
  const {getByText} = render(Counter, {data: {count: 0}})
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
