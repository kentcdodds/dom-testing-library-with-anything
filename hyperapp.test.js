/** @jsx hyperapp.h */
import '@testing-library/jest-dom/extend-expect'
import * as hyperapp from 'hyperapp/dist/hyperapp'
import {userEventAsync, nextTick} from './user-event-async'
import {getQueriesForElement} from '@testing-library/dom'

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
  await nextTick()
  return {
    container,
    ...getQueriesForElement(container),
  }
}

// export {render}
// export * from '@testing-library/dom'

test('renders a counter', async () => {
  const {getByText} = await render({state, view, actions})
  const counter = getByText('0')
  await userEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')

  await userEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
