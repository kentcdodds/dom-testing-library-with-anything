/** @jsx hyperapp.h */
import '@testing-library/jest-dom/extend-expect'
import * as hyperapp from 'hyperapp/dist/hyperapp'
import {fireEventAsync} from './fire-event-async'
import {getQueriesForElement, wait} from '@testing-library/dom'

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
  await wait()
  return {
    container,
    ...getQueriesForElement(container),
  }
}

// export {render}
// export * from '@testing-library/dom'

test('renders a counter', async () => {
  const {getByText, getByTestId} = await render({state, view, actions})
  const counter = getByText('0')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')

  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
