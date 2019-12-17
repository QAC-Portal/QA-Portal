import { TestBed } from '@angular/core/testing';

import { CvPersistService } from './cv-persist.service';

describe('PersistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CvPersistService = TestBed.get(CvPersistService);
    expect(service).toBeTruthy();
  });
});
