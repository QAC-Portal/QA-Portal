import { TestBed } from '@angular/core/testing';

import { QaHelpService } from './qa-help.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QaHelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: QaHelpService = TestBed.get(QaHelpService);
    expect(service).toBeTruthy();
  });
});
