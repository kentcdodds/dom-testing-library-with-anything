import 'jest-dom/extend-expect'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'
import * as svelte from 'svelte'

const counterTemplate = `
  <div>
    <button on:click='set({ count: count + 1 })'>
      {count}
    </button>
  </div>
`

function render(template, options) {
  const container = document.createElement('div')
  const Constructor = svelte.create(template)
  new Constructor({
    target: container,
    ...options,
  })
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('counter increments', () => {
  const {getByText} = render(counterTemplate, {data: {count: 0}})
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
