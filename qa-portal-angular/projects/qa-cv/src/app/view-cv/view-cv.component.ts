import { Component, OnInit, Output } from '@angular/core';
import { DEFAULT_CV, ICvModel } from '../_common/models/qac-cv-db.model';
import { ViewCvService } from './services/view-cv.service';
import { CvCardBaseComponent } from '../cv-card-base/cv-card-base.component';
import { IFeedback } from '../_common/models/feedback.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MAT_DATE_LOCALE, MatDialog, MatChipInputEvent } from '@angular/material';
import { SubmitConfirmDialogComponent } from './submit-confirm-dialog/submit-confirm-dialog.component';
import { QaErrorHandlerService } from '../../../../portal-core/src/app/_common/services/qa-error-handler.service';
import { UserSkillsModel } from '../_common/models/user-skills.model';
import { TRAINING_ADMIN_ROLE } from '../../../../portal-core/src/app/_common/models/portal-constants';
import { ADMIN_CV_SEARCH_URL } from '../_common/models/cv.constants';
import {
  ViewCvStateManagerService
} from './services/view-cv-state-manager.service';
import { ViewCvPageDataService } from './services/view-cv-page-data.service';
import { Observable } from 'rxjs';
import { APPROVED_STATUS, FAILED_REVIEW_STATUS, FOR_REVIEW_STATUS, IN_PROGRESS_STATUS } from './models/view-cv.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-cv',
  templateUrl: './view-cv.component.html',
  styleUrls: ['./view-cv.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ViewCvComponent implements OnInit {

  // Component state
  useExistingCvAsTemplate = true;
  isTraineeView = true;
  loadingData = true;
  @Output() public canComment = false;
  @Output() public canEdit = true;

  // CV data
  public cvData: ICvModel;
  public cvForm: FormGroup;

  // Feedback data
  qualificationFeedbackIndex: number;
  workExperienceFeedbackIndex: number;
  otherWorkExperienceFeedbackIndex: number;
  public qualificationFeedback = [];
  public workExperienceFeedback = [];
  public otherWorkExperienceFeedback = [];

  // Misc.
  readonly separatorKeysCodes: number[] = [ENTER];
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


  constructor(
    private cvService: ViewCvService,
    private viewCvStateManagerService: ViewCvStateManagerService,
    private viewCvPageDataService: ViewCvPageDataService,
    private errorHandlerService: QaErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
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
      allQualifications: [[]],
      allWorkExperience: [[]],
      otherWorkExperience: [[]],
      sourceControlLink: ['']
    });
  }

  ngOnInit() {
    this.setRoleForPage();   // Is page being displayed for Trainee or Admin
    if (this.isTraineeView) {
      this.initialiseCvPageForTrainee();
    } else {
      this.initialiseCvPageForAdmin();
    }

    this.cvForm.valueChanges.subscribe(v => {
      this.cvData = _.merge(
        this.cvData,
        {
          ...v,
          allSkills: [v.skills]
        }
      );
      console.log(this.cvData);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.componentInstance.canSubmit = false;
    dialogRef.componentInstance.doSubmit.subscribe(() => {
      if (dialogRef.componentInstance.canSubmit === true) {
        this.onCvSubmitForReview();
      }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  onDisplayPdf() {
    this.cvService.displayPdf(this.cvData);
  }

  onInitialiseNewCv() {
    this.cvData = this.viewCvPageDataService.initialiseNewCv(this.cvData, this.useExistingCvAsTemplate);
    this.initialiseBlankCvForTrainee();
    this.refreshPageStatus();
  }

  onCvSave(): void {
    if (!this.cvData.id) {
      this.cvData.status = IN_PROGRESS_STATUS;
    }
    this.persistCvForTrainee();
  }

  onCvSubmitForReview(): void {
    this.cvData.status = FOR_REVIEW_STATUS;
    this.persistCvForTrainee();
  }

  onCvApproved(): void {
    this.cvUpdatedByAdmin(APPROVED_STATUS);
  }

  onCvFailedReview(): void {
    this.cvUpdatedByAdmin(FAILED_REVIEW_STATUS);
  }


  // Feedback drawer handlers
  onWorkExperienceFeedbackClick({ index }: { index: number }, expCard: CvCardBaseComponent): void {
    this.workExperienceFeedbackIndex = index;
    this.workExperienceFeedback = this.cvData.allWorkExperience[index].workExperienceFeedback;
    expCard.drawer.open();
  }

  onOtherWorkExperienceFeedbackClick({ index }: { index: number }, expCard: CvCardBaseComponent): void {
    this.workExperienceFeedbackIndex = index;
    this.otherWorkExperienceFeedback = this.cvData.otherWorkExperience[index].workExperienceFeedback;
    expCard.drawer.open();
  }

  onWorkExperienceFeedbackChange(feedback: IFeedback[]): void {
    this.cvData.allWorkExperience[this.workExperienceFeedbackIndex].workExperienceFeedback = feedback;
  }

  onOtherWorkExperienceFeedbackChange(feedback: IFeedback[]): void {
    this.cvData.otherWorkExperience[this.otherWorkExperienceFeedbackIndex].workExperienceFeedback = feedback;
  }

  onQualificationFeedbackClick({ index }: { index: number }, qualCard: CvCardBaseComponent): void {
    this.qualificationFeedbackIndex = index;
    this.qualificationFeedback = this.cvData.allQualifications[index].qualificationFeedback;
    qualCard.drawer.open();
  }

  onQualificationFeedbackChange(feedback: IFeedback[]): void {
    this.cvData.allQualifications[this.qualificationFeedbackIndex].qualificationFeedback = feedback;
  }

  onUseExistingCvAsTemplateChanged() {
    this.useExistingCvAsTemplate = !this.useExistingCvAsTemplate;
  }

  private initialiseCvPageForTrainee() {
    this.cvService.getCurrentCvForTrainee().subscribe(
      (cv) => {
        this.cvData = { ...DEFAULT_CV, ...cv };    // use spread operator to merge blank default Cv with returned CV
        this.cvForm.patchValue({ ...this.cvData, skills: this.cvData.allSkills[0] });
        if (this.noExistingCvForTrainee(cv)) {
          this.initialiseBlankCvForTrainee();
        } else {
          this.refreshPageStatus();
        }
      },
      (error) => {
        this.processError(error);
      });
  }

  private noExistingCvForTrainee(traineeCv: ICvModel): boolean {
    return !traineeCv;
  }

  private initialiseBlankCvForTrainee() {
    this.cvService.getSkillsForTrainee().subscribe((userSkillsModel: UserSkillsModel) => {
      this.viewCvPageDataService.populateCvUserDetails(this.cvData, userSkillsModel);
      this.viewCvPageDataService.populateCvSkills(this.cvData, userSkillsModel);
      this.refreshPageStatus();
    });
  }

  private initialiseCvPageForAdmin() {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.cvService.getCvForId(paramMap.get('id')).subscribe(
          (response) => {
            this.cvData = response;
            this.cvForm.patchValue({ ...this.cvData, skills: this.cvData.allSkills[0] });
            this.refreshPageStatus();
          },
          (error) => {
            this.processError(error);
          });
      });
  }

  private persistCvForTrainee() {
    if (!this.cvData.id) {
      this.createCv();
    } else {
      this.updateCv();
    }
  }

  private createCv(): void {
    this.processCvServiceResponse(this.cvService.createCv(this.cvData));
  }

  private updateCv(): void {
    this.processCvServiceResponse(this.cvService.updateCv(this.cvData));
  }

  private processCvServiceResponse(obs: Observable<ICvModel>) {
    obs.subscribe(
      (response) => {
        this.populateResponse(response);
      },
      (error) => {
        this.processError(error);
      }
    );
  }

  private cvUpdatedByAdmin(cvStatus: string) {
    this.cvData.status = cvStatus;
    this.updateCv();
    this.navigateToAdminSearch();
  }

  private setRoleForPage() {
    this.isTraineeView = this.viewCvStateManagerService.isPageDisplayForTrainee(this.activatedRoute);
  }

  private populateResponse(response: ICvModel): void {
    this.cvData = response;
    this.setPageEditStatus();
  }

  private navigateToAdminSearch() {
    this.router.navigateByUrl(ADMIN_CV_SEARCH_URL);
  }

  private allDetailsEntered(): boolean {
    return this.viewCvStateManagerService.isMandatoryCvDetailsEntered(this.cvData);
  }

  private processError(error: any) {
    this.loadingData = false;
    this.errorHandlerService.handleError(error);
  }

  private refreshPageStatus() {
    this.setPageEditStatus();
    this.setCommentStatus();
    this.loadingData = false;
  }

  private setPageEditStatus(): void {
    this.canEdit = this.viewCvStateManagerService.isPageEditable(this.activatedRoute, this.cvData);
    if(this.canEdit) {
      this.cvForm.enable();
    } else {
      this.cvForm.disable();
    }
  }

  private setCommentStatus() {
    if (SubmitConfirmDialogComponent) {
      this.canComment = this.activatedRoute.snapshot.data.roles[0] === TRAINING_ADMIN_ROLE && this.cvData.status === FOR_REVIEW_STATUS;
    }
  }




  public removeSkill(category, value): void {
    this.cvForm.patchValue({
      skills: { [category]: this.cvForm.value.skills[category].filter(v => v !== value) }
    });
  }

  public addSkill(category, { value, input }: MatChipInputEvent): void {
    if (value) {
      this.cvForm.patchValue({
        skills: { [category]: [...this.cvForm.value.skills[category] || [], value] }
      });
    }
    input.value = '';
  }


}
