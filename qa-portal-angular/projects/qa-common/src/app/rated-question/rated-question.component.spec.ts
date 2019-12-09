import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedQuestionComponent } from './rated-question.component';
import { MatRadioModule } from '@angular/material';

describe('RatedQuestionComponent', () => {
  let component: RatedQuestionComponent;
  let fixture: ComponentFixture<RatedQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatedQuestionComponent],
      imports: [MatRadioModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedQuestionComponent);
    component = fixture.componentInstance;

    component.selectedRating = { response: null };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow you to pick a rating', () => {
    const testData = '1';
    component.setModel(testData);
    expect(component.selectedRating.response).toEqual(testData);
  })
});
