import {fireEvent, getQueriesForElement} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import $ from 'jquery'
import ko from 'knockout'

var viewModel = {
  counter: ko.observable(0),
  increment: function() {
    this.counter(this.counter() + 1)
  },
}

$.fn.countify = function countify() {
  this.html(`
    <div>
      <button data-bind='text: counter, click: increment'></button>
    </div>
  `)
  ko.applyBindings(viewModel, this.find('button')[0])
}

// tests:
test('counter increments', () => {
  const div = document.createElement('div')
  $(div).countify()
  const {getByText} = getQueriesForElement(div)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
