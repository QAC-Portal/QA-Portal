import { NgModule } from '@angular/core';
import { QaCommonModule } from '../../../qa-common/src/app/qa-common.module';
import { CvRoutingModule } from './cv-routing.module';
import { ViewCvComponent } from './view-cv/view-cv.component';
import { MatNativeDateModule } from '@angular/material';
import { CVSearchFilterService } from './cv-search/services/cv-search-filter.service';
import { CvSearchComponent } from './cv-search/cv-search.component';
import { CvCardBaseComponent } from './cv-card-base/cv-card-base.component';
import { CVSearchHistoryService } from './cv-search/services/cv-search.service';
import { SubmitConfirmDialogComponent } from './view-cv/submit-confirm-dialog/submit-confirm-dialog.component';
import { ViewCvService } from './view-cv/services/view-cv.service';
import { ViewCvStateManagerService } from './view-cv/services/view-cv-state-manager.service';
import { ViewCvPageDataService } from './view-cv/services/view-cv-page-data.service';
import { GenerateCvComponent } from './generate-cv/generate-cv.component';
import { QualificationsComponent } from './controls/qualifications/qualifications.component';
import { WorkExperienceComponent } from './controls/work-experience/work-experience.component';

@NgModule({
  declarations: [
    ViewCvComponent,
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
    ViewCvStateManagerService,
    ViewCvPageDataService
  ],
  entryComponents: [
    SubmitConfirmDialogComponent
  ]
})
export class QaCvModule { }

