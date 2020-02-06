import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationService } from '../../_common/services/application.service';
import { MockApplicationService } from '../../_mocks/application.service.mock';
import { PortalSideMenuContentComponent } from './portal-side-menu-content.component';
import { MatTooltipModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PortalSideMenuContentComponent', () => {
  let component: PortalSideMenuContentComponent;
  let fixture: ComponentFixture<PortalSideMenuContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PortalSideMenuContentComponent
      ],
      imports: [
        RouterTestingModule,
        MatTooltipModule,
        MatIconModule,
        HttpClientModule
      ],
      providers: [
        { provide: ApplicationService, useClass: MockApplicationService }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalSideMenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle drawer', () => {
    component.toggleDrawer();
    expect(component.opened.valueOf).toBeTruthy();
  });
  it('should not toggle drawer', () => {
    component.toggleDrawer();
    component.toggleDrawer();
    expect(component.opened).toBeFalsy();
  });

  // it('should open the drawer when clicked', () => {

  // })
});
