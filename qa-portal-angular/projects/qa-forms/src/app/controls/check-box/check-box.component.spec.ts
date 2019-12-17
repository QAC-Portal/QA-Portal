import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxComponent } from './check-box.component';
import { MatCheckboxModule, MatGridListModule, MatCardModule, MatInput, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { IQuestion, IQuestionResponse } from '../../_common/models';

describe('CheckBoxComponent', () => {
  let component: CheckBoxComponent;
  let fixture: ComponentFixture<CheckBoxComponent>;

  const mockQuestion: IQuestion = {
    id: 123,
    body: 'test body',
    hasComment: false,
    commentLabel: 'test comment label',
    selectionType: 'RADIO_BUTTON',
    selectionOptionsList: ['a', 'b', 'c']
  };

  const mockQuestionResponse: IQuestionResponse = {
    id: 456,
    comment: {
      id: 789,
      content: 'test comment content'
    },
    question: mockQuestion,
    responseValues: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxComponent ],
      imports: [
        MatCheckboxModule,
        FormsModule,
        MatGridListModule,
        MatCardModule,
        MatFormFieldModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxComponent);
    component = fixture.componentInstance;
    component.question = mockQuestion;
    component.questionResponse = mockQuestionResponse;
    fixture.detectChanges();

    component.question = new IQuestion();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
