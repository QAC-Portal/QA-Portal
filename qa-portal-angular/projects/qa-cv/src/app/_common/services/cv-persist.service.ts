import { Injectable } from '@angular/core';
import { CvService } from './cv.service';
import { QaErrorHandlerService } from 'projects/portal-core/src/app/_common/services/qa-error-handler.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, } from '@angular/forms';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { CvModel } from '../models/cv.model';
import { GenerateCvComponent } from '../../generate-cv/generate-cv.component'

@Injectable({
  providedIn: 'root'
})
export class CvPersistService {

  constructor(
    private cvService: CvService,
    private errorHandlerService: QaErrorHandlerService,
    public dialog: MatDialog,
    ){ }

  persistCvForTrainee(cvForm: CvModel) {
    if (!cvForm.id) {
      return this.createCv(cvForm);
    } else {
      return this.updateCv(cvForm);
    }
  }

  createCv(cvForm: CvModel)  {
    return this.cvService.createCv(cvForm);
  }

  updateCv(cvForm: CvModel) {
    return this.cvService.updateCv(cvForm);
  }

}
