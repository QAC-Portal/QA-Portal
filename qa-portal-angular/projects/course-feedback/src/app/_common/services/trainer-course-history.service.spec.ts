import { TestBed } from '@angular/core/testing';

import { TrainerCourseHistoryService } from './trainer-course-history.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

class MockHttpClient {
  public get() {
    return of(null);
  }
}

fdescribe('TrainerEvaluationHistoryService', () => {
  
  let service: TrainerCourseHistoryService;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TrainerCourseHistoryService,
      {provide: HttpClient, useClass: MockHttpClient}
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(TrainerCourseHistoryService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    const service: TrainerCourseHistoryService = TestBed.get(TrainerCourseHistoryService);
    expect(service).toBeTruthy();
  });

  it('should get course history', done => {
    httpClient.get = (url) => {
      expect(url).toEqual('/feedback-api/evaluation/trainer');
      return of(null);
    };
    
    service.getCourseHistory().subscribe(() => done());
  });

});
