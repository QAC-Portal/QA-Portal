import { Injectable } from '@angular/core';
import { QaHttpService } from 'projects/portal-core/src/app/_common/services/qa-http.service';
import { Observable } from 'rxjs';
import {
  CREATE_EVALUATION_FORM_URL,
  GET_EVALUATION_FOR_TRAINEE_AND_COURSE_URL,
  UPDATE_EVALUATION_FORM_URL
} from '../models/course-feedback.constants';
import { IFormModel } from 'projects/qa-forms/src/app/_common/models';
import {IFormService} from './iform.service';

@Injectable()
export class EvaluationService implements IFormService {

  constructor(private qaHttp: QaHttpService) { }

  public getForm(cohortCourseId: string): Observable<IFormModel> {
    return this.qaHttp.get<IFormModel>({ ref: 'GET_EVALUATION_FOR_TRAINEE_AND_COURSE_URL'} + cohortCourseId);
  }

  public createForm(formModel: IFormModel): Observable<IFormModel> {
    return this.qaHttp.post<IFormModel>({ ref: 'CREATE_EVALUATION_FORM_URL'}, formModel);
  }

  public updateForm(formModel: IFormModel): Observable<IFormModel> {
    return this.qaHttp.put<IFormModel>({ ref: 'UPDATE_EVALUATION_FORM_URL'}, formModel);
  }
}
