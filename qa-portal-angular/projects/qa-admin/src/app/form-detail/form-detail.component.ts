import { Component, OnInit } from '@angular/core';
import { FormService } from '../_common/services/form.service';
import { QaErrorHandlerService } from 'projects/portal-core/src/app/_common/services/qa-error-handler.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormModel } from 'projects/portal-core/src/app/_common/models/form.model';
import { finalize } from 'rxjs/operators';
import { QuestionCategoryModel } from 'projects/portal-core/src/app/_common/models/question-category.model';
import { QuestionModel } from 'projects/portal-core/src/app/_common/models/question.model';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html'
})
export class FormDetailComponent implements OnInit {
  public formForm: FormGroup;
  public isLoading = true;

  public form: FormModel;

  constructor(
    private formService: FormService,
    private errorService: QaErrorHandlerService,
    private aR: ActivatedRoute
  ) { 
    this.formForm = new FormBuilder().group({
      formName: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.formService.getFormById(this.aR.snapshot.params.id)
      .pipe(finalize(() => {
        this.formForm.enable();
        this.isLoading = false;
      }))
      .subscribe(
        form => {
          this.form = form;
          this.formForm.patchValue({
            ...this.form
          });
        }, err => this.errorService.handleError(err)
      );
  }

  public onAddCategoryClicked(): void {
    this.form.questionCategories.push(new QuestionCategoryModel());
  }

  public onAddQuestionClicked(category: QuestionCategoryModel): void {
    category.questions.push(new QuestionModel());
  }

}
