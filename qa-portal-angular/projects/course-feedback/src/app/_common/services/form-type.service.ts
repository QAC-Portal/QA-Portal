import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QaHttpService } from 'projects/portal-core/src/app/_common/services/qa-http.service';
import {GET_FORM_TYPE, SEND_EVAL_RESPONSE} from '../models/course-feedback.constants';
import { IFormModel } from 'projects/qa-forms/src/app/_common/models';
import {FORM_TYPE_PLACEHOLDER} from '../../../../../portal-core/src/app/_common/models/portal-constants';

@Injectable()
export class FormTypeService {

  constructor(private qaHttp: QaHttpService) { }

  getFormType(formName: string): Observable<any> {
    return this.qaHttp.get<any>(GET_FORM_TYPE.replace(FORM_TYPE_PLACEHOLDER, formName));
  }

  /**
   *This method is used to send the user's end of course feedback response back to the data, currently this method acts as both the save and submit function,
   * though the sent body does not feature a completed property.
   * Also current SEND_EVAL_RESPONSE is set to " "
   *
   * @param {IFormModel} form
   * @memberof FormTypeService
   */
  sendEvalForm(form: IFormModel): Observable<IFormModel> {
    return this.qaHttp.post<IFormModel>({ref : 'SEND_EVAL_RESPONSE' }, form);
  }
}
