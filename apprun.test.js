import React from 'apprun'
import 'jest-dom/extend-expect'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

const app = React
const state = 0
const update = {INC: state => state + 1}
const view = state => (
  <div>
    <button onclick={() => app.run('INC')}>{state}</button>
  </div>
)

function render({
  state,
  view,
  update,
  container = document.createElement('div'),
}) {
  document.body.appendChild(container)
  app.start(container, state, view, update)
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('renders a counter', () => {
  const {getByText} = render({state, view, update})
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
