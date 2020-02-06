import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CvRemoteService } from './cv-remote.service';
import { CvModel } from '../models/cv.model';

describe('CvRemoteService', () => {
  let service: CvRemoteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CvRemoteService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCvPdf', () => {
    it('should return a generated PDF Blob', () => {
      const testString = 'test pdf data';
      const testBuffer = createTestArrayBuffer(testString);

      service.getCvPdf({} as CvModel).subscribe(pdf => {
        expect(pdf.type).toEqual('application/pdf');
        const fr = new FileReader();
        fr.onload = (e) => expect(fr.result).toEqual(testString);
        fr.readAsBinaryString(pdf);
      });

      const req = httpTestingController.expectOne('cv-api/public/cv/generated');
      expect(req.request.method).toEqual('POST');
      req.flush(testBuffer);
    });
  });

  it('should return an error if something goes wrong', () => {
    const testErrorString = 'test error';
    const testErrorBuffer = createTestArrayBuffer(testErrorString);

    service.getCvPdf({} as CvModel).subscribe(() => {
      fail('This function should have errored and not gotten here');
    }, err => {
      expect(new TextDecoder().decode(err.error)).toEqual(testErrorString);
    });

    const req = httpTestingController.expectOne('cv-api/public/cv/generated');
    req.flush(testErrorBuffer, { status: 500, statusText: 'Test Server Error' });
  });
});



function createTestArrayBuffer(input: string) {
  const buf = new ArrayBuffer(input.length);
  const bufView = new Uint8Array(buf);
  Array.from(input).forEach((char, i) => bufView[i] = char.charCodeAt(0));
  return buf;
}
