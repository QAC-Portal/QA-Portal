import { NgModule } from '@angular/core';
import { QaCommonModule } from '../../../qa-common/src/app/qa-common.module';
import { CvRoutingModule } from './cv-routing.module';
import { MatNativeDateModule } from '@angular/material';
import { CVSearchFilterService } from './cv-search/services/cv-search-filter.service';
import { CvSearchComponent } from './cv-search/cv-search.component';
import { CvCardBaseComponent } from './cv-card-base/cv-card-base.component';
import { CVSearchHistoryService } from './cv-search/services/cv-search.service';
import { SubmitConfirmDialogComponent } from './submit-confirm-dialog/submit-confirm-dialog.component';
import { ViewCvService } from './view-cv/services/view-cv.service';
import { CvStateManagerService } from './_common/services/cv-state-manager.service';
import { ViewCvPageDataService } from './view-cv/services/view-cv-page-data.service';
import { GenerateCvComponent } from './generate-cv/generate-cv.component';
import { QualificationsComponent } from './controls/qualifications/qualifications.component';
import { WorkExperienceComponent } from './controls/work-experience/work-experience.component';

@NgModule({
  declarations: [
    CvSearchComponent,
    CvCardBaseComponent,
    SubmitConfirmDialogComponent,
    CvCardBaseComponent,
    GenerateCvComponent,
    QualificationsComponent,
    WorkExperienceComponent,
  ],
  imports: [
    QaCommonModule,
    CvRoutingModule,
    MatNativeDateModule
  ],
  providers: [
    CVSearchHistoryService,
    CVSearchFilterService,
    ViewCvService,
    CvStateManagerService,
    ViewCvPageDataService
  ],
  entryComponents: [
    SubmitConfirmDialogComponent
  ]
})
export class QaCvModule { }

