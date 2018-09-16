import 'jest-preset-angular'
import 'jest-dom/extend-expect'

import {TestBed, ComponentFixtureAutoDetect} from '@angular/core/testing'
import {Component} from '@angular/core'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

@Component({
  template: `<div>
               <button (click)="increment()">{{count}}</button>
             </div>`,
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
  const nativeElement = fixture.debugElement.nativeElement

  return {
    ...getQueriesForElement(nativeElement),
  }
}

test('renders a counter', () => {
  const {getByText} = render(AppComponent)
  const counter = getByText('0')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
