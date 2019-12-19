import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { KeycloakService } from 'keycloak-angular';
import { Feedback } from '../_common/models/cv.model';
import * as moment from 'moment';

@Component({
  selector: 'app-cv-card-base',
  templateUrl: './cv-card-base.component.html',
  styleUrls: ['./cv-card-base.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CvCardBaseComponent),
    multi: true
  }]
})
export class CvCardBaseComponent implements ControlValueAccessor {
  @Input() cardTitle: string;
  @Input() canComment: boolean;
  @Input() canEdit: boolean;
  @Input() showOpenButton: boolean;

  public feedback: Feedback[];

  public onChange = (v: Feedback[]) => { };
  public onTouch = () => { };

  @ViewChild('commentContainer', { static: true }) commentContainer: ElementRef;
  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  public commentInput = new FormControl('', Validators.required);
  public options: FormGroup;

  constructor(private keycloak: KeycloakService, fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: true,
    });
  }

  getFormattedDate(date: string): string {
    return moment(date).fromNow();
  }

  getFullDate(date: string): string {
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  }

  scrollCommentsToBottom(): void {
    const { SimpleBar } = this.commentContainer.nativeElement;
    SimpleBar.getScrollElement().scrollTo(0, SimpleBar.contentEl.clientHeight);
  }

  onCommentCheckboxClicked(comment: Feedback, index: any) {
    event.preventDefault(); // Stop default checkbox behaviour
    event.stopPropagation(); // Stop the row from clicking when using a checkbox
    if (comment) {
      this.feedback[index].resolved = this.feedback[index] === undefined ? false : !this.feedback[index].resolved;
      //this.feedbackChange.emit(this.feedback);
    }
    this.onChange(this.feedback);
    this.onTouch();
  }


  addFeedbackItem(): void {
    if (this.commentInput.valid) {
      const fb: Feedback = {
        comment: this.commentInput.value,
        date: moment().format(),
        reviewer: this.keycloak.getUsername(),
        resolved: false
      };
      this.feedback.push(fb);
      this.onChange(this.feedback);
      this.onTouch();
      this.commentInput.reset();
      this.commentInput.markAsUntouched();

      setTimeout(() => {
        this.scrollCommentsToBottom();
      }, 0);
    }
  }


  // FormValueAccessor methods
  writeValue(fb: Feedback[]): void {
    this.feedback = fb;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.showOpenButton = !isDisabled;
  }
}
