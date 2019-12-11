import { TestBed } from '@angular/core/testing';
import { RetrieveTrainerEvaluationHistoryService } from './retrieve-trainer-evaluation-history.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { GET_COHORT_COURSES_FOR_TRAINER } from '../../_common/models/course-feedback.constants';

class MockHttpClient {
  public get() {
    return of(null);
  }
}

fdescribe('RetrieveTrainerEvaluationHistoryService', () => {
  let service: RetrieveTrainerEvaluationHistoryService;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RetrieveTrainerEvaluationHistoryService,
      { provide: HttpClient, useClass: MockHttpClient }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(RetrieveTrainerEvaluationHistoryService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reach the correct endpoint url', done => {
    httpClient.get = (url) => {
      expect(url).toEqual(GET_COHORT_COURSES_FOR_TRAINER);
      return of(null);
    };
    service.getEvalHistory().subscribe(() => done());
  });

});
