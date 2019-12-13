import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS } from '@angular/forms';
import { QualificationModel, Feedback } from '../../_common/models/cv.model';
import { MatTableDataSource } from '@angular/material';
import { IQualification } from '../../_common/models/qualification.model';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QualificationsComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: QualificationsComponent,
    multi: true
  }]
})
export class QualificationsComponent implements ControlValueAccessor {
  public qualisTableDataSource = new MatTableDataSource<QualificationModel>();

  public columns = [];
  public rowValidState = [];

  // ControlValueAccessor members
  public isDisabled = false;
  public onChange = (v: QualificationModel[]) => { };
  public onTouch = () => { };

  @Output() feedbackClick = new EventEmitter<{ index: number, qualifications: QualificationModel, feedback: Feedback[] }>();

  constructor() {
    this.columns = ['qualificationDetails', 'remove', 'showFeedback'];
  }


  onNewQualiClick(): void {
    this.qualisTableDataSource.data = [
      ...this.qualisTableDataSource.data,
      {
        qualificationDetails: '',
        qualificationFeedback: []
      }
    ];
    this.announceChange();
  }

  public onQualificationDetailsInputChange(qualification: QualificationModel, value: string) {
    qualification.qualificationDetails = value;
    this.announceChange();
  }

  private announceChange(): void {
    this.onChange(this.qualisTableDataSource.data);
    this.onTouch();
  }

  public onRemoveQualificationClicked(index: number): void {
    this.qualisTableDataSource.data.splice(index, 1); // setters don't get called by higher order functions so do it directly
    this.qualisTableDataSource._updateChangeSubscription(); // force the table to update (it doesn't auto detect splices)
    this.announceChange();
  }

  onFeedbackButtonClicked(index: number, qualifications: IQualification): void {
    this.feedbackClick.emit({ index, qualifications, feedback: qualifications.qualificationFeedback });
  }

  // Built-in validation
  validate({ value }: { value: QualificationModel[] }): null | any {
    if (Array.isArray(value)) {
      return value.every((e, i) => {
        const valid = !!e.qualificationDetails;
        this.rowValidState[i] = valid;
        return valid;
      }) ? null : { qualificationIncomplete: 'All qualifications must be completed.' };
    } else {
      return null;
    }
  }

  // ControlValueAccessor methods
  writeValue(obj: any): void {
    this.qualisTableDataSource.data = obj;
  }

  registerOnChange(fn: (v: QualificationModel[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
