import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TrainerCourseHistoryModel} from '../../trainer-evaluation-history/models/trainer-course.history.model';
import { QaHttpService } from 'projects/portal-core/src/app/_common/services/qa-http.service';

@Injectable()
export class TrainerCourseHistoryService {

  constructor(private qaHttp: QaHttpService) { }

  getCourseHistory(): Observable<TrainerCourseHistoryModel> {
    return this.qaHttp.get<TrainerCourseHistoryModel>('/feedback-api/evaluation/trainer');
  }
}
