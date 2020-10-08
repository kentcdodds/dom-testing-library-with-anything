import '@testing-library/jest-dom/extend-expect'
import m from 'mithril'
import {getQueriesForElement, waitFor} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

const Counter = () => {
  let count = 0
  return {
    view: () =>
      m(
        'button',
        {
          onclick: () => {
            count++
          },
        },
        count,
      ),
  }
}

function render(component) {
  const container = document.createElement('div')
  m.mount(container, component)
  return {
    container,
    ...getQueriesForElement(container),
  }
}

// tests:
test('counter increments', async () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  userEvent.click(counter)
  await waitFor(() => expect(counter).toHaveTextContent('1'))

  userEvent.click(counter)
  await waitFor(() => expect(counter).toHaveTextContent('2'))
})
