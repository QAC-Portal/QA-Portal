import { Injectable } from '@angular/core';
import { CvRemoteService } from './cv-remote.service';
import { CvModel } from '../models/cv.model';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as mom from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICvModel } from '../../_common/models/qac-cv-db.model';
import {
  APPLICATION_PDF_CONTENT_TYPE, GENERATE_CV_URL,
  GET_CURRENT_CV_URL,
  GET_CV_FOR_ID_URL,
  GET_SKILLS_FOR_TRAINEE_URL,
  SAVE_CV_DATA_URL
} from '../../_common/models/cv.constants';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private cvRemote: CvRemoteService, private http: HttpClient) { }

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
  // /** POST: add a new cv to the server */
  createCv(cv: CvModel): Observable<CvModel> {
    return this.http.post<CvModel>(SAVE_CV_DATA_URL, cv, this.httpOptions).pipe(
      take(1)
    );
  }
  /** PUT: update the cv on the server */
  updateCv(cv: CvModel): Observable<CvModel> {
    return this.http.put<CvModel>(SAVE_CV_DATA_URL, cv, this.httpOptions).pipe(
      take(1)
    );
  }

  //load trainee's own cv
  getCurrentCvForTrainee(): Observable<CvModel> {
    return this.http.get<CvModel>(GET_CURRENT_CV_URL).pipe(
      take(1)
    );
  }

    /** GET cv by id. Will 404 if id not found (for admin) */
    getCvForId(id: string): Observable<CvModel> {
      return this.http.get<CvModel>(GET_CV_FOR_ID_URL + id).pipe(
        take(1)
      );
    }
}
