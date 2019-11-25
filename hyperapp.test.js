/** @jsx hyperapp.h */
import '@testing-library/jest-dom/extend-expect'
import * as hyperapp from 'hyperapp'
import {getQueriesForElement, wait, fireEvent} from '@testing-library/dom'

const state = {count: 0}

const view = state => (
  <div>
    <button onclick={s => ({count: s.count + 1})}>{state.count}</button>
  </div>
)

async function render({
  state,
  view,
  container = document.createElement('div'),
}) {
  hyperapp.app({init: state, view, node: container})
  document.body.appendChild(container)
  await wait(() => expect(container).not.toBeEmpty())
  return {
    container,
    ...getQueriesForElement(container),
  }
}

// export {render}
// export * from '@testing-library/dom'

test('renders a counter', async () => {
  const {findByText} = await render({state, view})
  const counter = await findByText('0')
  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('1'))

  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('2'))
})
