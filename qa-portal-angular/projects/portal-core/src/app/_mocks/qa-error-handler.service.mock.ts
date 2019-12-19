import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class MockQaErrorHandlerService {
    public handleError(error: HttpErrorResponse) {
        console.log(error);
        return throwError(error);
    }
    public showError(error: string): void { }
}
