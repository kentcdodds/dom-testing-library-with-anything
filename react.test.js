import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import ReactDOM from 'react-dom'
import {getQueriesForElement, fireEvent} from '@testing-library/dom'

function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return (
    <div>
      <button onClick={increment}>{count}</button>
    </div>
  )
}

function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  document.body.appendChild(container)
  return {
    ...getQueriesForElement(container),
    container,
    cleanup() {
      ReactDOM.unmountComponentAtNode(container)
      document.body.removeChild(container)
    },
  }
}

test('renders a counter', () => {
  const {getByText, cleanup} = render(<Counter />)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
  cleanup()
})
