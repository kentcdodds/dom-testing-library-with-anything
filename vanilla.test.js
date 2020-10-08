import '@testing-library/jest-dom/extend-expect'
import {getQueriesForElement} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function countify(el) {
  el.innerHTML = `
    <div>
      <button>0</button>
    </div>
  `
  const button = el.querySelector('button')
  button._count = 0
  button.addEventListener('click', () => {
    button._count++
    button.textContent = button._count
  })
}

// tests:
test('counter increments', () => {
  const div = document.createElement('div')
  countify(div)
  const {getByText} = getQueriesForElement(div)
  const counter = getByText('0')
  userEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  userEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
