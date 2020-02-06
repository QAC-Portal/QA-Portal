import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CvModel } from '../models/cv.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvRemoteService {

  constructor(private httpClient: HttpClient) { }

  public getCvPdf(cv: CvModel): Observable<Blob> {
    return this.httpClient.post(
      '/cv-api/cv/generated',
      cv,
      {
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'application/json' }
      }
    ).pipe(
      map(response => new Blob([response], { type: 'application/pdf' }))
    );
  }
}
