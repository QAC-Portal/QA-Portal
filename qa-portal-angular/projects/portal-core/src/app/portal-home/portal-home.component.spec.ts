import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalHomeComponent } from './portal-home.component';
import { MatDividerModule } from '@angular/material';
import { ApplicationService } from '../_common/services/application.service';
import { MockApplicationService } from '../_mocks/application.service.mock';
import { SideMenuService } from '../_common/services/side-menu.service';
import { MockSideMenuService } from '../_mocks/side-menu.service.mock';
import { RouterTestingModule } from '@angular/router/testing';


describe('PortalHomeComponent', () => {
  let component: PortalHomeComponent;
  let fixture: ComponentFixture<PortalHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PortalHomeComponent
      ],
      imports: [
        MatDividerModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ApplicationService, useClass: MockApplicationService },
        { provide: SideMenuService, useClass: MockSideMenuService }
      ]
    })

      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

