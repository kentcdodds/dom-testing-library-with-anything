import {LitElement, html} from '@polymer/lit-element'

class LitElementCounter extends LitElement {
  static get properties() {
    return {
      count: Number,
    }
  }

  constructor() {
    super()
    this.count = 0
  }

  render() {
    return html`<button @click="${e => (this.count += 1)}">${
      this.count
    }</button>`
  }
}

customElements.define('lit-element-counter', LitElementCounter)

function render() {
  const container = document.createElement('div')
  const component = document.createElement('lit-element-counter')
  container.appendChild(component)
  document.body.appendChild(container)
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
