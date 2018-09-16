import 'jest-dom/extend-expect'

import TorsoView from 'backbone-torso/modules/View'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

const CounterView = TorsoView.extend({
  initialize: function() {
    this.listenTo(this.viewState, 'change:counter', this.render)
    this.set('counter', 0)
  },

  template: context => `<button id="counter">${context.view.counter}</button>`,

  events: {
    'click #counter': 'increment',
  },

  increment: function() {
    this.set('counter', this.get('counter') + 1)
  },
})

function render(View) {
  const view = new View()
  view.render()

  return {
    ...getQueriesForElement(view.el),
  }
}

test('counter increments', () => {
  const {getByText} = render(CounterView)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
