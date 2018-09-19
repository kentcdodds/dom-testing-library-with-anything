/** @jsx Preact.h */
import 'jest-dom/extend-expect'
import * as Preact from 'preact'
import {fireEventAsync} from './fire-event-async'
import {getQueriesForElement, wait} from 'dom-testing-library'

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
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
