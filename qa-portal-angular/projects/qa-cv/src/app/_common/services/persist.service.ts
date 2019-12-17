import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CvStateManagerService } from './cv-state-manager.service';
import { CvService } from './cv.service';
import { QaErrorHandlerService } from 'projects/portal-core/src/app/_common/services/qa-error-handler.service';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PersistService {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private cvStateManagerService: CvStateManagerService,
    private cvService: CvService,
    private errorHandlerService: QaErrorHandlerService,
    public dialog: MatDialog) { }

  // private persistCvForTrainee(cvForm: CvModel) {
  //   if (!cvForm.id) {
  //     this.createCv(cvForm);
  //   } else {
  //     this.updateCv(cvForm);
  //   }
  // }

  // private createCv(cvForm: CvModel): void {
  //   this.processCvServiceResponse(this.cvService.createCv(cvForm));
  // }

  // private updateCv(cvForm: CvModel): void {
  //   this.processCvServiceResponse(this.cvService.updateCv(cvForm));
  // }

  // private processCvServiceResponse(obs: Observable<CvModel>) {
  //   this.cvForm.disable();
  //   this.isLoading = true;
  //   obs.pipe(
  //     finalize(() => {
  //       this.cvForm.enable();
  //       this.isLoading = false;
  //     })
  //   ).subscribe(
  //     (response) => {
  //       this.origCv = response;
  //       this.cvForm.patchValue({ ...response, skills: _.get(response, ['allSkills', '0'], {}) });
  //       this.setPageEditStatus();
  //     },
  //     (error) => {
  //       this.errorHandlerService.handleError(error);
  //     }
  //   );
  // }

}
