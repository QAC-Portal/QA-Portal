import {Injectable} from '@angular/core';
import {TRAINEE_ROLE, TRAINING_ADMIN_ROLE} from '../../../../../portal-core/src/app/_common/models/portal-constants';
import {ActivatedRoute} from '@angular/router';
import {CvModel, WorkExperienceModel, QualificationModel} from '../models/cv.model';

import {ADMIN_USER_EDIT_STATES, TRAINING_USER_EDIT_STATES} from '../models/cv-status.constants';


@Injectable()
export class CvStateManagerService {

  constructor() {
  }

  public isPageEditable(activatedRoute: ActivatedRoute, cvData: CvModel): boolean {
    let isEditable = false;
    // if (activatedRoute.snapshot.data.roles[0] === TRAINING_ADMIN_ROLE) {
    //   if (ADMIN_USER_EDIT_STATES.includes(cvData.status)) {
    //     isEditable = true;
    //   }
    // }


    if (activatedRoute.snapshot.data.roles[0] === TRAINEE_ROLE) {
      if (TRAINING_USER_EDIT_STATES.includes(cvData.status)) {
        isEditable = true;
      }
    }
    return isEditable;
  }

  public isPageDisplayForTrainee(activatedRoute: ActivatedRoute) {
    if (activatedRoute.snapshot.data.roles[0] === TRAINING_ADMIN_ROLE) {
      return false;
    }
    return true;
  }

  public isMandatoryCvDetailsEntered(cvData: CvModel): boolean {
    return !!this.allQualificationsCompleted(cvData.allQualifications) &&
      !!this.allWorkExperienceCompleted(cvData.allWorkExperience) &&
      !!cvData.hobbies && !!cvData.hobbies.hobbiesDetails &&
      !!cvData.profile && !!cvData.profile.profileDetails;
  }

  private allQualificationsCompleted(qualifications: QualificationModel[]): boolean {
    return !!qualifications &&
      qualifications.length > 0 &&
      !qualifications.find(q => !this.qualificationCompleted(q));
  }

  private qualificationCompleted(qualifiation: QualificationModel): boolean {
    return !!qualifiation &&
      !!qualifiation.qualificationDetails;
  }

  private allWorkExperienceCompleted(workExperiences: WorkExperienceModel[]): boolean {
    return !!workExperiences &&
      workExperiences.length > 0 &&
      !workExperiences.find(w => !this.workExperienceCompleted(w));
  }

  private workExperienceCompleted(workExperience: WorkExperienceModel): boolean {
    return !!workExperience &&
      !!workExperience.jobTitle &&
      !!workExperience.workExperienceDetails;
  }
}
