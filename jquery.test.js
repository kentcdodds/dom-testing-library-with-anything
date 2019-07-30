import '@testing-library/jest-dom/extend-expect'
import $ from 'jquery'
import {getQueriesForElement, fireEvent} from '@testing-library/dom'

$.fn.countify = function countify() {
  this.html(`
    <div>
      <button>0</button>
    </div>
  `)
  const $button = this.find('button')
  $button._count = 0
  $button.click(() => {
    $button._count++
    $button.text($button._count)
  })
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
