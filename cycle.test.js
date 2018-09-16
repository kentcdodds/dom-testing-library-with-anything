import {run} from '@cycle/run'
import {button, makeDOMDriver} from '@cycle/dom'
import 'jest-dom/extend-expect'
import {getQueriesForElement, wait} from 'dom-testing-library'
import {fireEventAsync} from './fire-event-async'

function main(sources) {
  const increment$ = sources.DOM.select('button')
    .events('click')
    .fold(acc => acc + 1, 0)

  const vdom$ = increment$.map(button)
  return {DOM: vdom$}
}

async function render() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  run(main, {DOM: makeDOMDriver(container)})
  await wait() // wait for render
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('renders a counter', async () => {
  const {getByText} = await render()
  const counter = getByText('0')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
