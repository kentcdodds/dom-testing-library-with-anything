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

function render(ui) {
  const container = document.createElement('div')
  container.setAttribute('ng-app', 'myApp')
  container.innerHTML = '<my-counter></my-counter>'
  document.body.appendChild(container)

  angular.bootstrap(container, ['myApp'])

  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('renders a counter', () => {
  const {getByText} = render()
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
