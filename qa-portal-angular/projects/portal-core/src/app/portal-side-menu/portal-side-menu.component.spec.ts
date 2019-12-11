import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalSideMenuComponent } from './portal-side-menu.component';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { MatSidenavModule, MatIconModule } from '@angular/material';
import { MockComponents } from 'ng-mocks';
import { PortalSideMenuContentComponent } from './portal-side-menu-content/portal-side-menu-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { callbackify } from 'util';

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
    expect(component.animating).toBeFalsy();
  });
  it('should get the done component when its called', () => {
    component.animating = true;
    component.done();
    expect(component.animating).toBeFalsy();
  });
  it('should get the start component when its called', () => {
    spyOn(component, 'tick').and.callFake(() => { });
    component.start();
    expect(component.animating).toBeTruthy();
    expect(component.tick).toHaveBeenCalledTimes(1);
  });
  it('should get the tick component when its called', () => {
    component.animating = true;
    spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
      
      return 0;
    });
    component.tick();
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });

});
