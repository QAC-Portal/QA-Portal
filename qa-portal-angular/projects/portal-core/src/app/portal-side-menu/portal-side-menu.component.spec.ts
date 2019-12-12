import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalSideMenuComponent } from './portal-side-menu.component';
import { MatSidenavModule, MatIconModule } from '@angular/material';
import { MockComponents } from 'ng-mocks';
import { PortalSideMenuContentComponent } from './portal-side-menu-content/portal-side-menu-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PortalSideMenuComponent', () => {
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
  it('should check if the done component sets animation to false', () => {
    component.animating = true;
    component.done();
    expect(component.animating).toBeFalsy();
  });
  it('should get the start component calls tick once', () => {
    spyOn(component, 'tick').and.callFake(() => { });
    component.start();
    expect(component.animating).toBeTruthy();
    expect(component.tick).toHaveBeenCalledTimes(1);
  });
  it('should if the tick component is called once', () => {
    component.animating = true;
    spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
      
      return 0;
    });
    component.tick();
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });
  it('should if the tick component has not been called', () => {
    component.animating = false;
    spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
      
      return 0;
    });
    component.tick();
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(0);
  });

});
