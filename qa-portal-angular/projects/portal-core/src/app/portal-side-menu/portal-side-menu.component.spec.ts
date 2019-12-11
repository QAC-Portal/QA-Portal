import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalSideMenuComponent } from './portal-side-menu.component';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { MatSidenavModule, MatIconModule } from '@angular/material';
import { MockComponents } from 'ng-mocks';
import { PortalSideMenuContentComponent } from './portal-side-menu-content/portal-side-menu-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('PortalSideMenuComponent', () => {
  let component: PortalSideMenuComponent;
  let fixture: ComponentFixture<PortalSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PortalSideMenuComponent,
        MockComponents(PortalSideMenuContentComponent)
      ],
      imports: [
        MatSidenavModule,
        MatIconModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
