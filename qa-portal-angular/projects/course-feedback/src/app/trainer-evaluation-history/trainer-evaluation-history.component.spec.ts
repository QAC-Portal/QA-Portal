import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TrainerEvaluationHistoryComponent } from './trainer-evaluation-history.component';
import { MatProgressSpinnerModule, MatCardModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { RetrieveTrainerEvaluationHistoryService } from './services/retrieve-trainer-evaluation-history.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QaErrorModule } from 'projects/qa-error-app/src/app/qa-error.module';
import { QaErrorHandlerService } from 'projects/portal-core/src/app/_common/services/qa-error-handler.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { MockQaErrorHandlerService } from 'projects/portal-core/src/app/_mocks/qa-error-handler.service.mock';
import { MockRetrieveTrainerEvaluationHistoryService } from '../_mocks/retrieve-trainer-evaluation-history.service.mock';
import { of } from 'rxjs';
import { throwError } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';


fdescribe('TrainerEvaluationHistoryComponent', () => {
  let component: TrainerEvaluationHistoryComponent;
  let fixture: ComponentFixture<TrainerEvaluationHistoryComponent>;
  let retTrainerEvalHistService: MockRetrieveTrainerEvaluationHistoryService
  let qaErrorHandlerService: QaErrorHandlerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerEvaluationHistoryComponent],
      providers: [
        { provide: RetrieveTrainerEvaluationHistoryService, useClass: MockRetrieveTrainerEvaluationHistoryService },
        { provide: QaErrorHandlerService, useClass: MockQaErrorHandlerService }
      ],
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        MatTableModule,
        MatTooltipModule,
        RouterTestingModule,
        HttpClientTestingModule,
        QaErrorModule,
        ToastrModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerEvaluationHistoryComponent);
    retTrainerEvalHistService = TestBed.get(RetrieveTrainerEvaluationHistoryService);
    qaErrorHandlerService = TestBed.get(QaErrorHandlerService);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate tables with trainer evaluation history data', () => {
    expect(component.dataLoading).toBe(false);

    spyOn(retTrainerEvalHistService, 'getEvalHistory').and.returnValue(
      of({
        currentCohortCourse: 'current test cohort course data',
        previousCohortCourses: 'previous test cohort course data',
        cohortCourseHistory: 'test cohort course history data',
        averageKnowledgeRating: '6',
        averageTqiRating: '5'
      }));


    component.ngOnInit();

    expect(retTrainerEvalHistService.getEvalHistory).toHaveBeenCalled();
  });

  it('should respond with the approproate error when data is not returned from api', inject([QaErrorHandlerService], (service: QaErrorHandlerService) => {

    // const spy = spyOn(console, 'log');;
    // const error: HttpErrorResponse = new HttpErrorResponse({ error: 'Error', status: 400 });
    // service.handleError(error);
    // expect(spy).toHaveBeenCalledWith(error);

    spyOn(retTrainerEvalHistService, 'getEvalHistory').and.returnValue(throwError('some error'));

    component.ngOnInit();
    expect(component.ngOnInit).toThrowError();
    // expect(retTrainerEvalHistService.getEvalHistory).toThrowError();
    expect(component.dataLoading).toBe(false);

  }));

});