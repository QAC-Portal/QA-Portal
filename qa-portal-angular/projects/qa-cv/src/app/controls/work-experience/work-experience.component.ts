import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { IWorkExperience } from '../../_common/models/work-experience.model';


@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
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
  @Output() feedbackClick = new EventEmitter<{ index: number, experience: IWorkExperience }>();
  public workExperienceTableDataSource = new MatTableDataSource<IWorkExperience>();
  public columns = [];
  public expandedElement: IWorkExperience;

  // ControlValueAccessor methods
  public isDisabled = false;
  public onChange = (v: IWorkExperience[]) => { };
  public onTouch = () => { };

  constructor() {
    this.columns = ['title', 'feedback', 'remove'];
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

  // Built-in validation
  validate({ value }: { value: IWorkExperience[] }): null | any {
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

  onFeedbackButtonClicked(event: MouseEvent, index: number, experience: IWorkExperience): void {
    event.stopPropagation(); // Prevent event bubbling to the row below it.
    this.expandedElement = experience;
    this.feedbackClick.emit({ index, experience });
  }

  // ControlValueAccessor methods
  writeValue(obj: any): void {
    this.workExperienceTableDataSource.data = obj;
  }

  registerOnChange(fn: (v: IWorkExperience[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
