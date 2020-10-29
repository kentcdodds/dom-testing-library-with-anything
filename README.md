<h1 align="center">
  <a href="https://testingjavascript.com/courses/use-dom-testing-library-to-test-any-js-framework">Use DOM Testing Library to test any JS framework</a>
</h1>

<div align="center">
  <h2><a href="https://testingjavascript.com">TestingJavaScript.com</a></h2>
  <a href="https://testingjavascript.com">
    <img
      width="500"
      alt="Learn the smart, efficient way to test any JavaScript application."
      src="https://kentcdodds.com/images/testingjavascript-promo/tjs-4.jpg"
    />
  </a>
</div>

<hr />

Anything you can render to the DOM, you can test with DOM Testing Library.

This repo is a bunch of simple examples of using DOM Testing Library to test a
`Counter` component in various frameworks. If your framework of choice is not
listed here, please add it!

## Contributing

> NOTE: In the interest of full disclosure, this repository will be used by me
> to create a course on testing for which I will be paid.

The prime example is this react version:

```javascript
// adds handy assertions we'll use
import '@testing-library/jest-dom/extend-expect'

// framework imports
import * as React from 'react'
import ReactDOM from 'react-dom'

// DOM Testing Library utilities
// note: if your framework does not apply updates to the DOM synchronously
// then you can use the userEventAsync export in ./user-event-async.js
// see hyperapp.test.js for an example of this.
import {getQueriesForElement} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

// the component in your framework
function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return (
    <div>
      <button onClick={increment}>{count}</button>
    </div>
  )
}

// a generic "render" method that you could use for any component for
// your framework
function render(ui) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  ReactDOM.render(ui, container)
  return {
    container,
    ...getQueriesForElement(container),
  }
}

// the test.
// This test _should_ look almost identical between each framework
// that's the idea that I'm trying to get across in this repo!
test('renders a counter', () => {
  const {getByText} = render(<Counter />)
  const counter = getByText('0')
  userEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  userEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
```

If you can make your example resemble that, I would be thrilled :)

### IMPORTANT Notes

I want to keep things as simple as possible, but I also want to be true to
what's typical for a given framework. If your framework strongly encourages the
use of TypeScript for example, then please feel free to use TypeScript (Jest
should already be configured to pick it up properly).

If Jest is not the testing framework of choice for your web framework, I'd still
prefer to stick with Jest. Hopefully it shouldn't make much of a difference for
the test itself.

Try really hard to keep everything in a single file, even if that means
authoring your component in a slightly non-typical way.

This project is setup with prettier, husky, and lint-staged. That means that
when you commit, a git commit hook will automatically format the files you're
changing and run the tests relevant to those files. Neat right?

## LICENSE

MIT
