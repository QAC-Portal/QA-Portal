import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QaCohortModel } from './models/qa-cohort.model';
import { TraineeModel } from './models/trainee.model';
import { Subscription, Observable } from 'rxjs';
import { CohortTraineesService } from './services/cohort-trainees.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { QaErrorHandlerService } from '../../../../portal-core/src/app/_common/services/qa-error-handler.service';
import { TrainerReflectionService } from '../trainer-reflection/services/trainer-reflection.service';
import { ReflectionModel } from '../trainer-reflection/models/dto/reflection.model';

@Component({
  selector: 'app-cohort-trainees',
  templateUrl: './cohort-trainees.component.html',
  styleUrls: ['./cohort-trainees.component.css']
})
export class CohortTraineesComponent implements OnInit, OnDestroy {
  loadingCohorts = true;
  loadingTrainees = false;
  loadingReflections = false;
  cohorts: QaCohortModel[];
  trainees: TraineeModel[];
  reflections: ReflectionModel[];
  cohortColumns: string[] = ['name', 'startDate'];
  traineeColumns: string[] = ['userName', 'firstName', 'lastName'];
  reflectionColumns: string[] = ['userName', 'formDate'];
  subscriptionCohorts: Subscription;
  subscriptionTrainees: Subscription;
  subscriptionsReflections: Subscription;
  cohortSelected = false;
  traineeSelected = false;
  dataSource = new MatTableDataSource<QaCohortModel>(this.cohorts);
  dataSourceTrainees = new MatTableDataSource<TraineeModel>(this.trainees);
  dataSourceTraineeReflections = new MatTableDataSource<ReflectionModel>(this.reflections);

  constructor(private http: HttpClient,
    private errorHandler: QaErrorHandlerService,
    private cohortTraineesService: CohortTraineesService,
    private trainerReflectionService: TrainerReflectionService) {
  }

  ngOnInit() {
    this.subscriptionCohorts = this.cohortTraineesService.getCohorts()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<QaCohortModel>(data);
        this.dataSourceTrainees = new MatTableDataSource<TraineeModel>([]);
        this.dataSourceTraineeReflections = new MatTableDataSource<ReflectionModel>([]);
        this.loadingCohorts = false;
      },
        (error) => {
          this.loadingCohorts = false;
          this.errorHandler.handleError(error);
        }
      );
  }

  updateTraineesTable(row) {
    this.cohortSelected = row.name;
    console.log(row);
    this.loadingTrainees = true;
    this.subscriptionTrainees = this.cohortTraineesService.getTrainees(row.id).subscribe(
      (data) => {
        console.log(data);
        this.dataSourceTrainees = new MatTableDataSource<TraineeModel>(data);
        this.subscriptionTrainees.unsubscribe();
        this.loadingTrainees = false;
      },
      (error) => {
        this.loadingTrainees = false;
        this.errorHandler.handleError(error);
      }
    );
  }

  updateReflectionFormTable(row) {
    this.traineeSelected = row.userName;
    this.loadingReflections = true;
    this.subscriptionsReflections =  this.trainerReflectionService.getSelfReflectionsForTraineeDescendingDate(row.id).subscribe(
      (data) => {
        console.log('');
        console.log(data);
        this.dataSourceTraineeReflections = new MatTableDataSource<ReflectionModel>(data);
        this.subscriptionsReflections.unsubscribe();
        this.loadingReflections = false;
      },
      (error) => {
        this.loadingReflections = false;
        this.errorHandler.handleError(error);
      }
    );
  }

  reviewReflectionForm(formId: string) {
    return '/qa/portal/training/self-reflection/trainer/trainee/' + formId;
  }

  ngOnDestroy(): void {
    this.subscriptionCohorts.unsubscribe();
  }
}