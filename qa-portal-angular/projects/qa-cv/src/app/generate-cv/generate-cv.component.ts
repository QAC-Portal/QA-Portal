import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CvModel } from '../_common/models/cv.model';
import { ENTER } from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import { MatChipInputEvent } from '@angular/material';
import { CvService } from '../_common/services/cv.service';
import { finalize } from 'rxjs/operators';

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

  constructor(private cvService: CvService) {

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
      qualifications: [[]],
      workExperience: [[]],
      otherWorkExperience: [[]],
      sourceControlLink: ['']
    });
  }

  ngOnInit() {
    this.cvForm.patchValue(new CvModel());
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


  onGenerateCvButtonClicked() {
    const { skills, qualifications, workExperience, ...rest } = this.cvForm.value;

    this.cvForm.disable();
    this.isLoading = true;
    this.cvService.displayCvPdf(
      _.merge(new CvModel(), {
        allSkills: [skills],
        allQualifications: qualifications,
        allWorkExperience: workExperience,
        fullName: `${rest.firstName} ${rest.surname}`,
        ...rest
      } as CvModel)).pipe(
        finalize(() => {
          this.cvForm.enable();
          this.isLoading = false;
        })
      ).subscribe(() => { });
  }


  onDownloadCvButtonClicked() {
    const { skills, qualifications, workExperience, ...rest } = this.cvForm.value;

    this.cvForm.disable();
    this.isLoading = true;
    this.cvService.downloadCvPdf(
      (_.merge(new CvModel(), {
        allSkills: [skills],
        allQualifications: qualifications,
        allWorkExperience: workExperience,
        fullName: `${rest.firstName} ${rest.surname}`,
        ...rest
      }) as CvModel).build()).pipe(
        finalize(() => {
          this.cvForm.enable();
          this.isLoading = false;
        })
      ).subscribe(() => { });
  }
  onSaveCvButtonClicked(){
    return 0;
  }
}
