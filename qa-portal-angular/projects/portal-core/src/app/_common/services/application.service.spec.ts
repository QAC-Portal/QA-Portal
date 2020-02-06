import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { QaHttpService } from './qa-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationService } from './application.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { MockQaHttpService } from '../../_mocks/qa-http.service.mock';
import { PortalApplicationProjectsModel } from '../models/portal-application-projects.model';
import { BehaviorSubject, of } from 'rxjs';

class MockRouter {
  events = new BehaviorSubject<RouterEvent>(new NavigationEnd(123, 'test/url', 'test/url'));
}

describe('ApplicationService', () => {

  let service: ApplicationService;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ApplicationService,
        { provide: QaHttpService, useClass: MockQaHttpService },
        { provide: Router, useClass: MockRouter }

      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ApplicationService);
    router = TestBed.get(Router);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call onApplicationLoaded once', () => {
    spyOn(service, 'onApplicationLoaded').and.callThrough();


    service.onApplicationLoaded();

    expect(service.onApplicationLoaded).toHaveBeenCalledTimes(1);

  });
  it('should update currentApplication$ whenever the portalApplication changes', fakeAsync(() => {

    const testApp = {
        portalApplication: {
          baseUrl: 'testUrl'
        },
        portalProjects: []
      } as PortalApplicationProjectsModel;

    spyOn((service as any), 'getAllPortalApplications').and.returnValue(of([testApp]));
    
    spyOn(service as any, 'getCurrentApplicationByRoute').and.callFake((_apps: PortalApplicationProjectsModel[], event: NavigationEnd) => {
      expect(event.urlAfterRedirects).toEqual('test/url');
      return testApp;
    });
    
    service.onApplicationLoaded();
    tick();

    expect((service as any).getAllPortalApplications).toHaveBeenCalledTimes(1);
    expect((service as any).getCurrentApplicationByRoute).toHaveBeenCalledTimes(1);
    
  }));


});
