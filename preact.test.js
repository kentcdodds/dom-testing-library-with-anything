/** @jsx h */
import '@testing-library/jest-dom/extend-expect'
import {h, render as preactRender} from 'preact'
import {useState} from 'preact/hooks'
import {getQueriesForElement, fireEvent, wait} from '@testing-library/dom'

function Counter() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(c => c + 1)
  return (
    <div>
      <button onClick={increment}>{count}</button>
    </div>
  )
}

function render(ui) {
  const container = document.createElement('div')
  preactRender(ui, container)
  return {
    ...getQueriesForElement(container),
    container,
  }
}

test('renders a counter', async () => {
  const {getByText} = render(<Counter />)
  const counter = getByText('0')
  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('1'))

  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('2'))
})
