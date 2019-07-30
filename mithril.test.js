import '@testing-library/jest-dom/extend-expect'
import m from 'mithril'
import {getQueriesForElement, fireEvent, wait} from '@testing-library/dom'

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
  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('1'))

  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('2'))
})
