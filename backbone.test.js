import '@testing-library/jest-dom/extend-expect'
import $ from 'jquery'
import Backbone from 'backbone'
import fromHTML from 'from-html/lib/from-html'
import {getQueriesForElement, fireEvent} from '@testing-library/dom'

const Counter = Backbone.View.extend({
  initialize() {
    this.count = 0
  },
  events: {
    'click button': 'increment',
  },
  increment() {
    this.count = this.count + 1
    this.$el.find('button').text(this.count)
  },
  render() {
    return this.$el.html(`
      <div>
        <button>${this.count}</button>
      </div>
    `)
  },
})

// tests:
test.skip('counter increments', () => {
  const div = document.createElement('div')
  new Counter({el: div})
  const {getByText} = getQueriesForElement(div)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
