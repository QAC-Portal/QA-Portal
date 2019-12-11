import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { PortalHeaderComponent } from './portal-header.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockComponents } from 'ng-mocks';
import { HeaderLinkComponent } from '../header-link/header-link.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationService } from '../_common/services/application.service';
import { MockApplicationService } from '../_mocks/application.service.mock';
import { KeycloakService } from 'keycloak-angular';
import { MockKeycloakService } from '../_mocks/keycloak.service.mock';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

fdescribe('Portal Header Component Tests', () => {
  let component: PortalHeaderComponent;
  let keycloakService: KeycloakService;
  let fixture: ComponentFixture<PortalHeaderComponent>;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        RouterTestingModule
        
        
      ],
      declarations: [PortalHeaderComponent, MockComponents(HeaderLinkComponent)],
      providers: [
        { provide: ApplicationService, useClass: MockApplicationService },
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalHeaderComponent);
    keycloakService = TestBed.get(KeycloakService);
    location = TestBed.get(ActivatedRoute);
    component = fixture.componentInstance;
    

    spyOn(keycloakService, 'getUsername').and.callThrough();

    fixture.detectChanges();

    
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should get the username when the component initialises', () => {
    expect(keycloakService.getUsername).toHaveBeenCalledTimes(1);
  });

  it('should fetch the username and store it in uppercase', () => {
    expect(component.displayName).toEqual('TEST USERNAME');
  });

  it('should get the logout when the component is used', done => {
    spyOn(keycloakService, 'logout').and.callFake((url?: string) => {
      expect(url).toContain('/portal/home');



      done();
      return new Promise<void>(res => res());
    })

    component.logout();

  });
});
