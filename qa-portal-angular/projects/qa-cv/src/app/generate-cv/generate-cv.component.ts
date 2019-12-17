import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CvModel, Feedback } from '../_common/models/cv.model';
import { ENTER } from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { CvService } from '../_common/services/cv.service';
import { finalize } from 'rxjs/operators';
import { IN_PROGRESS_STATUS, FAILED_REVIEW_STATUS, APPROVED_STATUS, FOR_REVIEW_STATUS } from '../_common/models/cv-status.constants';
import { Observable } from 'rxjs';
import { QaErrorHandlerService } from 'projects/portal-core/src/app/_common/services/qa-error-handler.service';
import { CvStateManagerService } from '../_common/services/cv-state-manager.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CvCardBaseComponent } from '../cv-card-base/cv-card-base.component';
import { ADMIN_CV_SEARCH_URL } from '../_common/models/cv.constants';
import { SubmitConfirmDialogComponent } from './submit-confirm-dialog/submit-confirm-dialog.component';
import { CvPersistService } from '../_common/services/cv-persist.service'

@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.scss']
})
export class GenerateCvComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER];

  public isLoading = false;

  public canComment = false;

  public canEdit = true;

  public cvForm: FormGroup;

  public isTraineeView = true;

  public origCv: CvModel;

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



  // Card selected feedback indexes
  private qualificationFeedbackIndex: number;
  private workExperianceFeedbackIndex: number;
  private otherWorkExperianceFeedbackIndex: number;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cvStateManagerService: CvStateManagerService,
    private cvService: CvService,
    private errorHandlerService: QaErrorHandlerService,
    public dialog: MatDialog,
    private cvPersistService: CvPersistService
  ) {
    const fb = new FormBuilder();
    this.cvForm = fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      profile: fb.group({
        profileDetails: ['', [Validators.required, Validators.maxLength(1800)]],
        profileFeedback: [[]]
      }),
      skills: fb.group({
        programmingLanguages: [[]],
        ides: [[]],
        operatingSystems: [[]],
        devops: [[]],
        databases: [[]],
        platforms: [[]],
        other: [[]]
      }),
      hobbies: fb.group({
        hobbiesDetails: ['', [Validators.required, Validators.maxLength(750)]],
        hobbiesFeedback: [[]]
      }),
      id: [[]],
      allQualifications: [[]],
      allWorkExperience: [[]],
      otherWorkExperience: [[]],
      sourceControlLink: [''],

      // Feedback that should't be part of the final CV object
      qualificationFeedbackCard: [[]],
      workExperianceFeedbackCard: [[]],
      otherWorkExperianceFeedbackCard: [[]]
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


  /**
   * Handles the complexity around swapping card data when clicking feedback on a control with multiple items
   */
  onFeedbackButtonClicked({ index, feedback }: { index: number, feedback: Feedback[] }, cardRef: CvCardBaseComponent, formControlName: string): void {
    this.cvForm.patchValue({
      [formControlName]: feedback
    });
    cardRef.drawer.open();
  }

  private setRoleForPage() {
    this.isTraineeView = this.cvStateManagerService.isPageDisplayForTrainee(this.activatedRoute);
  }

  private initialiseCvPageForTrainee() {
    this.cvService.getCurrentCvForTrainee().subscribe(
      (cv: CvModel) => {
        if (this.noExistingCvForTrainee(cv)) {
          //this.initialiseBlankCvForTrainee(); may not need to initialize new cv due to form format.
        } else {
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
  //All Users Buttons
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
  //User Buttons
  onSaveCvButtonClicked() {
    const cvForm = this.getCvData();
    if (!cvForm.id) {
      cvForm.status = IN_PROGRESS_STATUS;
    }
    this.processCvServiceResponse(this.cvPersistService.persistCvForTrainee(cvForm));
  }
  onSubmitCvButtonClicked() {
    const cvForm = this.getCvData();
    this.openDialog(cvForm)
    //This needs to disable any further edits to the CV, wich it curently doesn't
  }
  openDialog(cvForm): void {
    const dialogRef = this.dialog.open(SubmitConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.canSubmit = false;
    dialogRef.componentInstance.doSubmit.subscribe(() => {
      if (dialogRef.componentInstance.canSubmit === true) {
        cvForm.status = FOR_REVIEW_STATUS;
        this.onCvSubmitForReview(cvForm);
      }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
  onCvSubmitForReview(cvForm): void {
    this.cvPersistService.persistCvForTrainee(cvForm);
  }
  onNewCvButtonClicked() {
    const cvForm = this.getCvData();
    cvForm.status = IN_PROGRESS_STATUS;
    this.processCvServiceResponse(this.cvPersistService.createCv(cvForm));
  }
  //Admin Buttons
  onApproveCvButtonClicked() {
    const cvForm = this.getCvData();
    cvForm.status = APPROVED_STATUS;
    this.cvPersistService.updateCv(cvForm);
    this.navigateToAdminSearch();
  }
  onFailCvButtonClicked() {
    const cvForm = this.getCvData();
    cvForm.status = FAILED_REVIEW_STATUS;
    this.cvPersistService.updateCv(cvForm);
    this.navigateToAdminSearch();
  }
  private navigateToAdminSearch() {
    this.router.navigateByUrl(ADMIN_CV_SEARCH_URL);
  }

  // CV PERSIST FUNCTIONS 
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
        this.origCv = response;
        this.cvForm.patchValue({ ...response, skills: _.get(response, ['allSkills', '0'], {}) });
        this.setPageEditStatus();
      },
      (error) => {
        this.errorHandlerService.handleError(error);
      }
    );
  }

  //Checking status for casnEdit boolean
  isDisabled() {
    return !this.canEdit;
  }

  // STATUS UPDATE FUNCTIONS
  private checkEditable() {
    if (!this.canEdit) {

    }
  }

  private refreshPageStatus() {
    this.setPageEditStatus();
    this.setCommentStatus();
    // this.loadingData = false;
  }

  setPageEditStatus(): void {
    // this.canEdit = this.cvStateManagerService.isPageEditable(this.activatedRoute, this.origCv);
  }

  private setCommentStatus() {
    // if (SubmitConfirmDialogComponent) {
    //   this.canComment = this.activatedRoute.snapshot.data.roles[0] === TRAINING_ADMIN_ROLE && this.origCv.status === FOR_REVIEW_STATUS;
    // }
  }

}
