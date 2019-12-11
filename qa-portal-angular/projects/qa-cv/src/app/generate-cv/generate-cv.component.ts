import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CvModel } from '../_common/models/cv.model';
import { ENTER } from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import { MatChipInputEvent } from '@angular/material';
import { CvService } from '../_common/services/cv.service';
import { finalize } from 'rxjs/operators';
import { ViewCvService } from '../view-cv/services/view-cv.service';
import { IN_PROGRESS_STATUS } from '../view-cv/models/view-cv.constants';
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
  cv: any;

  constructor(private activatedRoute: ActivatedRoute, private viewCvStateManagerService: ViewCvStateManagerService, private VCvService: ViewCvService, private cvService: CvService, private errorHandlerService: QaErrorHandlerService) {

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
      qualifications: [[]],
      workExperience: [[]],
      otherWorkExperience: [[]],
      sourceControlLink: ['']
    });
  }

  ngOnInit() {
    // this.cvForm.patchValue(new CvModel());
    // this.isTraineeView = this.viewCvStateManagerService.isPageDisplayForTrainee(this.activatedRoute);  // Is page being displayed for Trainee or Admin
    // if (this.isTraineeView) {
    this.cvService.getCurrentCvForTrainee().subscribe((cv) => {
      console.log(cv);
      this.cvForm.patchValue({ ...cv, skills: _.get(cv, ['allSkills', '0'], {}) });
      this.refreshPageStatus();
    });
    // } else {
    //   this.initialiseCvPageForAdmin();
    // }
  }

  public removeSkill(category, value): void {
    this.cvForm.patchValue({
      skills: { [category]: this.cvForm.value.skills[category].filter(v => v !== value) }
    });
  }

  public addSkill(category, { value, input }: MatChipInputEvent): void {
    if (value) {
      this.cvForm.patchValue({
        skills: { [category]: [...this.cvForm.value.skills[category], value] }
      });
    }
    input.value = '';
  }

  private getCvData(): CvModel {
    const { skills, qualifications, id, workExperience, ...rest } = this.cvForm.value;
    return _.merge(new CvModel(), {
      allSkills: [skills],
      allQualifications: qualifications,
      allWorkExperience: workExperience,
      fullName: `${rest.firstName} ${rest.surname}`,
      ...rest
    } as CvModel).build();
  }
  // private getCvData2(): CvModel {
  //   const { skills, qualifications, id, workExperience, ...rest } = this.cvForm.value;
  //   return _.merge(new CvModel(), {
  //     allSkills: [skills],
  //     allQualifications: qualifications,
  //     id: id,
  //     allWorkExperience: workExperience,
  //     fullName: `${rest.firstName} ${rest.surname}`,
  //     ...rest
  //   } as CvModel).build();
  // }

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
        this.cvData = response;
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
