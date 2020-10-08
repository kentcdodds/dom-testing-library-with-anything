import 'jest-preset-angular'
import '@testing-library/jest-dom/extend-expect'

import {TestBed, ComponentFixtureAutoDetect} from '@angular/core/testing'
import {Component} from '@angular/core'
import {getQueriesForElement} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

@Component({
  template: `
    <div>
      <button (click)="increment()">{{ count }}</button>
    </div>
  `,
})
export class AppComponent {
  count = 0

  private increment() {
    this.count = this.count + 1
  }
}

function render(component: any) {
  TestBed.configureTestingModule({
    declarations: [component],
    providers: [{provide: ComponentFixtureAutoDetect, useValue: true}],
  }).compileComponents()

  const fixture = TestBed.createComponent(component)
  const container = fixture.debugElement.nativeElement

  return getQueriesForElement(container)
}

test('renders a counter', () => {
  const {getByText} = render(AppComponent)
  const counter = getByText('0')

  userEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  userEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
