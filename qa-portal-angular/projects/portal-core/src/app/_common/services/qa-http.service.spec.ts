import { TestBed, inject } from '@angular/core/testing';

import { QaHttpService } from './qa-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('QaHttpService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));


  it('should be created', inject([HttpTestingController, QaHttpService], (httpMock: HttpTestingController, service: QaHttpService) => {
    expect(service).toBeTruthy();
  }));
  it('should send get request using ref', inject([HttpTestingController, QaHttpService], (httpMock: HttpTestingController, service: QaHttpService) => {
    const mockGetReq = httpMock.expectOne('/test/url');

    service.get('/test/url').subscribe(body => {
      expect(body).toEqual('test body');
    });

    expect(mockGetReq.request.body).toEqual('incoming body');
    mockGetReq.flush('test body');
    httpMock.verify();
  }));
});