import 'jest-dom/extend-expect'
import fromHTML from 'from-html/lib/from-html'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

class Counter {
  constructor() {
    fromHTML(
      `
        <div ref="container">
          <button ref="counter" on="click">0</button>
        </div>
      `,
      this,
      'refs',
    )
  }

  mount(target) {
    target.append(this.refs.container)
  }

  handleEvent({type}) {
    if (type === 'click') {
      const {counter} = this.refs
      counter.textContent = Number(counter.textContent) + 1
    }
  }
}

// from-html-testing-library
function render(FromHtmlClass) {
  const instance = new FromHtmlClass()
  const container = document.createElement('div')
  instance.mount(container)
  return {
    container,
    instance,
    ...getQueriesForElement(container),
  }
}
// export * from 'dom-testing-library'
// export {render}

// tests:
test('counter increments', () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
