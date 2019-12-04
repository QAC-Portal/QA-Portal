import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CVSearchModel } from '../models/cv-search-model';
import { catchError } from 'rxjs/operators';
import { QaHttpService } from 'projects/portal-core/src/app/_common/services/qa-http.service';

@Injectable()
export class CVSearchHistoryService {

    constructor(private qahttp: QaHttpService) { }

    private searchUrl = 'cv-api/cv/search';  // URL to cv-api

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /* GET cvs whose name contains search term */
    searchCVs(name: string, cohort: string = '', tech: string = '', status: string = ''): Observable<CVSearchModel[]> {
        const params = new URLSearchParams();
        if (name) {
            params.set('name', name);
        }
        if (cohort) {
            params.set('cohort', cohort);
        }
        if (tech) {
            params.set('tech', tech);
        }
        if (status) {
            params.set('status', status);
        }

        return this.qahttp.get<CVSearchModel[]>(`${this.searchUrl}?${params.toString()}`).pipe(
            catchError(this.handleError<CVSearchModel[]>('searchCVs', []))
        );
    }
}
