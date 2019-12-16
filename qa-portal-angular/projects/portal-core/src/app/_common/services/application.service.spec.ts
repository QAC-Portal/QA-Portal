import { TestBed } from '@angular/core/testing';
import { MockApplicationService } from '../../_mocks/application.service.mock';
import { QaHttpService } from './qa-http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationService } from './application.service';
import { NavigationEnd } from '@angular/router';
import { PortalApplicationProjectsModel } from '../models/portal-application-projects.model';
import { MockQaHttpService } from '../../_mocks/qa-http.service.mock';
import { HeaderLinkComponent } from '../../../app/header-link/header-link.component';

describe('ApplicationService', () => {

  let service: ApplicationService;
 
  let navEnd: NavigationEnd;
 

  beforeEach(() => {
    TestBed.configureTestingModule({
      //declarations: [ HeaderLinkComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        ApplicationService, //NavigationEnd,
        //{provide: ApplicationService, useClass: MockApplicationService},
        {provide: QaHttpService, useClass: MockQaHttpService}  
      
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ApplicationService);
    
    
    //navEnd  = TestBed.get(NavigationEnd);
    
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call onApplicationLoaded once', () => {
    spyOn(service, 'onApplicationLoaded').and.callThrough();
    //navEnd.urlAfterRedirects = 'cohort-api/manage/user';
    //navEnd = new NavigationEnd(1,'cohort-api/manage/user',navEnd.urlAfterRedirects);
    service.onApplicationLoaded();
    
    expect(service.onApplicationLoaded).toHaveBeenCalledTimes(1);

  });
 
  it('should get the current app location', () => {

  });
});
