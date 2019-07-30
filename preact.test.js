/** @jsx Preact.h */
import '@testing-library/jest-dom/extend-expect'
import * as Preact from 'preact'
import {getQueriesForElement, fireEvent, wait} from '@testing-library/dom'

class Counter extends Preact.Component {
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
  Preact.render(ui, container)
  return {
    container,
    ...getQueriesForElement(container),
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
