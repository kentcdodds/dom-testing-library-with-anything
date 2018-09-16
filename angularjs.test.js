import 'jest-dom/extend-expect'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'
import angular from 'angular'

angular.module('myApp', [])
  .component('myCounter', {
    template: `
      <button ng-click="$ctrl.increment()">{{$ctrl.count}}</button>
    `,
    controller: function MyCounter() {
      this.count = 0;
      this.increment = function () {
        this.count += 1;
      }
    }
  })

function render(html, config) {
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.appendChild(container)

  angular.bootstrap(container, config.modules)

  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('renders a counter', () => {
  const {getByText} = render(`<my-counter></my-counter>`, { modules: ['myApp'] })
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
