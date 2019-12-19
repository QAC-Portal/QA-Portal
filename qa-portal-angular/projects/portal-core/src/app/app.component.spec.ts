import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApplicationService } from './_common/services/application.service';
import { MockApplicationService } from './_mocks/application.service.mock';
import { PortalHeaderComponent } from '../app/portal-header/portal-header.component'
import { MockComponents } from 'ng-mocks';
import { PortalSideMenuComponent } from '../app/portal-side-menu/portal-side-menu.component';
import { KeycloakService } from 'keycloak-angular';
import { MockKeycloakService } from './_mocks/keycloak.service.mock';
import { PortalHelpComponent } from './portal-help/portal-help.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let appService: ApplicationService;
  let fixture: ComponentFixture<AppComponent>;
  let keyCloak: KeycloakService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        MockComponents(
          PortalSideMenuComponent,
          PortalHeaderComponent,
          PortalHelpComponent
        )
      ],
      providers: [
        { provide: ApplicationService, useClass: MockApplicationService },
        { provide: KeycloakService, useClass: MockKeycloakService }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appService = TestBed.get(ApplicationService);
    component = fixture.componentInstance;

    spyOn(appService, 'onApplicationLoaded').and.callThrough();

    fixture.detectChanges();
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
