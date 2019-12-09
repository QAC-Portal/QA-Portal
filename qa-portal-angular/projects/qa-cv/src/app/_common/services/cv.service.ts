import { Injectable } from '@angular/core';
import { CvRemoteService } from './cv-remote.service';
import { CvModel } from '../models/cv.model';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as mom from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private cvRemote: CvRemoteService) { }

  public displayCvPdf(cv: CvModel): Observable<boolean> {
    return this.cvRemote.getCvPdf(cv).pipe(switchMap(pdf => {
      const fileURL = URL.createObjectURL(pdf);
      window.open(fileURL, '_blank');
      return of(true);
    }));
  }

  public downloadCvPdf(cv: CvModel): Observable<boolean> {
    return this.cvRemote.getCvPdf(cv).pipe(switchMap(pdf => {

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      /* istanbul ignore next */
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(pdf);
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(pdf);
      const link = document.createElement('a');
      link.href = data;
      link.download = `QA_${cv.firstName}_${cv.surname}_CV.pdf`;
      link.click();
      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
      return of(true);
    }));
  }
}
