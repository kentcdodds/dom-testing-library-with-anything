/** @jsx hyperapp.h */
import 'jest-dom/extend-expect'
import * as hyperapp from 'hyperapp'
import {getQueriesForElement, wait, fireEvent} from 'dom-testing-library'

export const state = {count: 0}

export const actions = {
  increment: value => state => ({count: state.count + value}),
}

export const view = (state, actions) => (
  <div>
    <button onclick={() => actions.increment(1)}>{state.count}</button>
  </div>
)

async function render({
  state,
  view,
  actions,
  container = document.createElement('div'),
}) {
  hyperapp.app(state, actions, view, container)
  await wait() // hyperapp renders on the next tick
  return {
    container,
    ...getQueriesForElement(container),
  }
}

// export {render}
// export * from 'dom-testing-library'

async function click(el) {
  fireEvent.click(el)
  await wait()
}

test('renders a counter', async () => {
  const {getByText, getByTestId} = await render({state, view, actions})
  const counter = getByText('0')
  await click(counter)
  expect(counter).toHaveTextContent('1')
  await click(counter)
  expect(counter).toHaveTextContent('2')
})
