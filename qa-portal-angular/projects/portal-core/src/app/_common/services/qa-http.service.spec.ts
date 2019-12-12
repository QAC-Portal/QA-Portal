import { TestBed, inject } from '@angular/core/testing';

import { QaHttpService } from './qa-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('QaHttpService', () => {


  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  afterEach(() => {
    
  });

  it('should be created', inject([HttpTestingController, QaHttpService], (httpMock: HttpTestingController, service: QaHttpService) => {
    expect(service).toBeTruthy();
  }));
});
fdescribe('Get request',  () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
    }));

    it('should send get request using ref', inject([HttpTestingController, QaHttpService], (httpMock: HttpTestingController, service: QaHttpService) => {
      const mockGetReq = httpMock.expectOne('http://localhost:8086/cohort-api/manage/users');
  
      service.get({ref: 'GET_ALL_USERS'}).subscribe(body => {
        expect(body).toEqual('test body');
      });
  
      //expect(mockGetReq.request.body).toEqual('incoming body');
      mockGetReq.flush('test body');
      httpMock.verify();
    }));
});
fdescribe('Post request', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  afterEach(() => {
    
  });

  it('should send post request using ref', inject([HttpTestingController, QaHttpService], (httpMock: HttpTestingController, service: QaHttpService) => {
    const mockUser = {
      name: 'userTest',
      role: ''
    };
    
    service.post({ref: 'CREATE_USER'}, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((userData) => {
      expect(userData).toEqual(mockUser);
    });
    
    const mockGetReq = httpMock.expectOne('http://localhost:8086/cohort-api/manage/users');
      
    expect(mockGetReq.request.method).toEqual('POST');

    mockGetReq.flush(mockUser);
    httpMock.verify();
  }));
});

  
