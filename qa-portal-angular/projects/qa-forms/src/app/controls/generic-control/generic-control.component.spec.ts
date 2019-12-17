import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericControlComponent } from './generic-control.component';
import { IQuestion } from '../../_common/models';

describe('GenericControlComponent', () => {
  let component: GenericControlComponent;
  let fixture: ComponentFixture<GenericControlComponent>;

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
      declarations: [ GenericControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericControlComponent);
    component = fixture.componentInstance;
    component.question = mockQuestion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
