/** @jsx h */
import 'jest-dom/extend-expect'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'
import {h, render} from 'wigly'

var Counter = {
  data: () => ({count: 0}),

  increment() {
    this.setState(({count}) => ({count: count + 1}))
  },

  render() {
    return (
      <div>
        <button onclick={this.increment}>{this.state.count}</button>
      </div>
    )
  },
}

test('renders a counter', () => {
  var el = render(Counter, document.body)
  var {getByText} = getQueriesForElement(el)
  var counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
