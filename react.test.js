import 'jest-dom/extend-expect'
import React from 'react'
import ReactDOM from 'react-dom'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

class Counter extends React.Component {
  state = {count: 0}
  increment = () => this.setState(({count}) => ({count: count + 1}))
  render() {
    return (
      <div>
        <button onClick={this.increment}>{this.state.count}</button>
      </div>
    )
  }
}

function render(ui) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  ReactDOM.render(ui, container)
  return {
    container,
    cleanup() {
      ReactDOM.unmountComponentAtNode(container)
      document.body.removeChild(container)
    },
    ...getQueriesForElement(container),
  }
}

test('renders a counter', () => {
  const {getByText} = render(<Counter />)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
