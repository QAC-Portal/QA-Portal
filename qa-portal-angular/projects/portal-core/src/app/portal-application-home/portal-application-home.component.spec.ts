import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuService } from '../_common/services/side-menu.service';

import { ApplicationService } from '../_common/services/application.service';
import { MockApplicationService } from '../_mocks/application.service.mock';

import { PortalApplicationHomeComponent } from './portal-application-home.component';
import { MockComponents } from 'ng-mocks';

import { MatDividerModule } from '@angular/material/divider';
import { HeaderLinkComponent } from '../header-link/header-link.component';
import { MatCardModule, MatListModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

describe('PortalApplicationHomeComponent', () => {
  let component: PortalApplicationHomeComponent;
  let fixture: ComponentFixture<PortalApplicationHomeComponent>;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        MatDividerModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        RouterModule
      ],
      declarations: [ PortalApplicationHomeComponent, MockComponents(HeaderLinkComponent) ],
      providers: [
        { provide: ApplicationService, useClass: MockApplicationService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalApplicationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create services', () => {
    expect(component.appService).toBeDefined();
    expect(component.sideMenuService).toBeDefined();
  });
});
