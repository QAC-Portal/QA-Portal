import { TestBed } from '@angular/core/testing';

import { QaHttpService } from './qa-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockQaHttpService } from '../../_mocks/qa-http.service.mock';

fdescribe('QaHttpService', () => {
  let service: QaHttpService;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    })
  })

  beforeEach(() => {
    service = TestBed.get(QaHttpService)

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the get function', () => {
    spyOn(service, 'get').and.callThrough();
    let t =service.get('www');
    
    expect(service.get).toHaveBeenCalledTimes(1);
    //expect(t).toBeFalsy();
    //expect(t.source.source..subscribe(m =>m.HttpRequest)).toContain("");
    //expect(t.source.subscribe(m =>m.HttpRequest)).toContain("");
  });

  it('should call the post function', () => {
    spyOn(service, 'post').and.callThrough();
    service.post('www', 'adf');
    expect(service.post).toHaveBeenCalledTimes(1);
  });

  it('should call the put function', () => {
    spyOn(service, 'put').and.callThrough();
    service.put('www', 'adf');
    expect(service.put).toHaveBeenCalledTimes(1);
  });

  it('should call the patch function', () => {
    spyOn(service, 'patch').and.callThrough();
    service.patch('www', 'adf');
    expect(service.patch).toHaveBeenCalledTimes(1);
  });

  it('should call the delete function', () => {
    spyOn(service, 'delete').and.callThrough();
    service.delete('www');
    expect(service.delete).toHaveBeenCalledTimes(1);
  });
});
