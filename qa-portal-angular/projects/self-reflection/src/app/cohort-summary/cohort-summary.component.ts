import { Component, OnDestroy, OnInit, Input, Optional } from '@angular/core';
import { SummaryService } from './services/summary.service';
import { Observable, Subscription } from 'rxjs';
import { CohortSummaryModel } from '../_common/models/cohort-summary.model';
import { QaErrorHandlerService } from '../../../../portal-core/src/app/_common/services/qa-error-handler.service';

import * as lodash from 'lodash';

@Component({
  selector: 'app-cohort-summary',
  templateUrl: './cohort-summary.component.html',
  styleUrls: ['./cohort-summary.component.css']
})
export class CohortSummaryComponent implements OnInit, OnDestroy {

  loadingData = true;

  summarySubscription: Subscription;

  cohortSummary$: Observable<CohortSummaryModel[]>;
  cohortsForGraph: CohortSummaryModel[];

  uniqueTrainingPathways = [];
  uniqueTrainingPathwayVersions = [];

  constructor(private summaryService: SummaryService,
    private errorHandler: QaErrorHandlerService) {
  }

  @Input() value: string | string[];

  ngOnInit() {
    this.cohortSummary$ = this.summaryService.getSummary();
    this.summarySubscription = this.cohortSummary$.subscribe((summaries) => {
      this.loadingData = false;

      this.uniqueTrainingPathways = lodash.uniq(summaries.map(s => s.pathway));
    },
      (error) => {
        this.loadingData = false;
        this.errorHandler.handleError(error);
      });
  }

  updatePathwayVersions() {
    this.cohortSummary$ = this.summaryService.getSummary();
    this.summarySubscription = this.cohortSummary$.subscribe((summaries) => {
      if (!this.value) {
        this.uniqueTrainingPathwayVersions = lodash.uniq(summaries.map(s => s.pathwayVersion));
      } else {
        this.uniqueTrainingPathwayVersions = lodash.uniq(summaries.filter(s => s.pathway === this.value)
          .map(s => s.pathwayVersion));
      }
    });
  }

  ngOnDestroy() {
    this.summarySubscription.unsubscribe();
  }

  cohortsToShow(desiredCohorts) {
    this.cohortsForGraph = desiredCohorts;
    //feed in to input and reload component.
  }

}
