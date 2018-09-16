import 'jest-dom/extend-expect'
import {Application, Controller} from 'stimulus'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

class Counter extends Controller {
  static targets = ['output']

  initialize() {
    this.count = 0
  }

  increment() {
    this.count = this.count + 1
    this.outputTarget.textContent = this.count
  }
}

async function render(identifier, controller, html) {
  const container = document.createElement('div')
  container.innerHTML = html

  const application = await Application.start(container)

  application.register(identifier, controller)

  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('counter increments', async () => {
  const html = `
    <div data-controller="counter">
      <button data-action="counter#increment" data-target="counter.output">0</button>
    </div>
  `
  const {getByText} = await render('counter', Counter, html)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
