import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';
import { MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { IQuestion } from '../../_common/models';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;

  const mockQuestion: IQuestion = {
    id: 123,
    body: 'test body',
    hasComment: false,
    commentLabel: 'test comment label',
    selectionType: 'RADIO_BUTTON',
    selectionOptionsList: ['a', 'b', 'c']
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioButtonComponent],
      imports: [
        MatRadioModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
    component.question = mockQuestion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
