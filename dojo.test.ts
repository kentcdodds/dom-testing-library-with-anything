import ProjectorMixin from '@dojo/framework/widget-core/mixins/Projector'
import WidgetBase from '@dojo/framework/widget-core/WidgetBase'
import {v} from '@dojo/framework/widget-core/d'
import {Constructor} from '@dojo/framework/widget-core/interfaces'
import {getQueriesForElement, fireEvent} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

class Counter extends WidgetBase {
  count = 0
  increment() {
    this.count++
    this.invalidate()
  }
  render() {
    return v('div', [v('button', {onclick: this.increment}, [`${this.count}`])])
  }
}

function render(ui: Constructor<WidgetBase>) {
  const container = document.createElement('div')
  const Projector = ProjectorMixin(ui)
  const projector = new Projector()
  projector.async = false
  projector.append(container)
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
