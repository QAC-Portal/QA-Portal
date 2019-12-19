import { Observable, of } from 'rxjs';
import { TrainerCourseHistoryModel } from '../trainer-evaluation-history/models/trainer-course.history.model';

export class MockRetrieveTrainerEvaluationHistoryService {

  getEvalHistory(): Observable<any> {
    return of('test data');
  }
}
