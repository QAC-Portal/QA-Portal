import { TestBed, ComponentFixture } from '@angular/core/testing';

import { FormTypeService } from './form-type.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IFormModel } from 'projects/qa-forms/src/app/_common/models';

class MockHttpClient {
  public get() {
    return of(null);
  }

  public post() {
    return of(null);
  }
}

describe('FormTypeService', () => {
  
  let service: FormTypeService;
  let httpClient: HttpClient;
  let form: IFormModel; 

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FormTypeService,
      {provide: HttpClient, useClass: MockHttpClient}
    ]

  }));

  beforeEach(() => {
    service = TestBed.get(FormTypeService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return form type', done => {
    httpClient.get = (url) => {
      expect(url).toEqual('form-api/form/:formType/categories');
      return of(null);
    };
    
    let testForm = 'testForm';
    service.getFormType(testForm).subscribe(() => done());
  });


  it('should send eval form', done => {
    httpClient.get = (url) => {
      expect(url).toEqual('feedback-api/feedback');
      return of(null);
    };
    
    service.sendEvalForm(form).subscribe(() => done());
  });

});
