import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CvModel } from '../_common/models/cv.model';
import { ENTER } from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import { MatChipInputEvent } from '@angular/material';
import { CvService } from '../_common/services/cv.service';
import { finalize } from 'rxjs/operators';
import { ViewCvService } from '../view-cv/services/view-cv.service';
import { IN_PROGRESS_STATUS, FAILED_REVIEW_STATUS, APPROVED_STATUS, FOR_REVIEW_STATUS } from '../view-cv/models/view-cv.constants';
import { Observable } from 'rxjs';
import { QaErrorHandlerService } from 'projects/portal-core/src/app/_common/services/qa-error-handler.service';
import { ViewCvStateManagerService } from '../view-cv/services/view-cv-state-manager.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.scss']
})
export class GenerateCvComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER];

  public isLoading = false;

  public skillCategories = [
    {
      label: 'Programming Languages',
      key: 'programmingLanguages'
    },
    {
      label: 'IDEs',
      key: 'ides'
    },
    {
      label: 'Operating Systems',
      key: 'operatingSystems'
    },
    {
      label: 'Devops',
      key: 'devops'
    },
    {
      label: 'Databases',
      key: 'databases'
    },
    {
      label: 'Cloud Platforms',
      key: 'platforms'
    },
    {
      label: 'Other',
      key: 'other'
    },
  ];

  public cvForm: FormGroup;
  cvData: CvModel;
  isTraineeView = true;
  cv: CvModel;
  origCv: CvModel;
  constructor(private activatedRoute: ActivatedRoute, private viewCvStateManagerService: ViewCvStateManagerService, private cvService: CvService, private errorHandlerService: QaErrorHandlerService) {

    const fb = new FormBuilder();

    this.cvForm = fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      profile: fb.group({ profileDetails: ['', [Validators.required, Validators.maxLength(1800)]] }),
      skills: fb.group({
        programmingLanguages: [[]],
        ides: [[]],
        operatingSystems: [[]],
        devops: [[]],
        databases: [[]],
        platforms: [[]],
        other: [[]]
      }),
      hobbies: fb.group({ hobbiesDetails: ['', [Validators.required, Validators.maxLength(750)]] }),
      id: [[]],
      allQualifications: [[]],
      allWorkExperience: [[]],
      otherWorkExperience: [[]],
      sourceControlLink: ['']
    });
  }

  ngOnInit() {
    this.setRoleForPage();   // Is page being displayed for Trainee or Admin
    // this.cvForm.patchValue(new CvModel());
    // this.isTraineeView = this.viewCvStateManagerService.isPageDisplayForTrainee(this.activatedRoute);  // Is page being displayed for Trainee or Admin

    if (this.isTraineeView) {
      this.initialiseCvPageForTrainee();
    } else {
      this.initialiseCvPageForAdmin();
    };

  }

  private setRoleForPage() {
    this.isTraineeView = this.viewCvStateManagerService.isPageDisplayForTrainee(this.activatedRoute);
  }

  private initialiseCvPageForTrainee() {
    this.cvService.getCurrentCvForTrainee().subscribe(
      (cv) => {
        if (this.noExistingCvForTrainee(cv)) {
          //this.initialiseBlankCvForTrainee(); may not need to initialize new cv due to form format.
        } else {
          console.log(cv);
          this.origCv = cv;
          this.cvForm.patchValue({ ...cv, skills: _.get(cv, ['allSkills', '0'], {}) });
          this.refreshPageStatus();
        }
      },
      (error) => {
        this.processError(error);
      });
  }

  private initialiseCvPageForAdmin() {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.cvService.getCvForId(paramMap.get('id')).subscribe(
          (cv) => {
            if (this.noExistingCvForTrainee(cv)) {
              //this.initialiseBlankCvForTrainee(); may not need to initialize new cv due to form format.
            } else {
              console.log(cv);
              this.origCv = cv;
              this.cvForm.patchValue({ ...cv, skills: _.get(cv, ['allSkills', '0'], {}) });
              this.refreshPageStatus();
            }
          },
          (error) => {
            this.processError(error);
          });
      });
  }

  private noExistingCvForTrainee(traineeCv: CvModel): boolean {
    return !traineeCv;
  }

  private processError(error: any) {
    //this.loadingData = false;
    this.errorHandlerService.handleError(error);
  }

  public addSkill(category, { value, input }: MatChipInputEvent): void {
    if (value) {
      this.cvForm.patchValue({
        skills: { [category]: [...this.cvForm.value.skills[category], value] }
      });
    }
    input.value = '';
  }

  public removeSkill(category, value): void {
    this.cvForm.patchValue({
      skills: { [category]: this.cvForm.value.skills[category].filter(v => v !== value) }
    });
  }

  // for generating, saving, downloading
  private getCvData(): CvModel {
    const { skills, id, ...rest } = this.cvForm.value;
    return _.merge(new CvModel(), {
      ...this.origCv,
      allSkills: [skills],
      fullName: `${rest.firstName} ${rest.surname}`,
      ...rest
    } as CvModel).build();
  }
//Button Functions
  onGenerateCvButtonClicked() {
    this.cvForm.disable();
    this.isLoading = true;
    this.cvService.displayCvPdf(this.getCvData()).pipe(
      finalize(() => {
        this.cvForm.enable();
        this.isLoading = false;
      })
    ).subscribe(() => { });
  }

  onDownloadCvButtonClicked() {
    this.cvForm.disable();
    this.isLoading = true;
    this.cvService.downloadCvPdf(this.getCvData()).pipe(
      finalize(() => {
        this.cvForm.enable();
        this.isLoading = false;
      })
    ).subscribe(() => { });
  }

  onSaveCvButtonClicked() {
    const cv = this.getCvData();
    if (!cv.id) {
      cv.status = IN_PROGRESS_STATUS;
    }
    this.persistCvForTrainee(cv);
  }
  onSubmitCvButtonClicked() {
    const cv = this.getCvData();
    cv.status = FOR_REVIEW_STATUS;
    this.persistCvForTrainee(cv);
    //This needs to disable any further edits to the CV
  }
  onNewCvButtonClicked() {
    // This needs to not delete the old CV, but equally 
    // const cv = this.getCvData();
    // cv.status = IN_PROGRESS_STATUS;
    // this.createCv(cv);
  }
  onApproveCvButtonClicked() {
    const cv = this.getCvData();
    cv.status = APPROVED_STATUS;
    this.updateCv(cv);
    // This needs to be an admin only button
  }
  onFailCvButtonClicked() {
    const cv = this.getCvData();
    cv.status = FAILED_REVIEW_STATUS;
    this.updateCv(cv);
    // This needs to be an admin only button
  }

  // CV PERSIST FUNCTIONS
  private persistCvForTrainee(cv: CvModel) {
    if (!cv.id) {
      this.createCv(cv);
    } else {
      this.updateCv(cv);
    }
  }

  private createCv(cv: CvModel): void {
    this.processCvServiceResponse(this.cvService.createCv(cv));
  }

  private updateCv(cv: CvModel): void {
    this.processCvServiceResponse(this.cvService.updateCv(cv));
  }

  private processCvServiceResponse(obs: Observable<CvModel>) {
    this.cvForm.disable();
    this.isLoading = true;
    obs.pipe(
      finalize(() => {
        this.cvForm.enable();
        this.isLoading = false;
      })
    ).subscribe(
      (response) => {
        this.cv = response;
        this.cvForm.patchValue({ ...response, skills: _.get(response, ['allSkills', '0'], {}) });
        this.setPageEditStatus();
      },
      (error) => {
        this.errorHandlerService.handleError(error);
      }
    );
  }



  // STATUS UPDATE FUNCTIONS

  private refreshPageStatus() {
    // this.setPageEditStatus();
    // this.setCommentStatus();
    // this.loadingData = false;
  }

  private setPageEditStatus(): void {
    // this.canEdit = this.viewCvStateManagerService.isPageEditable(this.activatedRoute, this.cvData);
  }

  private setCommentStatus() {
    // if (SubmitConfirmDialogComponent) {
    //   this.canComment = this.activatedRoute.snapshot.data.roles[0] === TRAINING_ADMIN_ROLE && this.cvData.status === FOR_REVIEW_STATUS;
    // }
  }

}
