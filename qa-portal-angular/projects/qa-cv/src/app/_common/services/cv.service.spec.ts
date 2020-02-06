import { TestBed } from '@angular/core/testing';

import { CvService } from './cv.service';
import { CvModel } from '../models/cv.model';
import { CvRemoteService } from './cv-remote.service';
import { of, throwError } from 'rxjs';

class MockCvRemoteService {
  public getCvPdf(cv) {
    return of(new Blob([]));
  }
}

describe('CvService', () => {
  let service: CvService;
  let cvRemoteService: CvRemoteService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: CvRemoteService, useClass: MockCvRemoteService }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(CvService);
    cvRemoteService = TestBed.get(CvRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('displayCvPdf', () => {
    it('should fetch and display a PDF', async () => {
      spyOn(window, 'open').and.callFake((fileUrl, opt) => {
        expect(fileUrl).toBeDefined();
        expect(opt).toContain('_blank');
        return null;
      });

      const result = await service.displayCvPdf({} as CvModel).toPromise();
      expect(result).toEqual(true);
      expect(window.open).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if something goes wrong', async () => {
      const testError = 'test error';
      spyOn(window, 'open');
      cvRemoteService.getCvPdf = (cv) => throwError(testError);

      service.displayCvPdf({} as CvModel).subscribe(() => {
        fail('This function should have errored and not gotten here');
      }, err => {
        expect(err).toEqual(testError);
        expect(window.open).not.toHaveBeenCalled();
      });
    });
  });

  describe('downloadCvPdf', () => {
    it('should fetch and download a PDF', async () => {

      const testEl = {
        download: '',
        href: '',
        click: () => {
          expect(testEl.download).toBeTruthy();
          expect(testEl.href).toBeTruthy();
        }
      }

      spyOn(document, 'createElement').and.callFake((el: any) => {
        return (testEl as unknown) as HTMLElement;
      });

      spyOn(testEl, 'click').and.callThrough();

      const testCv = {
        firstName: 'test',
        surname: 'user'
      } as CvModel;

      const result = await service.downloadCvPdf(testCv).toPromise();
      expect(result).toEqual(true);
      expect(testEl.click).toHaveBeenCalledTimes(1);
    });
  });
});
