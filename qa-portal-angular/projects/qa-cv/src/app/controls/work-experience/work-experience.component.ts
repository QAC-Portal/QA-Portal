import { Component, OnInit, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS } from '@angular/forms';
import { WorkExperienceModel, Feedback } from '../../_common/models/cv.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { IWorkExperience } from '../../_common/models/work-experience.model';


@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkExperienceComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: WorkExperienceComponent,
    multi: true
  }
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class WorkExperienceComponent implements ControlValueAccessor {
  public workExperienceTableDataSource = new MatTableDataSource<WorkExperienceModel>();
  public columns = [];
  public expandedElement: WorkExperienceModel;

  // ControlValueAccessor methods
  public isDisabled = false;
  public onChange = (v: WorkExperienceModel[]) => {};
  public onTouch = () => {};

  @Output() feedbackClick = new EventEmitter<{ index: number, qualifications: QualificationModel, feedback: Feedback[] }>();

  constructor() {
    this.columns = ['title', 'remove', 'showFeedback'];
  }

  onNewWorkExperienceClick(): void {
    const newExperience = {
      jobTitle: '', 
      workExperienceDetails: '',
      workExperienceFeedback: []
    };
    this.workExperienceTableDataSource.data = [
      ...this.workExperienceTableDataSource.data, newExperience];
    this.expandedElement = newExperience;
    this.announceChange();
  }

  public onRemoveWorkExperienceClicked(index: number): void {
    this.workExperienceTableDataSource.data.splice(index, 1); // setters don't get called by higher order functions so do it directly
    this.workExperienceTableDataSource._updateChangeSubscription(); // force the table to update (it doesn't auto detect splices)
    this.announceChange();
  }


  public announceChange() {
    this.onChange(this.workExperienceTableDataSource.data);
    this.onTouch();
  }

  onFeedbackButtonClicked(index: number, workExperiance: IWorkExperience): void {
    this.feedbackClick.emit({ index, workExperiance, feedback: workExperiance.workExperienceFeedback });
  }

  // Built-in validation
  validate({ value }: { value: WorkExperienceModel[] }): null | any {
    if (Array.isArray(value)) {
      return value.every(e => !!(
        e &&
        e.workExperienceDetails &&
        e.jobTitle
      )) ? null : { workExperienceIncomplete: 'All work experiences must be completed.' };
    } else {
      return null;
    }
  }

  // ControlValueAccessor methods
  writeValue(obj: any): void {
    this.workExperienceTableDataSource.data = obj || [];
  }

  registerOnChange(fn: (v: WorkExperienceModel[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
