import 'jest-dom/extend-expect'
import m from 'mithril'
import {getQueriesForElement, fireEvent, wait} from 'dom-testing-library'

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

// tests:
test('counter increments', async () => {
  const div = document.createElement('div')
  m.mount(div, Counter)

  const {getByText} = getQueriesForElement(div)
  const counter = getByText('0')
  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('1'))

  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('2'))
})
