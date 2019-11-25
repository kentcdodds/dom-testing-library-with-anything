import WidgetBase from '@dojo/framework/core/WidgetBase'
import {Constructor} from '@dojo/framework/core/interfaces'
import {renderer, v, w} from '@dojo/framework/core/vdom'
import {getQueriesForElement, fireEvent} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

class Counter extends WidgetBase {
  count = 0
  private increment() {
    this.count++
    this.invalidate()
  }
  protected render() {
    return v('div', [v('button', {onclick: this.increment}, [`${this.count}`])])
  }
}

function render(ui: Constructor<WidgetBase>) {
  const container = document.createElement('div')
  const r = renderer(() => w(ui, {}))
  r.mount({domNode: container, sync: true})
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('renders counter', () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
